import styled from 'styled-components';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from '../common/Card';

/**
 * Scoring Visualization Component
 * Visual charts showing decision scores
 */

const ScoringVisualization = ({ scoringDetails }) => {

  // Styled-components (defined here for small file)
  const Container = styled.div`
    width: 100%;
  `;
  const Title = styled.h3`
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #111827;
  `;
  const ChartContainer = styled.div`
    width: 100%;
    height: 300px;
  `;
  const PerUserSection = styled.div`
    margin-top: 2rem;
  `;
  const PerUserTitle = styled.h4`
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 1rem;
  `;
  const UserScoreCard = styled.div`
    padding: 0.75rem;
    background-color: #f9fafb;
    border-radius: 0.5rem;
    margin-bottom: 0.5rem;
  `;
  const UserScoreHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;
  const UserScoreName = styled.span`
    font-weight: 500;
  `;
  const UserScoreValue = styled.span`
    color: #0ea5e9;
    font-weight: 600;
  `;
  const UserScoreBreakdown = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
    margin-top: 0.5rem;
    font-size: 0.875rem;
    color: #6b7280;
  `;

  // Transform data for chart
  const chartData = scoringDetails?.map((item) => ({
    name: item.optionId.substring(0, 15) + '...',
    score: parseFloat((item.totalScore * 100).toFixed(1)),
  })) || [];

  return (
    <Card>
      <Container>
        <Title>Score Comparison</Title>
        <ChartContainer>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="score" fill="#0ea5e9" name="Score (%)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
        {/* Per-user scores */}
        <PerUserSection>
          <PerUserTitle>Per-User Scores</PerUserTitle>
          {scoringDetails?.[0]?.perUserScores?.map((userScore, index) => (
            <UserScoreCard key={index}>
              <UserScoreHeader>
                <UserScoreName>User {index + 1}</UserScoreName>
                <UserScoreValue>{(userScore.score * 100).toFixed(0)}%</UserScoreValue>
              </UserScoreHeader>
              {userScore.breakdown && (
                <UserScoreBreakdown>
                  <div>Budget: {(userScore.breakdown.budgetScore * 100).toFixed(0)}%</div>
                  <div>Location: {(userScore.breakdown.locationScore * 100).toFixed(0)}%</div>
                  <div>Preferences: {(userScore.breakdown.preferenceScore * 100).toFixed(0)}%</div>
                </UserScoreBreakdown>
              )}
            </UserScoreCard>
          ))}
        </PerUserSection>
      </Container>
    </Card>
  );
};

export default ScoringVisualization;