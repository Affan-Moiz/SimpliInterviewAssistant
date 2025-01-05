const calculateScores = (interview) => {
    const technicalScores = interview.competencies.filter((comp) => comp.type === 'technical');
    const behavioralScores = interview.competencies.filter((comp) => comp.type === 'behavioral');
  
    const technicalScore = technicalScores.reduce((sum, comp) => sum + comp.score, 0) / technicalScores.length || 0;
    const behavioralScore = behavioralScores.reduce((sum, comp) => sum + comp.score, 0) / behavioralScores.length || 0;
    const totalScore = (technicalScore + behavioralScore) / 2;
  
    return {
      technicalScore: Math.round(technicalScore),
      behavioralScore: Math.round(behavioralScore),
      totalScore: Math.round(totalScore),
    };
  };
  
  module.exports = calculateScores;
  