import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Button, Badge } from 'react-bootstrap';

const ResultsPage = ({ darkMode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const results = location.state?.results || [];
  const totalQuestions = results.length;
  const correctAnswers = results.filter(q => q.is_correct).length;
  const scorePercent = (correctAnswers / totalQuestions) * 100;

  const getBadgeStyle = (scorePercent) => {
    if (scorePercent >= 70) return { bg: 'success', text: 'light' };
    if (scorePercent >= 40) return { bg: 'warning', text: 'dark' };
    return { bg: 'danger', text: 'light' };
  };
  
  const { bg: badgeBg, text: badgeText } = getBadgeStyle(scorePercent);  


  if (!Array.isArray(results) || !results.some(q => q.question)) {
    return (
      <div className="text-center mt-5">
        <h4>No results found.</h4>
        <p>Please complete a quiz first.</p>
        <div className='d-flex justify-content-center gap-3 mt-3'>
          <Button
            variant={darkMode ? 'outline-light' : 'primary'}
            onClick={() => navigate('/quiz')}
            className="mt-3"
          >
            Go to Take a Quiz
          </Button>
          <Button
            variant={darkMode ? 'outline-light' : 'secondary'}
            onClick={() => navigate('/upload')}
            className="mt-3"
          >
            Go to Upload
          </Button>
          
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Quiz Results</h2>
      <h4 className="text-center mb-4">
        You got{' '}
        <Badge
          bg={badgeBg}
          text={badgeText}
          className="px-3 py-2 fs-5"
        >
          {correctAnswers} / {totalQuestions}
        </Badge>{' '}
        correct 🎯
      </h4>

      {results.map((q) => (
        <Card
          key={q.id}
          className={`mb-3 p-3 border-2 ${darkMode ? 'bg-dark text-light border-light' : 'bg-light text-dark border-dark'}`}
        >
          <Card.Title>
            {results.indexOf(q) + 1}. {q.question}
          </Card.Title>
          <Card.Subtitle className="mb-2">
            <strong>Your Answer:</strong>{' '}
            <Badge bg={q.is_correct ? 'success' : 'danger'}>
              {q.user_answer}
            </Badge>
          </Card.Subtitle>
          <Card.Text>
            <strong>Correct Answer:</strong> {q.correct_answer}
          </Card.Text>
          <Card.Text>
            <strong>Explanation:</strong> {q.explanation}
          </Card.Text>
        </Card>
      ))}
      
      <div className="d-flex flex-wrap flex-md-row flex-column justify-content-center align-items-center gap-3 mt-3 mb-3">
        <Button
          className='fs-6'
          variant={darkMode ? 'outline-light' : 'warning'}
          onClick={() =>
            navigate('/quiz', {
              state: {
                quizData: location.state?.quizData,
              }
            })
          }
        >
          Take this Quiz Again 
        </Button>
        
        <Button
          className='fs-6'
          variant={darkMode ? 'outline-light' : 'primary'}
          onClick={() => navigate('/')}
        >
          Go back to dashboard
        </Button>
        
        <Button
          className='fs-6'
          variant={darkMode ? 'outline-light' : 'success'}
          onClick={() => navigate('/history')}
        >
          Go back to history
        </Button>

        <Button
          className='fs-6'
          variant={darkMode ? 'outline-light' : 'secondary'}
          onClick={() => navigate('/upload')}
        >
          Try Another File
        </Button>
      </div>
    </div>
  );
};

export default ResultsPage;
