import React, { useState } from 'react';
import './HelpFAQ.css';
import faqImage from '../assets/FAQPage.png';
import BackIcon from '../assets/BackIcon.png';
import { JHeader } from './JHeader';
import { Footer } from '../Components-LandingPage/Footer';

const FAQ_DATA = [
    { id: 1, question: "Who can use your platform?", answer: "Our platform is open to both job seekers looking for new opportunities and employers seeking top talent." },
    { id: 2, question: "How do I create an account?", answer: "Click the 'Sign Up' button in the top right corner and follow the prompts to create your profile." },
    { id: 3, question: "Who can use your platform?", answer: "Our platform is open to both job seekers looking for new opportunities and employers seeking top talent." }, // Matching duplicate in image
    { id: 4, question: "What if I forget my password?", answer: "You can reset your password by clicking 'Forgot Password' on the login screen." },
    { id: 5, question: "Can I update my profile?", answer: "Yes, you can edit your profile details at any time from your account settings." },
    { id: 6, question: "How do I search for jobs?", answer: "Use the 'Jobs' tab in the navigation bar or the search tool on the homepage." },
    { id: 7, question: "How do I know if my application was received?", answer: "You will receive an email confirmation and see a status update in your dashboard." },
    { id: 8, question: "Can I upload multiple versions of my resume?", answer: "Yes, our platform allows you to manage and select different resumes for different applications." },
];

export const HelpFAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <div>
            <JHeader/>
            <div className="main-wrapper">
                <div className="faq-page-content">
                    <section
                        className="hero-section"
                        style={{ backgroundImage: `url(${faqImage})` }}
                    >
                        <div className="hero-overlay-content">
                            <div className="hero-stacked-container">
                                <h1 className="hero-title">Hello, how can we support you?</h1>
                                <div className="search-bar">
                                    <input
                                        type="text"
                                        placeholder="Enter a keyword search"
                                        aria-label="Search FAQs"
                                    />
                                    <button className="search-btn" aria-label="Search">
                                        <i className="fas fa-search"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>

                    <main className="main-content">
                        <aside className="sidebar">
                            <div className="support-nav">
                                <button className="back-btn" onClick={() => window.history.back()}>
                                    <img src={BackIcon} alt="Back" />
                                </button>
                                <div className="support-label">Support</div>
                            </div>
                            <h2 className="faq-heading">FAQS</h2>
                            <p className="faq-description">
                                Have any questions? We've got answers! Check out our Frequently Asked
                                Questions (FAQs) to find quick solutions to common queries.
                                Save time and get the information you need right here.
                            </p>
                        </aside>

                        <div className="faq-list">
                            {FAQ_DATA.map((item, index) => (
                                <div
                                    key={index}
                                    className={`faq-item ${activeIndex === index ? 'active' : ''}`}
                                >
                                    <div
                                        className="faq-question"
                                        onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                    >
                                        <span>{item.question}</span>
                                        <div className="arrow-icon"></div>
                                    </div>
                                    {activeIndex === index && (
                                        <div className="faq-answer">
                                            <p>{item.answer}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </main>
                </div>
            </div>
            <Footer/>
        </div>
    );
};