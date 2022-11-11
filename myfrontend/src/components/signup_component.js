import React, { Component } from "react";

export default class SignUp extends Component {
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
    console.log( email, password);
    fetch("http://ec2-3-91-203-169.compute-1.amazonaws.com:4000/register", {
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
