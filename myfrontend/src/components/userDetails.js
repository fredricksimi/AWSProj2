import React, { Component } from "react";
import axios from 'axios';
import MainComponent from "../Main";
export default class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // userData: "",
      fname: "",
      bio: "",
      isInEditMode: false,
      fname2:"",
      bio2:""
    };
  }

  changeEditMode = () => {
    this.setState({
        isInEditMode: !this.state.isInEditMode
    })
  }

  updateComponentValue = () => {
    this.setState({
        isInEditMode:false,
        fname2: this.refs.theTextInput.value,
        bio2: this.refs.theTextInput2.value
    })
    console.log(`This is theeeeee ${this.state.fname2}`)
      const { fname2, bio2 } = this.state;
      console.log(this.state);
      axios.put("http://ec2-3-91-203-169.compute-1.amazonaws.com:4000/update", {
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          fname2,
          bio2,
        }),
      }).then((res) => res.json())
      .then((data) => {
        console.log(data, "userUpdate");
      });
  }

  renderEditView = () => {
    return (
        <div>
            <input 
            type="text" defaultValue={this.state.fname}
            ref="theTextInput"
            />
            <textarea
            defaultValue={this.state.bio}
            ref="theTextInput2"
            ></textarea>
            <button onClick={this.changeEditMode}>X</button>
            <button onClick={this.updateComponentValue}>OK</button>
        </div>
    )
  }
  renderDefaultView = () => {
    return (
    <MainComponent/>
    )
  }

  componentDidMount() {
    fetch("http://ec2-3-91-203-169.compute-1.amazonaws.com:4000/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        this.setState({ 
          // userData: data.data, 
          fname: data.data.fname,
          bio: data.data.bio
        });
      });
  }
  render() {
    return (
      this.state.isInEditMode ?
      this.renderEditView() :
      this.renderDefaultView()
    )
  }
}
