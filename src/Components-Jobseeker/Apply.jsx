import React, { useState, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { JHeader } from "./JHeader";
import { Footer } from "../Components-LandingPage/Footer";
import editIcon from "../assets/EditIcon.png";
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
    name: "",
    dob: "",
    marital: "",
    mobile: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    coverLetter: "",
    resume: null,
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
    setFormData((prev) => ({ ...prev, resume: null }));
    fileInputRef.current.value = "";
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

      <div className="apply-page">

        <div className="job-header">
          <h1 className="job-title-main">{jobData?.title}</h1>

          <div className="job-meta">
            <span className="company-name">{jobData?.company}</span>
            <span><img src={time} className="card-icons" />{jobData?.duration}</span>
            <span>₹ {jobData?.salary} LPA</span>
            <span><img src={experience} className="card-icons" />{jobData?.experience} years</span>
            <span><img src={place} className="card-icons" />{jobData?.location}</span>
          </div>
        </div>

        <div className="apply-container">
          <form className="apply-card" onSubmit={handleSubmit}>

            <div className="form-row">
              <div className="form-label">Name</div>
              <div className="form-input">
                <input
                  type="text"
                  className="text-input"
                  name="name"
                  disabled={editableField !== "name"}
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-edit" onClick={() => setEditableField("name")}>
                <img src={editIcon} alt="edit" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-label">Date of Birth</div>
              <div className="form-input">
                <input
                  type="date"
                  className="text-input"
                  name="dob"
                  disabled={editableField !== "dob"}
                  value={formData.dob}
                  onChange={handleChange}
                />
              </div>
              <div className="form-edit" onClick={() => setEditableField("dob")}>
                <img src={editIcon} alt="edit" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-label">Marital status</div>
              <div className="form-input">
                <select
                  className="select-input"
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
              <div className="form-edit" onClick={() => setEditableField("marital")}>
                <img src={editIcon} alt="edit" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-label">Mobile number</div>
              <div className="form-input">
                <input
                  type="tel"
                  className="text-input"
                  name="mobile"
                  disabled={editableField !== "mobile"}
                  value={formData.mobile}
                  onChange={handleMobileChange}
                />
              </div>
              <div className="form-edit" onClick={() => setEditableField("mobile")}>
                <img src={editIcon} alt="edit" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-label">Mail ID</div>
              <div className="form-input">
                <input
                  type="email"
                  className="text-input"
                  name="email"
                  disabled={editableField !== "email"}
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-edit" onClick={() => setEditableField("email")}>
                <img src={editIcon} alt="edit" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-label">Current address</div>
              <div className="info-box">
                {editableField === "address" ? (
                  <>
                    <input className="text-input mb" name="street" placeholder="Street" value={formData.street} onChange={handleChange} />
                    <input className="text-input mb" name="city" placeholder="City" value={formData.city} onChange={handleChange} />
                    <input className="text-input mb" name="state" placeholder="State" value={formData.state} onChange={handleChange} />
                    <input className="text-input mb" name="zip" placeholder="Zip" value={formData.zip} onChange={handleChange} />
                    <input className="text-input" name="country" placeholder="Country" value={formData.country} onChange={handleChange} />
                  </>
                ) : (
                  <>
                    <div><strong>Street :</strong> {formData.street}</div>
                    <div><strong>City :</strong> {formData.city}</div>
                    <div><strong>State :</strong> {formData.state}</div>
                    <div><strong>Zip :</strong> {formData.zip}</div>
                    <div><strong>Country :</strong> {formData.country}</div>
                  </>
                )}
              </div>
              <div className="form-edit" onClick={() => setEditableField("address")}>
                <img src={editIcon} alt="edit" />
              </div>
            </div>

            <div className="form-row align-top">
              <div className="form-label">Cover letter</div>
              <div className="form-input">
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
              <div className="form-edit" onClick={() => setEditableField("coverLetter")}>
                <img src={editIcon} alt="edit" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-label">Resume</div>
              <div className="form-input">
                {!formData.resume ? (
                  <input
                    type="file"
                    className="file-input"
                    accept="application/pdf"
                    ref={fileInputRef}
                    onChange={handleResumeUpload}
                  />
                ) : (
                  <div className="resume-box">
                    <span>{formData.resume.name}</span>
                    <button type="button" className="remove-btn" onClick={removeResume}>
                      <img src={deleteIcon} alt="delete" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="action-buttons">
              {/* <button type="button" className="secondary-btn" onClick={handleSave}>
                Save changes
              </button> */}
              <button type="submit" className="primary-btn">
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
