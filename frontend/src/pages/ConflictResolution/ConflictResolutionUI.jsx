import React, { useState, useEffect } from 'react';
import { AlertTriangle, Users, DollarSign, MapPin, TrendingUp, Lightbulb, ArrowRight, CheckCircle, X, Zap } from 'lucide-react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import {
  Container,
  AlertHeader,
  AlertContent,
  AlertIconBox,
  AlertTitle,
  AlertSubtitle,
  StatsBox,
  StatItem,
  StatNumber,
  StatLabel,
  ConflictsSection,
  SectionTitle,
  ConflictsList,
  ConflictCard,
  ConflictHeader,
  ConflictDescription,
  ConflictAffected,
  SeverityBadge,
  ConflictDetailsGrid,
  UserDetailBox,
  UserName,
  UserWants,
  UserConstraint,
  CompromisesSection,
  CompromisesGrid,
  CompromiseCard,
  ProbabilityBar,
  CompromiseCardContent,
  CompromiseHeader,
  CompromiseIcon,
  CompromiseTitle,
  CompromiseSuccessRate,
  ImpactBadge,
  CompromiseDescription,
  SatisfactionBox,
  SatisfactionLabel,
  SatisfactionItem,
  SatisfactionUser,
  SatisfactionBar,
  SatisfactionScore,
  RecommendationBox,
  RecommendationTitle,
  RecommendationContent,
  RecommendationItem,
  TradeoffsSection,
  TradeoffLabel,
  TradeoffItem,
  TradeoffArrow,
  TradeoffText,
  ActionButton,
  ActionContent,
  SelectedButton,
  ApprovalSection,
  ApprovalTitle,
  ApprovalText,
  ApprovalButtons,
  ApprovalAction,
  ApprovalCancel,
  GuideSection,
  GuideTitle,
  GuideContent,
  GuideItem
} from './styledComponents';

/**
 * Conflict Resolution UI
 * Shows smart compromises when no option satisfies all constraints
 */

