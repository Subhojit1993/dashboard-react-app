import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import NameIcon from 'material-ui/svg-icons/social/person';
import DatePicker from 'material-ui/DatePicker';
import SmartPhone from 'material-ui/svg-icons/hardware/smartphone';
import MailIcon from 'material-ui/svg-icons/communication/email';
import CalIcon from 'material-ui/svg-icons/action/today';
import TextArea from 'material-ui/TextField/EnhancedTextarea';
import Card from 'material-ui/Card/Card';
import Avatar from 'material-ui/Avatar/Avatar';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './App.css';
import * as firebase from 'firebase';

class Profile extends Component {

/*Initialized the state here*/

  constructor() {
    super();
    this.state = {
      name:"",
      dob:null,
      contact:"",
      email:"",
      descrip:"",
      err:"",
      errNumber:"",
      errEmail:"",
      disabled: true,
      image:"",
      isLoggedin: false
    };
    injectTapEventPlugin();
    this.handleClick = this.handleClick.bind(this);
    this.changeNameValue = this.changeNameValue.bind(this);
    this.changeDobValue = this.changeDobValue.bind(this);
    this.changeEmailValue = this.changeEmailValue.bind(this);
    this.changeDescripValue = this.changeDescripValue.bind(this);
    this.changeContactValue = this.changeContactValue.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

/*inside of this method I'm gonna change the state*/

  componentDidMount() {
    const self=this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user!=null) {

        /* fetching the image from Google profile */

        self.state.image = user.photoURL;
      } 
      if(user==null) {
          window.location = '/';
      }
    });

/* fetching & setting data from the firebase to the relevant fields of the profile */

    const rootRef = firebase.database().ref().child('react');
    const nameRef = rootRef.child('name');
    const dobRef = rootRef.child('dob');
    const emailRef = rootRef.child('email');
    const descripRef = rootRef.child('descrip');
    const contactRef = rootRef.child('contact');
    nameRef.on('value', snap => {
        this.setState({
        name: snap.val()
      });
    });
    dobRef.on('value', snap => {
        this.setState({
        dob: new Date(snap.val())
      });
    });
    emailRef.on('value', snap => {
        this.setState({
        email: snap.val()
      });
    });
    descripRef.on('value', snap => {
        this.setState({
        descrip: snap.val()
      });
    });
    contactRef.on('value', snap => {
        this.setState({
        contact: snap.val()
      });
    });
  }

/* Onchange functions of the fields */

  changeNameValue(e) {
        this.setState({name: e.target.value});
  }

  changeDobValue(e) {
        this.setState({dob: e.target.value});
  }

  changeEmailValue(e) {
        this.setState({email: e.target.value});
  }

  changeDescripValue(e) {
        this.setState({descrip: e.target.value});
  }

  changeContactValue(e) {
        this.setState({contact: e.target.value});
  }

/* Button click event */

  handleClick(e) {
      this.setState({ disabled: !this.state.disabled });
      const rootRef = firebase.database().ref().child('react');
      const tempRef = this.state.contact.split("");

/* ----Saving data in the firebase with having validation on name, email & contact number field---- */

      if(this.state.name!="")
      {
        rootRef.update({
          name: this.state.name,
          descrip: this.state.descrip
        });
        this.setState({err: ""});
        this.state.disabled = true;
      }
      if(this.state.dob!="")
      {
        rootRef.update({
          dob: this.state.dob
        });
        this.state.disabled = true;
      }
      if(this.state.email!="")
      {
        rootRef.update({
          email: this.state.email
        });
        this.setState({errEmail: ""});
        this.state.disabled = true;
      } 
      if(this.state.name=="")
      {
        this.setState({err: "Kindly Fill up this field!"});
        this.state.disabled = false;
      }
      if(this.state.email=="")
      {
        this.setState({errEmail: "Kindly Enter your Email!"});
        this.state.disabled = false;
      }
      if(this.state.contact.length==0)
      {
        this.setState({errNumber: "Kindly Fill up this field!"});
        this.state.disabled = false;
      }
      if(this.state.contact.length!=0 && this.state.contact.length==10)
      {
        if(tempRef[0]==7 || tempRef[0]==8 || tempRef[0]==9)
        {
          rootRef.update({
            contact: this.state.contact
          });
          this.setState({errNumber:""});
          this.state.disabled = true;
          return;
        }
      }
      if(this.state.contact.length < 10 || this.state.contact.length > 10)
      {
        this.setState({errNumber: "Number should be of 10 digits"});
        this.state.disabled = false;
        return;
      }
      if(tempRef[0]!=7 || tempRef[0]!=8 || tempRef[0]!=9)
      {
        this.setState({errNumber: "Invalid Number (Should be starting with 7,8 or 9)"});
        this.state.disabled = false;
      }
  }

