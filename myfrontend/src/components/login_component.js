import React, { Component } from "react";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    console.log(email, password);
    fetch("http://127.0.0.1:4000/login-user", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status === "ok") {
          alert("login successful");
          window.localStorage.setItem("token", data.data);
          window.location.href = "./userDetails";
        }
      });
  }
  render() {
    return (
        <>
        <div className="col-md-7 mx-auto pt-5">
                <form onSubmit={this.handleSubmit}>
                <h3>Sign In</h3>
                <div className="mb-3">
                <label>Email address</label>
                <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    onChange={(e) => this.setState({ email: e.target.value })}
                />
                </div>
                <div className="mb-3">
                <label>Password</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    onChange={(e) => this.setState({ password: e.target.value })}
                />
                </div>
                <div className="mb-3">
                </div>
                <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
                </div>
                <p className="forgot-password text-right">
                <a href="/sign-up">Sign Up</a>
                </p>
            </form>
        </div>
        </>
    );
    }
}
