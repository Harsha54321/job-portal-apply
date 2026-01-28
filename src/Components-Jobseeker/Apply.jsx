import React, { useState, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { JHeader } from "./JHeader";
import { Footer } from "../Components-LandingPage/Footer";
import FormEditIcon from "../assets/FormEdit.png";
import deleteIcon from "../assets/DeleteIcon.png";
import time from "../assets/opportunity_time.png";
import experience from "../assets/opportunity_bag.png";
import place from "../assets/opportunity_location.png";

import "./Apply.css";

export default function Apply() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const fileInputRef = useRef(null);

  const { jobId, companyId, jobData } = location.state || {};
  const [editableField, setEditableField] = useState(null);

  const [formData, setFormData] = useState({
    name: "John Christopher",
    dob: "1963-06-09",
    marital: "Unmarried",
    mobile: "8394759682",
    email: "johnny.depp@gmail.com",
    street: "B-41, Koteshwar Palace, Koldongri Rd No 4, Opp.Garware House, Andheri(west)",
    city: "Mumbai",
    state: "Maharashtra",
    zip: "400069",
    country: "India",
    coverLetter: "",
    resume: null,
    resumeName: "John resume.pdf",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMobileChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 10) value = value.slice(0, 10);
    setFormData((prev) => ({ ...prev, mobile: value }));
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setFormData((prev) => ({ ...prev, resume: file }));
    } else {
      alert("Upload PDF only");
      fileInputRef.current.value = "";
    }
  };

  const removeResume = () => {
    setFormData({
      ...formData,
      resume: null,
      resumeName: "",
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };


  const validateForm = () => {
    const requiredFields = [
      "name",
      "dob",
      "marital",
      "mobile",
      "email",
      "street",
      "city",
      "state",
      "zip",
      "country",
      "coverLetter",
    ];

    for (let field of requiredFields) {
      if (!formData[field]?.toString().trim()) {
        alert(`Please fill ${field}`);
        setEditableField(
          ["street", "city", "state", "zip", "country"].includes(field)
            ? "address"
            : field
        );
        return false;
      }
    }

    if (formData.mobile.length !== 10) {
      alert("Mobile number must be exactly 10 digits");
      setEditableField("mobile");
      return false;
    }

    if (!formData.resume) {
      alert("Please upload resume");
      return false;
    }

    return true;
  };

  /* SAVE */
  // const handleSave = () => {
  //   if (window.confirm("Are you sure want to save?")) {
  //     alert("Saved successfully");
  //     setEditableField(null);
  //   }
  // };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (!window.confirm("Are you sure want to apply?")) return;

    navigate("/Job-portal/jobseeker/applied-success", {
      state: { jobId: jobId || id, companyId, jobData },
    });
  };

  return (
    <>
      <JHeader />

      <div className="apply-form-page">

        <div className="apply-form-job-header">
          <h1 className="apply-form-job-title">{jobData?.title}</h1>

          <div className="apply-form-job-meta">
            <span className="apply-form-company-name">{jobData?.company}</span>
            <span><img src={time} className="apply-form-card-icons" />{jobData?.duration}</span>
            <span>₹ {jobData?.salary} LPA</span>
            <span><img src={experience} className="apply-form-card-icons" />{jobData?.experience} years</span>
            <span><img src={place} className="apply-form-card-icons" />{jobData?.location}</span>
          </div>
        </div>

        <div className="apply-form-container">
          <form className="apply-form-card" onSubmit={handleSubmit}>

            <div className="apply-form-row">
              <div className="apply-form-label">Name</div>
              <div className="apply-form-input">
                <input
                  type="text"
                  className="apply-form-text-input"
                  name="name"
                  disabled={editableField !== "name"}
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="apply-form-edit" onClick={() => setEditableField("name")}>
                <img src={FormEditIcon} alt="edit" />
              </div>
            </div>

            <div className="apply-form-row">
              <div className="apply-form-label">Date of Birth</div>
              <div className="apply-form-input">
                <input
                  type="date"
                  className="apply-form-text-input"
                  name="dob"
                  disabled={editableField !== "dob"}
                  value={formData.dob}
                  onChange={handleChange}
                />
              </div>
              <div className="apply-form-edit" onClick={() => setEditableField("dob")}>
                <img src={FormEditIcon} alt="edit" />
              </div>
            </div>

            <div className="apply-form-row">
              <div className="apply-form-label">Marital status</div>
              <div className="apply-form-input">
                <select
                  className="apply-form-select-input"
                  name="marital"
                  disabled={editableField !== "marital"}
                  value={formData.marital}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option>Unmarried</option>
                  <option>Married</option>
                </select>
              </div>
              <div className="apply-form-edit" onClick={() => setEditableField("marital")}>
                <img src={FormEditIcon} alt="edit" />
              </div>
            </div>

            <div className="apply-form-row">
              <div className="apply-form-label">Mobile number</div>
              <div className="apply-form-input">
                <input
                  type="tel"
                  className="apply-form-text-input"
                  name="mobile"
                  disabled={editableField !== "mobile"}
                  value={formData.mobile}
                  onChange={handleMobileChange}
                />
              </div>
              <div className="apply-form-edit" onClick={() => setEditableField("mobile")}>
                <img src={FormEditIcon} alt="edit" />
              </div>
            </div>

            <div className="apply-form-row">
              <div className="apply-form-label">Mail ID</div>
              <div className="apply-form-input">
                <input
                  type="email"
                  className="apply-form-text-input"
                  name="email"
                  disabled={editableField !== "email"}
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="apply-form-edit" onClick={() => setEditableField("email")}>
                <img src={FormEditIcon} alt="edit" />
              </div>
            </div>

            <div className="apply-form-row">
              <div className="apply-form-label">Current address</div>
              <div className="apply-form-info-box">
                {editableField === "address" ? (
                  <>
                    <input className="apply-form-text-input mb" name="street" placeholder="Street" value={formData.street} onChange={handleChange} />
                    <input className="apply-form-text-input mb" name="city" placeholder="City" value={formData.city} onChange={handleChange} />
                    <input className="apply-form-text-input mb" name="state" placeholder="State" value={formData.state} onChange={handleChange} />
                    <input className="apply-form-text-input mb" name="zip" placeholder="Zip" value={formData.zip} onChange={handleChange} />
                    <input className="apply-form-text-input" name="country" placeholder="Country" value={formData.country} onChange={handleChange} />
                  </>
                ) : (
                  <>
                    <div><strong>Street</strong><p>:</p> {formData.street}</div>
                    <div><strong>City</strong><p>:</p> {formData.city}</div>
                    <div><strong>State</strong><p>:</p> {formData.state}</div>
                    <div><strong>Zip</strong><p>:</p> {formData.zip}</div>
                    <div><strong>Country</strong><p>:</p> {formData.country}</div>
                  </>
                )}
              </div>
              <div className="apply-form-edit" onClick={() => setEditableField("address")}>
                <img src={FormEditIcon} alt="edit" />
              </div>
            </div>

            <div className="apply-form-row align-top">
              <div className="apply-form-label">Cover letter</div>
              <div className="apply-form-input">
                <textarea
                  className="cover-textarea"
                  name="coverLetter"
                  placeholder="Write your cover letter here..."
                  disabled={editableField !== "coverLetter"}
                  value={formData.coverLetter}
                  onChange={handleChange}
                  rows={4}
                />
              </div>
              <div className="apply-form-edit" onClick={() => setEditableField("coverLetter")}>
                <img src={FormEditIcon} alt="edit" />
              </div>
            </div>

            <div className="apply-form-row">
              <div className="apply-form-label">Resume</div>
              <div className="apply-form-input">
                {formData.resume || formData.resumeName ? (
                  <div className="apply-form-resume-box">
                    <span>
                      {formData.resume?.name || formData.resumeName}
                    </span>

                    <button
                      type="button"
                      className="apply-form-remove-btn"
                      onClick={removeResume}
                    >
                      <img src={deleteIcon} alt="delete" />
                    </button>
                  </div>
                ) : (
                  <input
                    type="file"
                    className="apply-form-file-input"
                    accept="application/pdf"
                    ref={fileInputRef}
                    onChange={handleResumeUpload}
                  />
                )}
              </div>

            </div>

            <div className="apply-form-action-buttons">
              {/* <button type="button" className="secondary-btn" onClick={handleSave}>
                Save changes
              </button> */}
              <button type="submit" className="apply-form-primary-btn">
                Apply
              </button>
            </div>

          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}
