import React, { Component } from 'react';
import '../App.css';
import { Input, Button, Grid } from 'semantic-ui-react'
import firebase from "./firebase";

const sampleAudio = require("../sampleJoanna.mp3")

const textColor = {
  color: "#ffffff",
  width: "100%",
  height: "100%"
};

const emailField = {
  paddingTop: "15px"
};

export default class Home extends Component {
    constructor() {
        super();
        this.state = {
         email: "",
         error: false
        };
      }

  handleChange = email => {
    this.setState({
      email: email.target.value
    });
  };

  onSubmit = async e => {
    e.preventDefault();
    const db = firebase.firestore();
    // handle invalid email entry
    console.log(this.state.email)
    const emailRef = db.collection("emails").add({
        email: this.state.email
    }).then(ref => {
      console.log('Added document with ID: ', ref.id);
    });
    this.setState({
        email: "",
        error: false
    });
  };

  render() {     
    return (
      <Grid verticalAlign='middle' textAlign="center" columns={2} relaxed container stackable style={textColor}>
        <Grid.Row>
          <Grid.Column>
            <h1>Read-Aloud</h1>
            <i class="far fa-newspaper fa-5x"></i>
            <h3>News today is too cluttered.</h3>
            <h3>We're forced to listen to stories we're not interested in.</h3>
            <i class="fas fa-headphones-alt fa-5x"></i>
            <h3>Take the news with you on your commute!</h3> 
            <h3>Hear the stories you want to hear.</h3>
            <h3>Here's a Sample</h3>
            <audio ref="audio" controls>
              <source src={sampleAudio} type="audio/mpeg" ></source>
            </audio> 
          </Grid.Column>
          <Grid.Column>
            <h3>Enjoyed the sample?</h3>
            <i class="fas fa-user-plus fa-5x"></i>
            <h3>Sign up below for updates.</h3>
            <p style={emailField}>
              <Input 
                inverted 
                placeholder="email address" 
                size="large" 
                onChange={this.handleChange}
                value={this.state.email}
                type="email"
                error={this.state.error}
              />
            </p>
            <h4>
              We won't share your email.
            </h4>
            <p>
              <Button content='Sign Up!' primary size="large" onClick={this.onSubmit}/>
            </p>
            </Grid.Column>
        </Grid.Row>
      </Grid>
      );
  }
}