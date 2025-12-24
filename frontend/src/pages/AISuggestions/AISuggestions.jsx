import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, DollarSign, Utensils, Loader, CheckCircle, X, Lightbulb } from 'lucide-react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import {
  Container,
  Header,
  Badge,
  Title,
  Subtitle,
  InsightsGrid,
  InsightCard,
  InsightLabel,
  InsightValue,
  SelectorSection,
  SelectorTitle,
  ButtonGroup,
  DecisionButton,
  GenerateButton,
  ButtonContent,
  SuggestionsContainer,
  SuggestionCard,
  ConfidenceBar,
  SuggestionContent,
  SuggestionHeader,
  SuggestionName,
  ConfidenceBadge,
  SuggestionReason,
  DetailsGrid,
  DetailBox,
  DetailLabel,
  DetailValue,
  FeaturesContainer,
  FeatureBadge,
  ReasoningBox,
  ReasoningTitle,
  ReasoningText,
  ToggleButton,
  AcceptButton,
  AcceptButtonContainer,
  GuideSection,
  GuideTitle,
  GuideContent,
  GuideItem,
  GuideCode
} from './styledComponents';

/**
 * AI Suggestions System
 * Uses OpenAI API to generate smart recommendations
 * Based on group history and preferences
 */

const AISuggestions = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestions, setSelectedSuggestions] = useState([]);
  const [decisionType, setDecisionType] = useState('restaurant');
  const [groupData, setGroupData] = useState(null);
  const [expandedReasoning, setExpandedReasoning] = useState({});

  useEffect(() => {
    loadGroupData();
  }, []);

  const loadGroupData = async () => {
    try {
      // Fetch user's group data from backend
      const response = await api.get('/groups');
      if (response.data?.groups?.length > 0) {
        setGroupData(response.data.groups[0]);
      }
    } catch (error) {
      console.log('No group data available yet');
      // It's fine if no group data - show empty state
    }
  };

  const generateAISuggestions = async () => {
    setLoading(true);
    setSuggestions([]);

    try {
      // Call backend API for AI suggestions
      const response = await api.post('/ai/suggestions', {
        decisionType,
        groupData
      });

      // The API interceptor returns response.data directly
      const suggestionsData = response.suggestions || response.data?.suggestions || [];
      
      if (suggestionsData && suggestionsData.length > 0) {
        setSuggestions(suggestionsData);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error('AI suggestion error:', error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleSuggestion = (id) => {
    setSelectedSuggestions(prev =>
      prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]
    );
  };
  const toggleReasoning = (suggestionId) => {
    setExpandedReasoning(prev => ({
      ...prev,
      [suggestionId]: !prev[suggestionId]
    }));
  };
  const acceptSuggestions = () => {
    const accepted = suggestions.filter(s => selectedSuggestions.includes(s.id));
    alert(`✅ Added ${accepted.length} suggestions to your decision!\n\n${accepted.map(s => `• ${s.name}`).join('\n')}`);
  };

  return (
    <Container>
      {/* Header */}
      <Header>
        <Badge>
          <Sparkles />
          Powered by AI
        </Badge>
        <Title>
          🤖 AI Smart Suggestions
        </Title>
        <Subtitle>
          Get personalized recommendations based on your group's history and preferences
        </Subtitle>
      </Header>

      {/* Group Insights */}
      {groupData && (
      <InsightsGrid>
        <InsightCard>
          <InsightLabel>Top Cuisines</InsightLabel>
          <InsightValue>
            {groupData.preferences?.cuisines?.join(', ') || 'Not set'}
          </InsightValue>
        </InsightCard>
        <InsightCard>
          <InsightLabel>Avg Budget</InsightLabel>
          <InsightValue>
            {groupData.preferences?.avgBudget ? `$${groupData.preferences.avgBudget}` : 'Not set'}
          </InsightValue>
        </InsightCard>
        <InsightCard>
          <InsightLabel>Location</InsightLabel>
          <InsightValue>
            {groupData.preferences?.location || 'Not set'}
          </InsightValue>
        </InsightCard>
        <InsightCard>
          <InsightLabel>Decisions</InsightLabel>
          <InsightValue>
            {groupData.totalDecisions || 0} past
          </InsightValue>
        </InsightCard>
      </InsightsGrid>
      )}

      {/* Decision Type Selector */}
      <SelectorSection>
        <SelectorTitle>What type of decision?</SelectorTitle>
        <ButtonGroup>
          {[
            { value: 'restaurant', label: 'Restaurant', icon: Utensils },
            { value: 'movie', label: 'Movie', icon: '🎬' },
            { value: 'activity', label: 'Activity', icon: '🎯' }
          ].map(type => (
            <DecisionButton
              key={type.value}
              $active={decisionType === type.value}
              onClick={() => setDecisionType(type.value)}
            >
              {typeof type.icon === 'string' ? (
                <span>{type.icon}</span>
              ) : (
                <type.icon />
              )}
              {type.label}
            </DecisionButton>
          ))}
        </ButtonGroup>
      </SelectorSection>

      {/* Generate Button */}
      <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
        <GenerateButton
          onClick={generateAISuggestions}
          disabled={loading}
        >
          <ButtonContent>
            {loading ? (
              <>
                <Loader style={{ animation: 'spin 1s linear infinite' }} />
                Analyzing your group...
              </>
            ) : (
              <>
                <Sparkles />
                Generate AI Suggestions
              </>
            )}
          </ButtonContent>
        </GenerateButton>
      </div>

      {/* Suggestions List or Empty State */}
      {suggestions.length > 0 ? (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <SuggestionsContainer>
              {suggestions.map((suggestion, idx) => (
                <motion.div key={suggestion.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: idx * 0.1 }}>
                  <SuggestionCard
                    $selected={selectedSuggestions.includes(suggestion.id)}
                  >
                <ConfidenceBar $confidence={suggestion.confidence} />
                
                <SuggestionContent>
                  <SuggestionHeader>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                        <SuggestionName>
                          {suggestion.name}
                        </SuggestionName>
                        <ConfidenceBadge>
                          {suggestion.confidence}% match
                        </ConfidenceBadge>
                      </div>
                      <SuggestionReason>
                        <strong style={{ color: '#4f46e5' }}>AI Says:</strong> {suggestion.reason}
                      </SuggestionReason>
                    </div>
                    
                    <ToggleButton
                      onClick={() => toggleSuggestion(suggestion.id)}
                      $selected={selectedSuggestions.includes(suggestion.id)}
                    >
                      {selectedSuggestions.includes(suggestion.id) ? (
                        <CheckCircle />
                      ) : (
                        <X />
                      )}
                    </ToggleButton>
                  </SuggestionHeader>

                  {/* Details Grid */}
                  <DetailsGrid>
                    {Object.entries(suggestion.details).slice(0, 4).map(([key, value]) => (
                      <DetailBox key={key}>
                        <DetailLabel>
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </DetailLabel>
                        <DetailValue>
                          {value}
                        </DetailValue>
                      </DetailBox>
                    ))}
                  </DetailsGrid>

                  {/* Features */}
                  {suggestion.details.features && (
                    <FeaturesContainer>
                      {suggestion.details.features.map((feature, idx) => (
                        <FeatureBadge key={idx}>
                          <CheckCircle />
                          {feature}
                        </FeatureBadge>
                      ))}
                    </FeaturesContainer>
                  )}

                  {/* AI Reasoning */}
                  <ReasoningBox onClick={() => toggleReasoning(suggestion.id)} style={{ cursor: 'pointer' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                      <TrendingUp style={{ width: '1.25rem', height: '1.25rem', flexShrink: 0, marginTop: '0.125rem' }} />
                      <div style={{ flex: 1 }}>
                        <ReasoningTitle style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span>Why AI Recommends This</span>
                          <span style={{
                            display: 'inline-block',
                            transform: expandedReasoning[suggestion.id] ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.3s ease',
                            fontSize: '1rem',
                            flexShrink: 0
                          }}>▼</span>
                        </ReasoningTitle>
                        {expandedReasoning[suggestion.id] && (
                          <ReasoningText>
                            {suggestion.reason || suggestion.aiReasoning}
                          </ReasoningText>
                        )}
                      </div>
                    </div>
                  </ReasoningBox>
                </SuggestionContent>
                  </SuggestionCard>
                </motion.div>
              ))}
            </SuggestionsContainer>
          </motion.div>

          {/* Accept Button */}
          {selectedSuggestions.length > 0 && (
            <AcceptButtonContainer>
              <AcceptButton
                onClick={acceptSuggestions}
              >
                <CheckCircle />
                Add {selectedSuggestions.length} Selected Suggestion{selectedSuggestions.length !== 1 ? 's' : ''} to Decision
              </AcceptButton>
            </AcceptButtonContainer>
          )}
        </>
      ) : (
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <p style={{ color: '#cbd5e1', fontSize: '1.1rem' }}>
            {loading ? 'Generating suggestions...' : 'Click "Generate AI Suggestions" to get personalized recommendations'}
          </p>
        </div>
      )}

    </Container>
  );
};

export default AISuggestions;
