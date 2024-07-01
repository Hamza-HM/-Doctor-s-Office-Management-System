// PatientsList.jsx
import React, { useState } from "react";
import { FaSearch, FaFilter, FaDownload } from "react-icons/fa";
import "./styles/patientList.css";

const mockPatients = [
  {
    id: 1,
    name: "John Doe",
    location: "New York, NY",
    weight: "180 lbs",
    bloodPressure: "120/80 mmHg",
    bloodGlucose: "100 mg/dL",
    avatar: "/images/profile-avatar-img.png",
  },
];

const PatientsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredPatients = mockPatients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="patients-container">
      <h1 className="">Patient List</h1>
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
        <button className="button">
          <FaFilter /> Filter
        </button>
        <button className="button">
          <FaDownload /> Download Report
        </button>
      </div>
      <div className="patient-grid">
        {filteredPatients.map((patient) => (
          <div key={patient.id} className="patient-card">
            <img src={patient.avatar} alt={patient.name} className="" />
            <h2 className="patient-name">{patient.name}</h2>
            <p className="patient-location">{patient.location}</p>
            <hr className="divider" />
            <div className="patient-info">
              <span>Weight:</span>
              <span>{patient.weight}</span>
            </div>
            <div className="patient-info">
              <span>Blood Pressure:</span>
              <span>{patient.bloodPressure}</span>
            </div>
            <div className="patient-info">
              <span>Blood Glucose:</span>
              <span>{patient.bloodGlucose}</span>
            </div>
            <button className="button view-detail-button">
              View Patient Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientsList;
