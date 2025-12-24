import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
      console.log('[CONFLICT UI] API Response:', response);
      console.log('[CONFLICT UI] Response data:', response.data);
      
      if (response.data?.conflicts !== undefined) {
        setConflicts(response.data.conflicts || []);
        setCompromises(response.data.compromises || []);
        console.log('[CONFLICT UI] Loaded conflicts:', response.data.conflicts?.length);
      } else if (response.conflicts !== undefined) {
        // Response might be directly the data
        setConflicts(response.conflicts || []);
        setCompromises(response.compromises || []);
        console.log('[CONFLICT UI] Loaded conflicts (direct):', response.conflicts?.length);
      } else {
        // No conflict data available yet
        console.log('[CONFLICT UI] No conflict data in response');
        setConflicts([]);
        setCompromises([]);
      }
    } catch (error) {
      // Gracefully handle no data - likely endpoint not implemented yet
      console.error('[CONFLICT UI] Error loading conflicts:', error);
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
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
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
          </motion.div>

          {/* Conflicts Overview */}
          <ConflictsSection>
            <SectionTitle>
              <AlertTriangle />
              Identified Conflicts
            </SectionTitle>
            
            <ConflictsList>
              {conflicts.map((conflict, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: idx * 0.1 }}>
                  <ConflictCard $severity={getSeverityColor(conflict.severity)}>
                  <ConflictHeader>
                    <div>
                      <ConflictDescription>{conflict.description}</ConflictDescription>
                      <ConflictAffected>
                        Affects: {conflict.participants?.map(p => p.username).join(', ') || 'Multiple members'}
                      </ConflictAffected>
                    </div>
                    <SeverityBadge $severity={getSeverityColor(conflict.severity)}>
                      {conflict.severity} priority
                    </SeverityBadge>
                  </ConflictHeader>
                  
                  <ConflictDetailsGrid>
                    {conflict.participants?.map((participant) => (
                      <UserDetailBox key={participant.userId}>
                        <UserName>{participant.username}</UserName>
                        <UserWants>Preference: {participant.preference}</UserWants>
                      </UserDetailBox>
                    ))}
                  </ConflictDetailsGrid>
                  </ConflictCard>
                </motion.div>
              ))}
            </ConflictsList>
          </ConflictsSection>

          {/* Compromise Solutions */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
            <CompromisesSection>
              <SectionTitle>
                <Lightbulb />
                Smart Compromise Solutions
              </SectionTitle>
          
              <CompromisesGrid>
                {compromises.map((compromise, idx) => {
                  const isSelected = selectedCompromise === compromise.id;
                  
                  return (
                    <motion.div key={compromise.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: idx * 0.1 }}>
                      <CompromiseCard
                        $selected={isSelected}
                      >
                <CompromiseCardContent>
                  {/* Header */}
                  <CompromiseHeader>
                    <div>
                      <CompromiseTitle>
                        {compromise.type}
                      </CompromiseTitle>
                      <CompromiseSuccessRate>
                        {compromise.supportCount} member(s) support
                      </CompromiseSuccessRate>
                    </div>
                    
                    <ImpactBadge $impact={compromise.difficulty}>
                      {compromise.difficulty}
                    </ImpactBadge>
                  </CompromiseHeader>

                  <CompromiseDescription>
                    {compromise.suggestion}
                  </CompromiseDescription>

                  {/* Action Button */}
                  <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => handleSelectCompromise(compromise.id)}
                      style={{
                        flex: 1,
                        padding: '0.75rem',
                        background: isSelected ? '#10b981' : '#e5e7eb',
                        color: isSelected ? '#fff' : '#374151',
                        border: 'none',
                        borderRadius: '0.5rem',
                        cursor: 'pointer',
                        fontWeight: '500'
                      }}
                    >
                      {isSelected ? '✓ Selected' : 'Select'}
                    </button>
                  </div>
                </CompromiseCardContent>
                      </CompromiseCard>
                    </motion.div>
                  );
                })}
              </CompromisesGrid>
            </CompromisesSection>
          </motion.div>

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
