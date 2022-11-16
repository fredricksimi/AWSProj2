import React, { Component } from "react";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      firstname:"",
      lastname:"",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const { email, firstname, lastname, password } = this.state;
    console.log( email, firstname, lastname, password);
    fetch("http://127.0.0.1:4000/register", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        firstname,
        lastname,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
      });
      e.target.reset();
      alert('Registration successful! Click sign in at the bottom right!')
  }
  render() {
    return (
        <>
        <div className="col-md-7 mx-auto pt-5">
            <form onSubmit={this.handleSubmit}>
                <h3>Sign Up</h3>                
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
                <label>First Name</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter First Name"
                    onChange={(e) => this.setState({ firstname: e.target.value })}
                />
                </div>
                <div className="mb-3">
                <label>Last Name</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Last Name"
                    onChange={(e) => this.setState({ lastname: e.target.value })}
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
                <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                    Sign Up
                </button>
                </div>
                <p className="forgot-password text-right">
                Already registered <a href="/sign-in">sign in?</a>
                </p>
            </form>
        </div>
        </>
    );
  }
}
