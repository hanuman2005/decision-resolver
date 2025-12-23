
import { Clock, CheckCircle, Calendar } from 'lucide-react';
import Card from '../common/Card';
import styled from 'styled-components';

/**
 * Decision History Component
 * Timeline of past decisions
 */


const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const DecisionCard = styled.div`
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
`;
const DecisionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
`;
const StatusBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
`;
const MetaInfo = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 0.75rem;
  color: #6b7280;
`;

function getStatusStyles(status) {
  switch (status) {
    case 'completed':
      return { backgroundColor: '#dcfce7', color: '#15803d' };
    case 'processing':
      return { backgroundColor: '#fef3c7', color: '#b45309' };
    default:
      return { backgroundColor: '#dbeafe', color: '#1e40af' };
  }
}

const Title = styled.h4`
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.25rem;
`;
const Category = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
`;


const DecisionHistory = ({ decisions, onDecisionClick }) => {
  if (!decisions || decisions.length === 0) {
    return (
      <Card>
        <div style={{ textAlign: 'center', padding: '3rem 0', color: '#9ca3af' }}>
          <Clock size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
          <p>No decision history yet</p>
        </div>
      </Card>
    );
  }

  return (
    <Container>
      {decisions.map((decision) => (
        <DecisionCard
          key={decision._id}
          onClick={() => onDecisionClick && onDecisionClick(decision._id)}
          onMouseEnter={e => {
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
            e.currentTarget.style.borderColor = '#0ea5e9';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.borderColor = '#e5e7eb';
          }}
        >
          <DecisionHeader>
            <div style={{ flex: 1 }}>
              <Title>{decision.title}</Title>
              <Category>{decision.category}</Category>
            </div>
            <StatusBadge style={getStatusStyles(decision.status)}>
              {decision.status}
            </StatusBadge>
          </DecisionHeader>
          <MetaInfo>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Calendar size={14} />
              {new Date(decision.createdAt).toLocaleDateString()}
            </span>
            {decision.status === 'completed' && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <CheckCircle size={14} />
                {decision.finalDecision?.selectedOption?.name}
              </span>
            )}
          </MetaInfo>
        </DecisionCard>
      ))}
    </Container>
  );
};

export default DecisionHistory;