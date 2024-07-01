import React from "react";
import { useNavigate } from "react-router-dom";

interface PatientCardProps {
  patientData: {
    id: number;
    name: string;
    location: string;
    avatar: string;
    patientInfo: Array<{
      info: string;
      value: string;
    }>;
  };
}

const PatientCard: React.FC<PatientCardProps> = ({ patientData }) => {
  const navigate = useNavigate();
  const handlePageDetail = () => {
    navigate(`/patient-detail/${patientData.id}`);
  };
  return (
    <div key={patientData.id} className="patient-card">
      <img
        src={patientData.avatar}
        alt={patientData.name}
        className="patient-avatar"
      />
      <h2 className="patient-name">{patientData.name}</h2>
      <p className="patient-location">{patientData.location}</p>
      <hr className="divider" />
      {patientData.patientInfo.map((patientInfo) => (
        <div className="patient-info">
          <span className="patient-info-key">{patientInfo.info}:</span>
          <span className="patient-info-value">{patientInfo.value}</span>
        </div>
      ))}
      <button
        className="btn btn-primary patient-card-btn"
        onClick={handlePageDetail}
      >
        View Patient Details
      </button>
    </div>
  );
};

export default PatientCard;
