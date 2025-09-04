import React, { Component } from 'react';
import { withRouter } from '../../withRouter';
import './style.css';
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineQuestionMark } from "react-icons/md";
import { BsArrow90DegRight } from "react-icons/bs";

class Home extends Component {
  render() {
    return (
      <main className="main">
        <section className="hero">
          <h1>Find Your Way Around the Hospital</h1>
          <p>Navigate our facilities with ease using our intuitive wayfinding tools and resources.</p>
        </section>
        <section className="features">
          <div className="feature-card">
            <div className="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" fill="white"/>
              </svg>
            </div>
            <div className="feature-content">
              <h3>Frequently Asked Questions</h3>
              <p>Find answers to common questions about hospital services, locations, and facilities.</p>
              <button className="feature-button" onClick={() => this.props.navigate('./faqs')} >View FAQs</button>
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M14 17H4v2h10v-2zm6-8H4v2h16V9zM4 15h16v-2H4v2zM4 5v2h16V5H4z" fill="white"/>
              </svg>
            </div>
            <div className="feature-content">
              <h3>Hospital Directory</h3>
              <p>Search for departments, services, and facilities throughout our hospital network.</p>
              <button className="feature-button" onClick={() => this.props.navigate('./directory')}>Browse Directory</button>
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="white"/>
              </svg>
            </div>
            <div className="feature-content">
              <h3>Maps</h3>
              <p>Navigate our hospital with interactive maps showing the quickest routes to your destination.</p>
              <button className="feature-button" onClick={() => this.props.navigate('./map')}>Open Maps</button>
            </div>
          </div>
        </section>
      </main>
    )
  }
}

export default withRouter(Home);