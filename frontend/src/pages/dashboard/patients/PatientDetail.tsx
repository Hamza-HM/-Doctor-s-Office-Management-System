// PatientDetail.jsx
import React from "react"; // ,{ useEffect, useState }
import "./styles/patientDetail.css";
import { useParams } from "react-router-dom";

const mockPatient = {
  id: 1,
  name: "John Doe",
  patientId: "P12345",
  address: "123 Main St, New York, NY 10001",
  appointments: 15,
  completed: 12,
  avatar: "/images/profile-avatar-img.png",
  information: [
    { title: "Date of Birth", value: "01/01/1980" },
    { title: "Gender", value: "Male" },
    { title: "Phone", value: "+1 (123) 456-7890" },
    { title: "Email", value: "john.doe@example.com" },
    { title: "Height", value: "180 cm" },
    { title: "Weight", value: "80 kg" },
    { title: "Blood Type", value: "A+" },
  ],
  timeline: [
    {
      date: "2023-06-15",
      description: "Regular check-up",
      treatment: "General examination",
      duration: "30 minutes",
      document: "Check-up report",
    },
    {
      date: "2023-05-01",
      description: "Flu symptoms",
      treatment: "Prescribed antibiotics",
      duration: "45 minutes",
      document: "Prescription",
    },
    // Add more timeline entries
  ],
};

const PatientDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  // const [patient, setPatient] = useState<typeof mockPatient | null>(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  console.log("patient id", id);
  // useEffect(() => {
  //   const fetchPatient = async () => {
  //     try {
  //       setLoading(true);
  //       // Replace this with your actual API call
  //       // const response = await fetch(`/api/patients/${id}`);
  //       // const data = await response.json();
  //       // setPatient(data);

  //       // For now, we'll use the mock data
  //       setPatient(mockPatient);
  //       setLoading(false);
  //     } catch (err) {
  //       setError("Failed to fetch patient data");
  //       setLoading(false);
  //     }
  //   };

  //   fetchPatient();
  // }, [id]);

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>{error}</div>;
  return (
    <div className="page-container">
      <div className="content-container">
        <div className="left-column">
          <img
            src={mockPatient.avatar}
            alt={mockPatient.name}
            className="patient-avatar"
          />
          <h2 className="patient-name">{mockPatient.name}</h2>
          <p className="patient-id">Patient ID: {mockPatient.patientId}</p>
          <p className="address">{mockPatient.address}</p>
          <div className="stat-container">
            <div className="stat">
              <p className="stat-value">{mockPatient.appointments}</p>
              <p className="stat-label">Appointments</p>
            </div>
            <div className="stat">
              <p className="stat-value">{mockPatient.completed}</p>
              <p className="stat-label">Completed</p>
            </div>
          </div>
          <div className="info-container">
            <h3 className="info-header">Patient Information</h3>
            {mockPatient.information.map((item, index) => (
              <div key={index} className="info-item">
                <span>{item.title}:</span>
                <span>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="right-column">
          <div className="timeline-container">
            <h3 className="timeline-header">Post Notes Appointment</h3>
            {mockPatient.timeline.map((entry, index) => (
              <div key={index} className="timeline-entry">
                <p className="timeline-date">{entry.date}</p>
                <p className="timeline-description">{entry.description}</p>
                <div className="timeline-details">
                  <div className="timeline-detail-item">
                    <strong>Treatment:</strong> {entry.treatment}
                  </div>
                  <div className="timeline-detail-item">
                    <strong>Duration:</strong> {entry.duration}
                  </div>
                  <div className="timeline-detail-item">
                    <strong>Document:</strong> {entry.document}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetail;
