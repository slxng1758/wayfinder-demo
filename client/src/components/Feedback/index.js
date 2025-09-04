import React, { Component } from 'react';
import './style.css';

class Feedback extends Component {
  render() {
    return (
      <>
      <div className="title-container">
        <h1 className="title">Feedback</h1>
        </div>
        <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdJoV8gHmp4djwpJIJAha48j_vMEWtbeuUVjALZ23-salJZUA/viewform?embedded=true" width="100%" height="700px;" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe> 
      </>
    )
  }
}

export default Feedback;