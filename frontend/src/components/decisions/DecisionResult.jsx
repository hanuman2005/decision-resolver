import styled from 'styled-components';
import { Award, TrendingUp, CheckCircle, Info } from 'lucide-react';
import Card from '../common/Card';
import PDFExport from './PDFExport';

/**
 * Decision Result Component
 * Displays the final decision with reasoning
 */

const DecisionResult = ({ decision, decisionFullData, groupInfo }) => {
  const { selectedOption, satisfactionRate, algorithmScore, reasoning, alternatives } =
    decision.finalDecision;


  // Styled-components (defined here for small file)
  const Root = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  `;
  const WinnerCard = styled(Card)`
    background: linear-gradient(135deg, #dcfce7 0%, #d9f99d 100%);
    border-color: #86efac;
  `;
  const WinnerHeader = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 1rem;
  `;
  const WinnerIcon = styled.div`
    width: 4rem;
    height: 4rem;
    background-color: #16a34a;
    border-radius: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  `;
  const WinnerInfo = styled.div`
    flex: 1;
  `;
  const WinnerTitle = styled.h2`
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  `;
  const WinnerOption = styled.h3`
    font-size: 1.25rem;
    font-weight: 600;
    color: #166534;
    margin-bottom: 0.5rem;
  `;
  const WinnerPrice = styled.p`
    color: #166534;
    margin-bottom: 0.5rem;
  `;
  const StatsContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 0.5rem;
    font-size: 0.875rem;
    color: #166534;
  `;
  const StatsItem = styled.span`
    display: flex;
    align-items: center;
    gap: 0.25rem;
  `;
  const ReasoningTitle = styled.h3`
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  `;
  const ReasoningList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  `;
  const ReasoningItem = styled.li`
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    color: #374151;
  `;
  const ReasoningCheck = styled.span`
    color: #0ea5e9;
    margin-top: 0.25rem;
  `;
  const AlternativesTitle = styled.h3`
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 1rem;
  `;
  const AlternativeContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  `;
  const AlternativeCard = styled.div`
    padding: 1rem;
    background-color: #f9fafb;
    border-radius: 0.5rem;
    border: 1px solid #e5e7eb;
  `;
  const AlternativeHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  `;
  const AlternativeName = styled.h4`
    font-weight: 500;
    color: #111827;
  `;
  const AlternativeScore = styled.span`
    font-size: 0.875rem;
    color: #6b7280;
  `;
  const AlternativePrice = styled.p`
    font-size: 0.875rem;
    color: #6b7280;
  `;
  const AlternativeWhy = styled.p`
    font-size: 0.875rem;
    color: #9ca3af;
    margin-top: 0.25rem;
  `;

  return (
    <Root>
      {/* Winner Card */}
      <WinnerCard>
        <WinnerHeader>
          <WinnerIcon>
            <Award style={{ width: '2rem', height: '2rem', color: 'white' }} />
          </WinnerIcon>
          <WinnerInfo>
            <WinnerTitle>🎉 Decision Made!</WinnerTitle>
            <WinnerOption>{selectedOption.name}</WinnerOption>
            {selectedOption.price > 0 && (
              <WinnerPrice>Price: ${selectedOption.price}</WinnerPrice>
            )}
            <StatsContainer>
              <StatsItem>
                <TrendingUp size={16} />
                {(satisfactionRate * 100).toFixed(0)}% satisfaction
              </StatsItem>
              <StatsItem>
                <CheckCircle size={16} />
                Score: {algorithmScore.toFixed(2)}
              </StatsItem>
            </StatsContainer>
          </WinnerInfo>
        </WinnerHeader>
      </WinnerCard>

      {/* Reasoning */}
      <Card>
        <ReasoningTitle>
          <Info style={{ width: '1.25rem', height: '1.25rem', color: '#0ea5e9' }} />
          Why This Decision?
        </ReasoningTitle>
        <ReasoningList>
          {reasoning.map((reason, index) => (
            <ReasoningItem key={index}>
              <ReasoningCheck>✓</ReasoningCheck>
              <span>{reason}</span>
            </ReasoningItem>
          ))}
        </ReasoningList>
      </Card>

      {/* Alternatives */}
      {alternatives && alternatives.length > 0 && (
        <Card>
          <AlternativesTitle>Alternative Options</AlternativesTitle>
          <AlternativeContainer>
            {alternatives.map((alt, index) => (
              <AlternativeCard key={index}>
                <AlternativeHeader>
                  <AlternativeName>{alt.option.name}</AlternativeName>
                  <AlternativeScore>Score: {alt.score.toFixed(2)}</AlternativeScore>
                </AlternativeHeader>
                {alt.option.price > 0 && (
                  <AlternativePrice>Price: ${alt.option.price}</AlternativePrice>
                )}
                <AlternativeWhy>{alt.why}</AlternativeWhy>
              </AlternativeCard>
            ))}
          </AlternativeContainer>
        </Card>
      )}

      {/* PDF Export Section */}
      <PDFExport 
        decision={decisionFullData} 
        groupInfo={groupInfo}
        showPreview={false}
      />
    </Root>
  );
};

export default DecisionResult;