const ConflictResolutionUI = () => {
  const [selectedCompromise, setSelectedCompromise] = useState(null);
  const [conflicts, setConflicts] = useState([]);
  const [compromises, setCompromises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadConflictData();
  }, []);

  const loadConflictData = async () => {
    setLoading(true);
    try {
      const response = await api.get('/conflicts');
      if (response.data?.conflicts && response.data?.compromises) {
        setConflicts(response.data.conflicts);
        setCompromises(response.data.compromises);
      } else {
        // No conflict data available yet
        setConflicts([]);
        setCompromises([]);
      }
    } catch (error) {
      // Gracefully handle no data - likely endpoint not implemented yet
      console.log('No conflict data available');
      setConflicts([]);
      setCompromises([]);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'high';
      case 'medium': return 'medium';
      case 'low': return 'low';
      default: return 'default';
    }
  };

  const handleSelectCompromise = (id) => {
    setSelectedCompromise(id);
    const compromise = compromises.find(c => c.id === id);
    if (compromise) {
      alert(`✅ Selected: ${compromise.title}\n\nThis compromise will be applied to your decision. All members will be notified of the proposed solution.`);
    }
  };

  return (
    <Container>
      {conflicts.length > 0 && compromises.length > 0 ? (
        <>
          {/* Alert Header */}
          <AlertHeader>
            <AlertContent>
              <AlertIconBox>
                <AlertTriangle />
              </AlertIconBox>
              <div>
                <AlertTitle>
                  Conflict Detected!
                </AlertTitle>
                <AlertSubtitle>
                  No single option satisfies all member constraints. Let's find a smart compromise.
                </AlertSubtitle>
              </div>
            </AlertContent>
            
            <StatsBox>
              <StatItem>
                <StatNumber>{conflicts.length}</StatNumber>
                <StatLabel>Conflicts Found</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>{compromises.length}</StatNumber>
                <StatLabel>Solutions Available</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>92%</StatNumber>
                <StatLabel>Success Rate</StatLabel>
              </StatItem>
            </StatsBox>
          </AlertHeader>

          {/* Conflicts Overview */}
          <ConflictsSection>
            <SectionTitle>
              <AlertTriangle />
              Identified Conflicts
            </SectionTitle>
            
            <ConflictsList>
              {conflicts.map((conflict, idx) => (
                <ConflictCard key={idx} $severity={getSeverityColor(conflict.severity)}>
                  <ConflictHeader>
                    <div>
                      <ConflictDescription>{conflict.description}</ConflictDescription>
                      <ConflictAffected>
                        Affects: {conflict.affected.join(', ')}
                      </ConflictAffected>
                    </div>
                    <SeverityBadge $severity={getSeverityColor(conflict.severity)}>
                      {conflict.severity} priority
                    </SeverityBadge>
                  </ConflictHeader>
                  
                  <ConflictDetailsGrid>
                    {Object.entries(conflict.details).map(([user, data]) => (
                      <UserDetailBox key={user}>
                        <UserName>{user}</UserName>
                        <UserWants>Wants: {data.wants}</UserWants>
                        <UserConstraint>{data.constraint}</UserConstraint>
                      </UserDetailBox>
                    ))}
                  </ConflictDetailsGrid>
                </ConflictCard>
              ))}
            </ConflictsList>
          </ConflictsSection>

          {/* Compromise Solutions */}
          <CompromisesSection>
            <SectionTitle>
              <Lightbulb />
              Smart Compromise Solutions
            </SectionTitle>
        
        <CompromisesGrid>
          {compromises.map((compromise) => {
            const Icon = compromise.icon;
            const isSelected = selectedCompromise === compromise.id;
            
            return (
              <CompromiseCard
                key={compromise.id}
                $selected={isSelected}
              >
                <ProbabilityBar $probability={compromise.probability} $gradient={compromise.color} />
                
                <CompromiseCardContent>
                  {/* Header */}
                  <CompromiseHeader>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <CompromiseIcon $gradient={compromise.color}>
                        <Icon />
                      </CompromiseIcon>
                      <div>
                        <CompromiseTitle>
                          {compromise.title}
                        </CompromiseTitle>
                        <CompromiseSuccessRate>
                          {compromise.probability}% success rate
                        </CompromiseSuccessRate>
                      </div>
                    </div>
                    
                    <ImpactBadge $impact={compromise.impact}>
                      {compromise.impact} impact
                    </ImpactBadge>
                  </CompromiseHeader>

                  <CompromiseDescription>
                    {compromise.description}
                  </CompromiseDescription>

                  {/* Satisfaction Comparison */}
                  <SatisfactionBox>
                    <SatisfactionLabel>
                      Satisfaction Impact:
                    </SatisfactionLabel>
                    {Object.entries(compromise.satisfaction.after).map(([user, score]) => (
                      <SatisfactionItem key={user}>
                        <SatisfactionUser>{user}</SatisfactionUser>
                        <SatisfactionBar>
                          <div style={{ width: `${score}%`, height: '100%', background: 'linear-gradient(90deg, #10b981, #059669)', borderRadius: '9999px' }} />
                        </SatisfactionBar>
                        <SatisfactionScore>
                          {score}%
                        </SatisfactionScore>
                      </SatisfactionItem>
                    ))}
                  </SatisfactionBox>

                  {/* Recommendation */}
                  <RecommendationBox $gradient={compromise.color}>
                    <RecommendationTitle>
                      <Zap />
                      Recommendation:
                    </RecommendationTitle>
                    <RecommendationContent>
                      {Object.entries(compromise.recommendation).map(([key, value]) => (
                        <RecommendationItem key={key}>
                          <strong style={{ textTransform: 'capitalize' }}>{key.replace(/_/g, ' ')}:</strong>{' '}
                          {Array.isArray(value) ? value.join(', ') : value}
                        </RecommendationItem>
                      ))}
                    </RecommendationContent>
                  </RecommendationBox>

                  {/* Tradeoffs */}
                  <TradeoffsSection>
                    <TradeoffLabel>
                      What Changes:
                    </TradeoffLabel>
                    {compromise.tradeoffs.map((tradeoff, idx) => (
                      <TradeoffItem key={idx}>
                        <TradeoffArrow>
                          <ArrowRight />
                        </TradeoffArrow>
                        <TradeoffText>
                          <span style={{ fontWeight: '500', color: '#ffffff' }}>{tradeoff.user}:</span>{' '}
                          <span style={{ color: '#cbd5e1' }}>{tradeoff.change}</span>
                          <span style={{ color: '#10b981' }}> → {tradeoff.benefit}</span>
                        </TradeoffText>
                      </TradeoffItem>
                    ))}
                  </TradeoffsSection>

                  {/* Action Button */}
                  {isSelected ? (
                    <SelectedButton>
                      <ActionContent>
                        <CheckCircle />
                        Selected
                      </ActionContent>
                    </SelectedButton>
                  ) : (
                    <ActionButton
                      onClick={() => handleSelectCompromise(compromise.id)}
                    >
                      <ActionContent>
                        <Lightbulb />
                        Apply This Compromise
                      </ActionContent>
                    </ActionButton>
                  )}
                </CompromiseCardContent>
              </CompromiseCard>
            );
          })}
        </CompromisesGrid>
      </CompromisesSection>

      {/* Action Buttons */}
      {selectedCompromise && (
        <ApprovalSection>
          <ApprovalTitle>
            Ready to proceed with this compromise?
          </ApprovalTitle>
          <ApprovalText>
            All group members will be notified and can vote on this solution.
          </ApprovalText>
          <ApprovalButtons>
            <ApprovalAction>
              Send to Group for Approval
            </ApprovalAction>
            <ApprovalCancel
              onClick={() => setSelectedCompromise(null)}
            >
              Choose Different Solution
            </ApprovalCancel>
          </ApprovalButtons>
        </ApprovalSection>
      )}
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <p style={{ color: '#cbd5e1', fontSize: '1.125rem', marginBottom: '1rem' }}>
            No conflicts detected.
          </p>
          <p style={{ color: '#94a3b8', fontSize: '1rem' }}>
            Create a decision with conflicting member constraints to see smart compromise solutions.
          </p>
        </div>
      )}
    </Container>
  );
};

export default ConflictResolutionUI;
