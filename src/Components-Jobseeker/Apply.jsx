import React, { useState, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { JHeader } from "./JHeader";
import { Footer } from "../Components-LandingPage/Footer";
import starIcon from "../assets/Star_icon.png";
import editIcon from "../assets/EditIcon.png";
import deleteIcon from "../assets/DeleteIcon.png";
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
    company: "",
    title: "",
    experience: "",
    notice: "",
    currentLocation: "",
    preferredLocation: "",
    resume: null,
  });

  /* ON CHANGE*/
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /*MOBILE: ONLY 10 DIGITS*/
  const handleMobileChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 10) value = value.slice(0, 10);
    setFormData((prev) => ({ ...prev, mobile: value }));
  };

  /* RESUME */
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

  /* VALIDATION */
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
      "company",
      "title",
      "experience",
      "notice",
      "currentLocation",
      "preferredLocation",
    ];

    for (let field of requiredFields) {
      if (!formData[field]?.toString().trim()) {
        alert(`Please fill ${field}`);
        setEditableField(
          ["street", "city", "state", "zip", "country"].includes(field)
            ? "address"
            : ["company", "title", "experience", "notice", "currentLocation", "preferredLocation"].includes(field)
              ? "job"
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
  const handleSave = () => {
    if (window.confirm("Are you sure want to save?")) {
      alert("Saved successfully");
      setEditableField(null);
    }
  };

  /* APPLY WITH CONFIRMATION */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const confirmApply = window.confirm("Are you sure want to apply?");
    if (!confirmApply) return;

    navigate("/Job-portal/jobseeker/applied-success", {
      state: { jobId: jobId || id, companyId, jobData },
    });
  };

  return (
    <>
      <JHeader />

      <div className="apply-page">
        <div className="apply-header">
          <span className="back-link" onClick={() => navigate(-1)}>
            ← Back
          </span>

          <div className="company-info">
            {jobData?.logo ? (
              <img
                src={jobData.logo}
                alt={jobData.company}
                className="company-logo"
              />
            ) : (
              <div className="company-logo placeholder">
                {jobData?.company?.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="company-text">
              <h3>{jobData?.company}</h3>
              <p>
                <img src={starIcon} alt="" />
                {jobData?.ratings} · {jobData?.reviewNo} Reviews
              </p>
            </div>
            <div className="job-title">{jobData?.title}</div>
          </div>
        </div>

        <div className="apply-container">
          <form className="apply-card" onSubmit={handleSubmit}>

            {/* NAME */}
            <div className="form-row">
              <div className="form-label">Name</div>
              <div className="form-input">
                <input
                  type="text"
                  className="text-input"
                  name="name"
                  readOnly={editableField !== "name"}
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-edit" onClick={() => setEditableField("name")}>
                <img src={editIcon} alt="edit" />
              </div>
            </div>

            {/* DOB */}
            <div className="form-row">
              <div className="form-label">Date of Birth</div>
              <div className="form-input">
                <input
                  type="date"
                  className="text-input"
                  name="dob"
                  readOnly={editableField !== "dob"}
                  value={formData.dob}
                  onChange={handleChange}
                />
              </div>
              <div className="form-edit" onClick={() => setEditableField("dob")}>
                <img src={editIcon} alt="edit" />
              </div>
            </div>

            {/* MARITAL */}
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

            {/* MOBILE */}
            <div className="form-row">
              <div className="form-label">Mobile number</div>
              <div className="form-input">
                <input
                  type="tel"
                  className="text-input"
                  name="mobile"
                  inputMode="numeric"
                  pattern="[0-9]{10}"
                  readOnly={editableField !== "mobile"}
                  value={formData.mobile}
                  onChange={handleMobileChange}
                />
              </div>
              <div className="form-edit" onClick={() => setEditableField("mobile")}>
                <img src={editIcon} alt="edit" />
              </div>
            </div>

            {/* EMAIL */}
            <div className="form-row">
              <div className="form-label">Mail ID</div>
              <div className="form-input">
                <input
                  type="email"
                  className="text-input"
                  name="email"
                  readOnly={editableField !== "email"}
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-edit" onClick={() => setEditableField("email")}>
                <img src={editIcon} alt="edit" />
              </div>
            </div>

            {/* ADDRESS */}
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

            {/* JOB */}
            <div className="form-row">
              <div className="form-label">Current job</div>
              <div className="info-box">
                {editableField === "job" ? (
                  <>
                    <input className="text-input mb" name="company" placeholder="Company" value={formData.company} onChange={handleChange} />
                    <input className="text-input mb" name="title" placeholder="Title" value={formData.title} onChange={handleChange} />
                    <input type="number" className="text-input mb" name="experience" placeholder="Experience (years)" value={formData.experience} onChange={handleChange} />
                    <input className="text-input mb" name="notice" placeholder="Notice period" value={formData.notice} onChange={handleChange} />
                    <input className="text-input mb" name="currentLocation" placeholder="Current location" value={formData.currentLocation} onChange={handleChange} />
                    <input className="text-input" name="preferredLocation" placeholder="Preferred location" value={formData.preferredLocation} onChange={handleChange} />
                  </>
                ) : (
                  <>
                    <div><strong>Company :</strong> {formData.company}</div>
                    <div><strong>Title :</strong> {formData.title}</div>
                    <div><strong>Experience :</strong> {formData.experience}</div>
                    <div><strong>Notice :</strong> {formData.notice}</div>
                    <div><strong>Current location :</strong> {formData.currentLocation}</div>
                    <div><strong>Preferred location :</strong> {formData.preferredLocation}</div>
                  </>
                )}
              </div>
              <div className="form-edit" onClick={() => setEditableField("job")}>
                <img src={editIcon} alt="edit" />
              </div>
            </div>

            {/* RESUME */}
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
              <button type="button" className="secondary-btn" onClick={handleSave}>
                Save changes
              </button>
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
