import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { JHeader } from './JHeader';
import { Footer } from '../Components-LandingPage/Footer';
import "./HelpCenter.css";
import Helpcenterimg from "../assets/Helpcenter.png";
import search from '../assets/icon_search.png';


export default function HelpCenter() {

    const [openIndex, setOpenIndex] = useState(null);

    const [activeSubIndex, setActiveSubIndex] = useState(null);

    const toggleItem = (index) => {

        setOpenIndex(openIndex === index ? null : index);
        setActiveSubIndex(null);
    };

    const toggleSubItem = (subIndex) => {
        setActiveSubIndex(activeSubIndex === subIndex ? null : subIndex);
    };

    const helpData = [
        {
            title: "For Job Seekers",
            items: [
                { q: "Profile creation", a: "Click on the 'Sign Up' button and follow the prompts to enter your education and work history." },
                { q: "Resume upload", a: "You can upload your resume in PDF or DOCX format within your profile settings." },
                { q: "Job apply issues", a: "Ensure you are logged in and your profile is complete before clicking 'Apply'." },
                { q: "Interview scheduling", a: "Employers will send requests via the platform; you can accept or suggest new times in your dashboard." }
            ]
        },
        {
            title: "For Employers",
            items: [
                { q: "Job posting", a: "Navigate to the 'Post a Job' section and fill in the role requirements and salary range." },
                { q: "Candidate search", a: "Use our advanced filters to sort candidates by skills, location, and experience level." },
                { q: "Subscription issues", a: "Manage your billing and plan details under the 'Account Settings' tab." },
                { q: "Invoice & payment", a: "Invoices are automatically generated and available for download after every transaction." }
            ]
        },
        {
            title: "Technical issue",
            items: [
                { q: "Login issues", a: "Try resetting your password. If the issue persists, clear your browser cookies and try again." },
                { q: "Page errors", a: "This usually happens due to a weak connection. Try refreshing the page or checking your internet." },
                { q: "File upload problems", a: "Ensure your file size does not exceed 5MB and is a supported format." }
            ]
        }
    ];

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
                            questions and useful tips to assist you.
                        </p>
                        <div className="search-box">
                            <input type="text" placeholder="Enter a keyword search" />
                            <button><img src={search} alt="search" /></button>
                        </div>
                    </div>
                </div>

                <div className="help-section">
                    <h2 className="section-title">Categories</h2>
                    <div className="help-layout">

                        <div className="hc-sidebar">
                            {helpData.map((category, idx) => (
                                <div key={idx} className="hc-category-group">
                                    <div
                                        className={`hc-main-item ${openIndex === idx ? "active-main open" : ""}`}
                                        onClick={() => toggleItem(idx)}
                                    >
                                        <span>{category.title}</span>
                                        <i className={`hc-arrow ${openIndex === idx ? "up" : "down"}`}></i>
                                    </div>

                                    {openIndex === idx && (
                                        <div className="hc-submenu">
                                            {category.items.map((subItem, sIdx) => (
                                                <div key={sIdx} className="hc-sub-wrapper">
                                                    <div
                                                        className={`hc-submenu-item ${activeSubIndex === sIdx ? "active-sub" : ""}`}
                                                        onClick={() => toggleSubItem(sIdx)}
                                                    >
                                                        {subItem.q}
                                                    </div>

                                                    {activeSubIndex === sIdx && (
                                                        <div className="hc-answer-box">
                                                            {subItem.a}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="support-options">
                            <Link to='/Job-portal/jobseeker/help-center/help-FAQs' className="support-item">
                                <div>Popular Articles / FAQs</div>
                            </Link>
                            <Link to='/Job-portal/jobseeker/help-center/raise-a-ticket' className="support-item">
                                <div>Raise a Ticket</div>
                            </Link>
                            <Link to='/Job-portal/jobseeker/help-center/live-chat' className="support-item">
                                <div>Live Chat</div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}