// PatientsList.jsx
import React, { useState } from "react";
import { FaSearch, FaFilter, FaDownload } from "react-icons/fa";
import "./styles/patientList.css";
import PatientCard from "./PatientCard";

const mockPatient = {
  id: 1,
  name: "John Doe",
  location: "New York, NY",
  avatar: "/images/profile-avatar-img.png",
  patientInfo: [
    {
      info: "weight",
      value: "180 lbs",
    },
    {
      info: "Blood Pressure",
      value: "120/80mmHg",
    },
    {
      info: "bloodGlucose",
      value: "92mg/dL",
    },
  ],
};

const PatientsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="patients-container">
      <h1 className="">Patient List</h1>
      <div className="patient-list-nav">
        <div className="search-bar">
          <FaSearch />
          <input
            type="text"
            placeholder="Search patients..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div>
          <div className="patient-list-btn-container">
            <button className="patient-list-btn ">
              <FaDownload /> <p>Download Report</p>
            </button>
            <button className="patient-list-btn">
              <FaFilter /> <p>Filter</p>
            </button>
          </div>
        </div>
      </div>
      <div className="patient-grid">
        {Array.from({ length: 8 }).map(() => (
          <PatientCard patientData={mockPatient} />
        ))}
      </div>
    </div>
  );
};

export default PatientsList;
