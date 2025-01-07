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
  const [newQuestion, setNewQuestion] = useState('');
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
      .then((data) => {
        setQuestions(data);
        setIsLoading(false); // Stop loading once data is fetched
      })
      .catch((error) => {
        console.error('Error fetching questions:', error);
        setIsLoading(false); // Stop loading even if there's an error
      });
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
    if (questions.length === 0) {
      alert('No questions available for this competency.');
      return;
    }

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

  const handleNewQuestionSubmit = (e) => {
    e.preventDefault();

    if (!newQuestion || topics.length === 0) {
      alert('Please provide a question and at least one topic.');
      return;
    }

    const newQuestionData = {
      text: newQuestion,
      topics,
      competency: competencyId,
    };

    fetch('http://localhost:5000/api/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(newQuestionData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        alert('New question submitted successfully!');
        setQuestions((prevQuestions) => [...prevQuestions, data]); // Add the new question to the list
        setNewQuestion(''); // Clear the form
        setTopics([]); // Clear topics
      })
      .catch((error) => {
        console.error('Error submitting new question:', error);
        alert('Failed to submit new question.');
      });
  };

  return (
    <div className="questions-page">
      <h1>Questions for {competencyTitle}</h1>
      {isLoading ? (
        <p>Loading questions...</p>
      ) : questions.length === 0 ? (
        <div className="no-questions">
          <p>No questions available for this competency. You can submit a new question below:</p>
          <form onSubmit={handleNewQuestionSubmit}>
            <div>
              <label>Question:</label>
              <input
                type="text"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Topics (comma-separated):</label>
              <input
                type="text"
                value={topics.join(', ')}
                onChange={(e) => setTopics(e.target.value.split(',').map((t) => t.trim()))}
                required
              />
            </div>
            <Button text="Submit Question" type="submit" />
          </form>
        </div>
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
      {questions.length > 0 && (
        <Button text="Submit" onClick={handleSubmit} disabled={!isSubmitEnabled} />
      )}
    </div>
  );
};

export default QuestionsPage;
