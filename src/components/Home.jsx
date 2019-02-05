import React, { Component } from 'react';
import '../App.css';
import { Input, Button, Grid, Card, Message, Responsive } from 'semantic-ui-react'
import firebase from "./firebase";

const sampleAudio = require("../sampleJoanna.mp3")

const backDrop = {
    position: 'absolute',
    /* center the div */
    right: '0',
    left: '0',
    top: '0',
    bottom: '0',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: '7em',
    marginBottom: '7em',
    /* give it dimensions */
    height: '70%',
    width: '60%',
    opacity: '0.8',
    overflowX: 'hidden',
    overflowY: 'auto',
    color: '#475d7f'
};

// position: 'absolute',
// margin: 'auto',
// top: '0',
// right: '0',
// bottom: '0',
// left: '0',
// height: '70%',
// width: '60%',
// opacity: '0.8',
// color: '#475d7f',

const row = {
  height: '100%',
  overFlowY: 'auto',
  padding: '1em',
  paddingTop: '2em',
  boxSizing: 'padding-box'
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
         disableSubmit: true,
         submitHit: false
        };
      }
  
  validateEmail(inputText)  {
    let mailformat = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    // /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
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
      email: email.target.value,
      submitHit: false
    });
  };

  onSubmit = async e => {
    e.preventDefault();
    if(this.validateEmail(this.state.email)) {
      const db = firebase.firestore();
      console.log(this.state.email)
      const emailRef = db.collection("emails").add({
          email: this.state.email
      }).then(ref => {
        console.log('Added document with ID: ', ref.id);
      });
      this.setState({
          email: "",
          error: false,
          disableSubmit: true,
          submitHit: true
      });
    } else {
        console.log('it worked')
        this.setState({
          email: "",
          error: true,
          disableSubmit: true,
          submitHit: false
      })
    }
  };

  render() {
    const emailSignUp = this.state.submitHit;
    const errorMsg = this.state.error

    let signUp;
    let error;

    if(emailSignUp)  {
      signUp = 
      <Message positive>
      Thanks for signing up! 
      </Message>
    }
    
    if(errorMsg) {
      error = 
      <Message negative>
        Please enter a valid email address.
      </Message>
    }

    return (
      <Responsive as={Card} style={backDrop}>
        <Responsive as={Grid} verticalAlign='middle' textAlign='center' columns={2} relaxed='very' stackable divided style={row}>
          <Grid.Row >
              <Grid.Column>
                <h1>Chirrpi</h1>
                <h3>News today is too cluttered. We're forced to listen to stories we're not interested in or bad radio while we're driving. With Chirrpi, you can select specific text articles, that you're passionate about, to listen to on the go.</h3>
                <i className="fas fa-headphones-alt fa-5x"></i>
                <h3>Take the news with you on your commute!</h3> 
                <h3>Hear the stories you want to hear.</h3>
                <h3>Here's a Sample</h3>
                <audio ref="audio" controls>
                  <source src={sampleAudio} type="audio/mpeg" ></source>
                </audio> 
              </Grid.Column>
              <Grid.Column>
                <h2>Enjoyed the sample?</h2>
                <i className="fas fa-user-plus fa-5x"></i>
                <h3>Sign up below and we will update you on our progress.</h3>
                {signUp} {error}
                <p style={emailField}>
                  <Input 
                    focus 
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
                  <Button 
                    content='Sign Up!' 
                    primary size="large" 
                    onClick={this.onSubmit} 
                    disabled={this.state.disableSubmit}
                    onKeyDown={this.handleChange}
                  />
                </p>
              </Grid.Column>  
          </Grid.Row>
        </Responsive>
      </Responsive>
      );
  }
}