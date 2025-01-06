import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import '../styles/QuestionsPage.css';

const QuestionsPage = () => {
  const location = useLocation();
  const { competencyId, competencyTitle, interviewId } = location.state || {};
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState({});
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!competencyId || !interviewId) {
      alert('Required information is missing. Redirecting to competency tiles page.');
      navigate('/competencies');
      return;
    }

    // Fetch questions for the selected competency
    fetch(`http://localhost:5000/api/questions?competency=${competencyId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error('Error fetching questions:', error));
  }, [competencyId, interviewId, navigate]);

  const handleOptionSelect = (questionId, topic) => {
    setResponses((prevResponses) => {
      const existingTopics = prevResponses[questionId] || [];
      let updatedTopics;

      if (existingTopics.includes(topic)) {
        // Remove the topic if it's already selected (toggle off)
        updatedTopics = existingTopics.filter((t) => t !== topic);
      } else {
        // Add the topic if it's not already selected
        updatedTopics = [...existingTopics, topic];
      }

      return { ...prevResponses, [questionId]: updatedTopics };
    });
  };

  useEffect(() => {
    // Enable the submit button only if all questions have at least one selected option
    setIsSubmitEnabled(
      questions.length > 0 && questions.every((q) => responses[q._id]?.length > 0)
    );
  }, [responses, questions]);

  const handleSubmit = () => {
    const responseData = questions.map((q) => ({
      question: q._id,
      competency: competencyId,
      selectedTopics: responses[q._id], // Send selected topics as an array
    }));

    fetch(`http://localhost:5000/api/interviews/${interviewId}/responses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ responses: responseData }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(() => {
        alert('Responses submitted successfully!');

        // Retrieve existing data from localStorage
        const storedData = localStorage.getItem('interviewData');
        if (storedData) {
          const interviewData = JSON.parse(storedData);

          // Update completed competencies
          interviewData.completedCompetencies.push(competencyId);

          // Store updated data back in localStorage
          localStorage.setItem('interviewData', JSON.stringify(interviewData));

          // Navigate back to Competency Tiles Page with updated state
          navigate('/competencies', { state: interviewData });
        } else {
          alert('Error: Missing interview data. Redirecting to start interview page.');
          navigate('/start-interview');
        }
      })
      .catch((error) => {
        console.error('Error submitting responses:', error);
        alert('Failed to submit responses.');
      });
  };

  return (
    <div className="questions-page">
      <h1>Questions for {competencyTitle}</h1>
      {questions.length === 0 ? (
        <p>Loading questions...</p>
      ) : (
        <ul>
          {questions.map((question) => (
            <li key={question._id} className="question-item">
              <p>{question.text}</p>
              <div className="options">
                {Array.isArray(question.topics) && question.topics.length > 0 ? (
                  question.topics.map((topic, index) => (
                    <label key={index} className="option">
                      <input
                        type="checkbox"
                        name={`question-${question._id}`}
                        value={topic}
                        checked={responses[question._id]?.includes(topic)}
                        onChange={() => handleOptionSelect(question._id, topic)}
                      />
                      {topic}
                    </label>
                  ))
                ) : (
                  <p className="no-options">No topics available for this question.</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
      <Button text="Submit" onClick={handleSubmit} disabled={!isSubmitEnabled} />
    </div>
  );
};

export default QuestionsPage;