/*--- Signing Out ---- */

  signedOut() {
      firebase.auth().signOut().then(function() {
        console.log('Signed Out');
        }, function(error) {
        console.error('Sign Out Error', error);
      });
  }

/* The datepicker event */

  handleChange = (event, date) => {
      this.setState({
        dob: date,
      });
  }

  render() {
    const rootRef = firebase.database().ref().child('react');
    rootRef.update({
          image: this.state.image
        });
    return (
      <MuiThemeProvider>
        <div className="Profile">
          <Card style={{background:'#008080'}}>
            <FlatButton type="submit" label='Sign Out' primary={true} style={{color:'#fff'}} onClick={this.signedOut.bind(this)} />
          </Card>
          <Card style={{background:'#008080'}}>                     
            <div className="container">         
              <div className="row">
                <div className="col-sm-offset-5 col-sm-2 text-center">
                  <Avatar src={this.state.image} style={{height:'88px', width:'90px'}}/>
                </div>
              </div>      
            </div>
          </Card>
          <Card style={{paddingBottom: '45%'}}>
            <div className="container text-center">
              <div className="col-xs-offset-9 col-sm-4">
                <div className="row"> 
                  <FlatButton type="submit" label={this.state.disabled ? 'Edit' : 'Save'} primary={true} onClick={this.handleClick} />
                 </div>
               </div><br/><br/>
               <div className="row">
                  <div className="col-xs-10" style={{marginLeft: '-20px'}}> 
                    <NameIcon style={{marginLeft: '-300px'}}/>  
                    <div style={{marginTop: '-68px'}}><TextField type='String' value={this.state.name} onChange={this.changeNameValue} floatingLabelText="Name" errorText={this.state.err} disabled={this.state.disabled}/></div>
                  </div>
               </div><br/><br/>
               <div className="row">
                <div className="col-xs-10" style={{marginLeft: '-20px'}}>
                  <CalIcon style={{marginLeft: '-300px'}}/>
                  <div style={{marginTop: '-68px'}}><DatePicker autoOk={true} name="dob" value={this.state.dob} floatingLabelText="Date of birth" onChange={this.handleChange} disabled={this.state.disabled}/></div>
                </div>  
              </div><br/><br/>
              <div className="row">
                <div className="col-xs-10" style={{marginLeft: '-20px'}}> 
                  <SmartPhone style={{marginLeft: '-300px'}}/>  
                  <div style={{marginTop: '-68px'}}><TextField type='Number' value={this.state.contact} onChange={this.changeContactValue} floatingLabelText="Phone Number" errorText={this.state.errNumber} disabled={this.state.disabled}/></div>
                </div>  
              </div><br/><br/>
              <div className="row">
                <div className="col-xs-10" style={{marginLeft: '-20px'}}> 
                  <MailIcon style={{marginLeft: '-300px'}}/>  
                  <div style={{marginTop: '-68px'}}><TextField type='String' value={this.state.email} onChange={this.changeEmailValue} floatingLabelText="Email" errorText={this.state.errEmail} disabled={this.state.disabled}/></div>
                </div>  
              </div>
              <div className="row">                                                                 
                <div className="col-xs-10" style={{marginLeft: '-20px'}}>               
                  <div style={{position: 'relative', marginTop: '3%', width: '30%', marginLeft: '40%'}}><TextArea type='String' placeholder="&nbsp; Description" value={this.state.descrip} onChange={this.changeDescripValue} disabled={this.state.disabled}/></div>
                </div>
              </div>      
            </div>
          </Card>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Profile;