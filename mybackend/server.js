// Lets use some of the packages we've installed
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require("mongoose");
const newRouter = require('./router.js');
const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
const axios = require('axios');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

  app.use(cors({
    origin: "http://ec2-3-80-131-50.compute-1.amazonaws.com:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    preflightContinue: false,
    credentials: true
  }))
  const mongoUrl =
  "mongodb://admin:password@mongodb:27017";
mongoose.connect(mongoUrl, {
  useNewUrlParser: true
})
.then(() => {
  console.log("Connected to database");
})
.catch((e) => console.log(e));

require("./userDetails");


const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./ProfilePhotos");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `admin-${file.fieldname}-${Date.now()}.${ext}`);
  },
});
const multerFilter = (req, file, cb)=>{
  if (file.mimetype.split('/')[1] != 'pdf'){
    cb(null, true)
  } else{
    cb(new Error('Not a PDF File!!'), false)
  }
}
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});


let mongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };

app.post('/upload', upload.single('urlpromo'), (req, res) => {
  MongoClient.connect('mongodb://admin:password@mongodb:27017', mongoClientOptions, function (err, client) {
    if (err) throw err;
    let db = client.db('my_users_db');
    let myquery = {
      fullname: req.body.fullname,
      bio: req.body.bio,
      profilePhoto: `${req.file.path}`
    };
    db.collection("users_collection").insertOne(myquery, function (err, result) {
      if(err) throw err;
      response = result;
      client.close();
      res.send(response ? response : {})
    })
  })
});
const User = mongoose.model("UserInfo");
app.post("/register", async(req, res) => {
  const { email, password } = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.json({ error: "User Exists" });
    }
    await User.create({
      email,
      password: encryptedPassword,
    });
  } catch (error) {
    res.send({ status: "error" });
  }
});
app.put("/update", async(req,res) => {
  try {
    User.findByIdAndUpdate(req.user.id, { $set: {fname: req.body.fname2, bio: req.body.bio2}}, {new: true})
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update object with id=${req.user.id}`
        });
      } else res.send({ message: "Object was updated successfully." });
    })
  } catch (err) {
    res.status(500).send({
      message:"Error updating Tutorial with id"
    });
  };
});

app.post("/login-user", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: "User Not found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET);

    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "Invalid Password" });
});

app.post("/userData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    console.log(user);

    const useremail = user.email;
    User.findOne({ email: useremail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});

app.get('/getusers', (req, res) => {
  MongoClient.connect('mongodb://admin:password@mongodb:27017', function(err, db) {
    if (err) throw err;
    var dbo = db.db("my_users_db");
    dbo.collection("users_collection").find({}).toArray(function(err, result) {
      if (err) throw err;
      res.json(result)
      db.close();
    });
  });
})

app.get('/spacedata', (req, res) => {
  axios.get('https://api.spaceflightnewsapi.net/v3/articles?_limit=5')
                      .then(function (response) {
                          res.json(response.data)
                      })
                      .catch(function (error) {
                          console.log(error);
                      })
})
app.use(express.static('./'))
app.listen(4000, function () {
  console.log(`Listening on this port: ${this.address().port}`);
});