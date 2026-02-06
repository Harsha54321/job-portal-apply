import React, { useState } from 'react'
import { JHeader } from './JHeader'
import { Footer } from '../Components-LandingPage/Footer'
import "./HelpCenter.css";
import Helpcenterimg from "../assets/Helpcenter.png";
import search from '../assets/icon_search.png'
import { Link } from 'react-router-dom';


export default function HelpCenter() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleItem = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };
    return (
        <div>
            <JHeader />
            <div className='Helpcenter-page'>
                <div className="help-hero">
                    <img src={Helpcenterimg} alt="helpcenter" className="Help-Img" />

                    <div className="hero-content">
                        <h2>Hello, how can we support you?</h2>
                        <p>
                            Welcome to our help center! Here, you'll find answers to frequently asked
                            questions, helpful guides, and useful tips to assist you in getting the
                            most out of our platform.
                        </p>

                        <div className="search-box">
                            <input type="text" placeholder="Enter a keyword search" />
                            <button>
                                <img src={search} alt="search" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="help-section">
                    <h2 className="section-title">Categories</h2>

                    <div className="help-layout">

                        <div className="hc-sidebar">

                            {/* JOB SEEKERS */}
                            <div
                                className={`hc-main-item ${openIndex === 0 ? "active-main open" : ""
                                    }`}
                                onClick={() => toggleItem(0)}
                            >
                                <span>For Job Seekers</span>
                                <i className="hc-arrow"></i>
                            </div>

                            {openIndex === 0 && (
                                <div className="hc-submenu">
                                    <Link to='/Job-portal/jobseeker/help-center/profile-creation-help' className="hc-submenu-link" >
                                        <div className="hc-submenu-item">Profile creation</div>
                                    </Link>
                                    <Link to='/Job-portal/jobseeker/help-center/resume-upload-help' className="hc-submenu-link" >
                                        <div className="hc-submenu-item">Resume upload</div>
                                    </Link>

                                    <div className="hc-submenu-item">Job apply issues</div>
                                    <div className="hc-submenu-item">Interview scheduling</div>
                                </div>
                            )}

                            {/* EMPLOYERS */}
                            <div
                                className={`hc-main-item ${openIndex === 1 ? "active-main open" : ""
                                    }`}
                                onClick={() => toggleItem(1)}
                            >
                                <span>For Employers</span>
                                <i className="hc-arrow"></i>
                            </div>

                            {openIndex === 1 && (
                                <div className="hc-submenu">
                                    <div className="hc-submenu-item">Job posting</div>
                                    <div className="hc-submenu-item">Candidate search</div>
                                    <div className="hc-submenu-item">Subscription issues</div>
                                    <div className="hc-submenu-item">Invoice & payment</div>
                                </div>
                            )}

                            {/* TECHNICAL */}
                            <div
                                className={`hc-main-item ${openIndex === 2 ? "active-main open" : ""
                                    }`}
                                onClick={() => toggleItem(2)}
                            >
                                <span>Technical issue</span>
                                <i className="hc-arrow"></i>
                            </div>

                            {openIndex === 2 && (
                                <div className="hc-submenu">
                                    <div className="hc-submenu-item">Login issues</div>
                                    <div className="hc-submenu-item">Page errors</div>
                                    <div className="hc-submenu-item">File upload problems</div>
                                </div>
                            )}

                        </div>

                        <div className="support-options">
                            <Link to='/Job-portal/jobseeker/help-center/help-FAQs' className="support-item" ><div >Popular Articles / FAQs</div></Link>
                            <Link to='/Job-portal/jobseeker/help-center/raise-a-ticket' className="support-item" ><div >Raise a Ticket</div></Link>
                            <Link to='/Job-portal/jobseeker/help-center/live-chat' className="support-item" ><div >Live Chat</div></Link>

                        </div>
                    </div>
                </div>



            </div>

            <Footer />
        </div>
    )
}
