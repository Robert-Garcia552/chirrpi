import React, { Component } from 'react';
import '../App.css';
import { Input, Button, Grid, Card, Segment } from 'semantic-ui-react'
import firebase from "./firebase";

const sampleAudio = require("../sampleJoanna.mp3")

const backDrop = {
  position: 'absolute',
  margin: 'auto',
  top: '0',
  right: '0',
  bottom: '0',
  left: '0',
  height: '70%',
  width: '60%',
  opacity: '0.8',
  color: '#475d7f',
};

const row = {
  height: '100%'
}

const emailField = {
  paddingTop: "15px"
};

export default class Home extends Component {
    constructor() {
        super();
        this.state = {
         email: "",
         error: false,
         disableSubmit: true
        };
      }
  
  validateEmail(inputText)  {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (this.state.email.match(mailformat)) {
      this.setState({error: false, disableSubmit: false});
      return true;
    } else  {
      this.setState({error: true, disableSubmit: true});
      return false;
    }
  }

  handleChange = email => {
    this.validateEmail(email)
    this.setState({
      email: email.target.value
    });
  };

  onSubmit = async e => {
    e.preventDefault();
    const db = firebase.firestore();
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
      <Card compact style={backDrop}>
      <Grid verticalAlign='middle' textAlign='center' columns={2} relaxed='very' stackable divided style={row}>
        <Grid.Row style={row}>
          <Grid.Column style={{maxWidth: 450}}>
            <h1>Read-Aloud</h1>
            <i class="far fa-newspaper fa-5x"></i>
            <h3>News today is too cluttered.
            We're forced to listen to stories we're not interested in.</h3>
            <i class="fas fa-headphones-alt fa-5x"></i>
            <h3>Take the news with you on your commute!</h3> 
            <h3>Hear the stories you want to hear.</h3>
            <h3>Here's a Sample</h3>
            <audio ref="audio" controls>
              <source src={sampleAudio} type="audio/mpeg" ></source>
            </audio> 
          </Grid.Column>
          <Grid.Column>
            <h2>Enjoyed the sample?</h2>
            <i class="fas fa-user-plus fa-5x"></i>
            <h3>Sign up below and we will update you on our progress.</h3>
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
              We won't share or sell your email.
            </h4>
            <p>
              <Button content='Sign Up!' primary size="large" onClick={this.onSubmit} disabled={this.state.disableSubmit}/>
            </p>
            </Grid.Column>  
        </Grid.Row>
      </Grid>
      </Card>
      );
  }
}