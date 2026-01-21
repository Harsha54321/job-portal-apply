import React from "react";
import { JHeader } from "./JHeader";
import Success from "../assets/Success.png";
import { Footer } from "../Components-LandingPage/Footer";
import "./AppliedSuccessfull.css";
import { useParams, useLocation } from "react-router-dom";

export default function AppliedSuccessfull() {
  const { id } = useParams();
  const location = useLocation();

  // get data from navigation state
  const { jobId, companyId, jobData } = location.state || {};

  console.log("URL id:", id);
  console.log("Applied jobId:", jobId);
  console.log("companyId:", companyId);
  console.log("jobData:", jobData);

  return (
    <div className="success-page">
      <JHeader />

      <div className="success-container">
        <img
          src={Success}
          alt="Applied-successfully"
          className="success-image"
        />

        <h2 className="success-title">Congratulations!</h2>

        <p className="success-text">
          You have successfully applied to the{" "}
          <span className="job-title">
            {jobData?.title || "this job"}
          </span>{" "}
          position
        </p>
      </div>

      <Footer />
    </div>
  );
}

