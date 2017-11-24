import React from 'react';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';
import { firebase, googleProvider } from 'myFirebase';

import * as actions from 'actions';

export class OrderCreate extends React.Component {
  constructor(props) {
    super(props);
    this.onLogout = this.onLogout.bind(this);
    this.handaleAttachment = this.handaleAttachment.bind(this);
  }
  onLogout(e) {
    e.preventDefault();
    var {dispatch} = this.props;

    dispatch(actions.startLogout());
  }

  handleSubmit(e) {
    e.preventDefault();
    var {dispatch} = this.props;
    //validations
    var tempOrder = {
      name: this.refs.name.value,
      pharmacy: this.refs.pharmacy.value,
      receivedby: 'geQRvcpzzbYzLr36U238K7FvqH03'
    };
    
    var attachment = $('#exampleFileUploadi')[0].files[0];

     // Create the file metadata
     var metadata = {
      contentType: 'image/jpg'
    };
    // Upload file and metadata to the object 'images/mountains.jpg'
    var storageRef = firebase.storage().ref();
    var uploadTask = storageRef.child('images/' + attachment.name).put(attachment, metadata);

    return uploadTask.on('state_changed', function (snapshot) {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
      }
    }, function (error) {
      // Handle unsuccessful uploads
    }, function () {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      var downloadURL = uploadTask.snapshot.downloadURL;
      console.log("downloadURL " + "\n" + downloadURL);
      tempOrder.prescripUrl = downloadURL;

      dispatch(actions.startAddOrder(tempOrder)).then(() => {
        hashHistory.push('/orders');
      });

    });


  }

  handaleAttachment(e) {
    console.log('this');
  }

  render() {
    var redirectToOrders = () => {
      hashHistory.push('/orders');
    };
    return(
      <div>
        <div className="page-action">
          <a href="#" onClick={this.onLogout}>Logout</a>
        </div>
        <h1 className="page-title">Place your order...</h1>
        <div className="row">
          <div className="column small-centered small-11 medium-8 large-8">
            <div className="page-route">
              <a onClick={redirectToOrders}>list my orders</a>
            </div>
            <div className="container">
              <form ref="form" onSubmit={this.handleSubmit.bind(this)}>
                <div className="container_container">
                  <div className="row">
                    <div className="medium-2 columns"><label>Name</label></div>
                    <div className="medium-10 columns">
                      <input type="text" ref="name" placeholder="Patient name"/>
                    </div>
                  </div>
                  <div className="row">
                    <div className="medium-2 columns"><label>Location</label></div>
                    <div className="medium-10 columns">
                      <input type="text" ref="location" placeholder="Phamarcy location"/>
                    </div>
                  </div>
                  <div className="row">
                    <div className="medium-2 columns"><label>Phamarcy</label></div>
                    <div className="medium-8 columns">
                      <input type="text" ref="pharmacy" placeholder="Phamarcy name"/>
                    </div>
                    <div className="medium-2 columns inner-route">
                      <a>view in map</a>
                    </div>
                  </div>
                  <div className="row">
                    <div className="medium-2 columns"><label>Prescription</label></div>
                    <div className="medium-10 columns">
                    <label htmlFor="exampleFileUploadi" className="button">Upload File</label>
                    <input type="file" ref="prescription" id="exampleFileUploadi" className="show-for-sr"/>
                    </div>
                  </div>
                  <div className="row">
                    <div className="medium-2 columns"></div>
                    <div className="medium-10 columns">
                      <button type="submit" className="button Primary expanded">Place my order</button>
                    </div>
                  </div>
                </div>
              </form>
             </div>
           </div>
         </div>
       </div>
    );
  }
}

export default connect()(OrderCreate);
