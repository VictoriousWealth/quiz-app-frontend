// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { Card, Table, Button, Toast, ToastContainer  } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';
import confetti from 'canvas-confetti';


const Dashboard = ({ darkMode }) => {
  const [files, setFiles] = useState([]);
  const [selectedFileId, setSelectedFileId] = useState(null);
  const [sections, setSections] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);


  useEffect(() => {
    API.get('user/dashboard/files', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(res => setFiles(res.data))
    .catch(err => console.error('Failed to fetch files', err));
  }, []);

  const handleFileClick = async (fileId) => {
    setSelectedFileId(fileId);
    try {
      const res = await API.get(`user/dashboard/files/${fileId}/sections`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setSections(res.data);
    } catch (err) {
      console.error("Failed to fetch sections", err);
    }
    
  };

  const handleGenerateMore = async () => {
    if (!selectedFileId) return;
    setLoading(true);
  
    try {
      await API.post(`user/dashboard/files/${selectedFileId}/generate`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
  
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      setShowToast(true);
      await handleFileClick(selectedFileId);
    } catch (err) {
      console.error("Failed to generate more quizzes", err);
      alert("Could not generate more quizzes. Try again later.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <>
      {loading && (
        <div className={`global-overlay ${darkMode ? "dark" : "light"}`}>
          <div className="spinner-border" role="status" />
        </div>
      )}
      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          bg="success"
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={2000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body>New quiz questions generated! 🎉</Toast.Body>
        </Toast>
      </ToastContainer>
      
      <div className="mt-4">
        <h2>Uploaded Files</h2>
        {(files.length === 0) && (<p>No Files Have Been Saved.</p>)}
        <div className="d-flex flex-wrap gap-3">
          {files.map(file => (
            <Card
              key={file.id}
              className={`p-3 cursor-pointer ${darkMode ? 'bg-dark text-light border-light' : 'bg-light text-dark border-dark'}`}
              onClick={() => handleFileClick(file.id)}
              style={{ width: '200px' }}
            >
              <Card.Title>{file.original_name}</Card.Title>
              <Card.Text>Uploaded: {new Date(file.uploaded_at).toLocaleDateString()}</Card.Text>
            </Card>
          ))}
        </div>

        {selectedFileId && sections.length > 0 && (
          <>
            <h3 className="mt-5">Quiz Sections</h3>
            <Table striped bordered hover variant={darkMode ? 'dark' : 'light'}>
              <thead>
                <tr>
                  <th>Section</th>
                  <th>Number of Questions</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {sections.map((sec, i) => (
                  <tr key={i}>
                    <td>Section {i + 1}</td>
                    <td>{sec.questions.length}</td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => {
                          confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
                          navigate('/quiz', {
                            state: {
                              quizData: {
                                quiz_id: sec.quiz_id,
                                questions: sec.questions.map(q => ({
                                  id: q.id,
                                  question: q.text,
                                  options: q.options,
                                  correct_answer: q.correct_answer,
                                  explanation: q.explanation
                                }))
                              }
                            }
                          });
                        }}
                      >
                        Take Quiz
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Button
                variant={darkMode ? "outline-light" : "outline-primary"}
                className="mt-3"
                onClick={handleGenerateMore}
            >
                Generate More Quizzes for This File
            </Button>
          </>
        )}
      </div>
    
    </>
  );
};

export default Dashboard;
