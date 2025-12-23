import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Clock, Users, TrendingUp, Award, Info } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import decisionService from '../../services/decisionService';
import Button from '../../components/common/Button';
import Loading from '../../components/common/Loading';
import PDFExport from '../../components/decisions/PDFExport';
import toast from 'react-hot-toast';
import {
  DecisionDetailContainer,
  DecisionContentWrapper,
  BackButton,
  Header,
  StatusBadge,
  ProgressBar,
  ProgressFill,
  Avatar,
  ReasonList,
  AltOptionBox,
  FlexRow,
  FlexCol,
  Title,
  SubTitle,
  Section,
  Label,
  Value,
  InfoText,
  OptionPrice,
  Satisfaction,
  SubmissionRow,
  SubmissionUser,
  SubmissionName,
  SubmissionStatus,
  HeaderRow,
  StatsRow,
  StatItem,
  WinnerStatsRow,
  CollectingRow,
  SubmitCol,
  WinnerCard,
  WinnerRow,
  WinnerIconCol,
  WinnerContentCol,
  WinnerTitle,
  WinnerStat,
  ReasonCard,
  ReasonHeader,
  ReasonSubTitle,
  ReasonItem,
  ReasonCheck,
  ReasonText,
  AltCard,
  AltSubTitle,
  AltCol,
  AltRow,
  AltName,
  AltScore,
  AltPrice,
  AltWhy,
  ProcessingCard,
  ProcessingIconCol,
  ProcessingIconBox,
  ProcessingSubTitle,
  ProcessingInfo,
  Card
} from './styledComponents.jsx';


    function DecisionDetail() {
      const { id } = useParams();
      const { user } = useAuth();
      const navigate = useNavigate();
      const [decision, setDecision] = useState(null);
      const [loading, setLoading] = useState(true);
      const [refreshing, setRefreshing] = useState(false);

      useEffect(() => {
        loadDecision();
        const interval = setInterval(() => {
          if (decision?.status === 'collecting' || decision?.status === 'processing') {
            loadDecision(true);
          }
        }, 5000);
        return () => clearInterval(interval);
      }, [id]);

      const loadDecision = async (silent = false) => {
        if (!silent) setLoading(true);
        else setRefreshing(true);
        try {
          const response = await decisionService.getDecisionById(id);
          setDecision(response.data.decision);
        } catch (error) {
          toast.error('Failed to load decision');
          navigate('/dashboard');
        } finally {
          setLoading(false);
          setRefreshing(false);
        }
      };

      const hasUserSubmitted = decision?.constraints?.some(
        (c) => c.userId._id === user.id || c.userId === user.id
      );

      if (loading) {
        return <Loading text="Loading decision..." />;
      }
      if (!decision) {
        return null;
      }
      const { status, finalDecision, constraints, groupId } = decision;
      const totalMembers = groupId?.memberCount || constraints?.length || 0;
      const submittedCount = constraints?.length || 0;

      return (
        <DecisionDetailContainer>
          <DecisionContentWrapper>
            {/* Back Button */}
            <BackButton onClick={() => navigate(`/groups/${groupId._id || groupId}`)}>
              <ArrowLeft size={18} /> Back to Group
            </BackButton>

          {/* Header */}
          <Header>
            <HeaderRow>
              <Title>{decision.title}</Title>
              <StatusBadge status={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</StatusBadge>
            </HeaderRow>
            <InfoText>Category: {decision.category}</InfoText>
            <StatsRow>
              <StatItem>
                <Users size={16} />
                <span>{submittedCount} / {totalMembers} submitted</span>
              </StatItem>
              <StatItem>
                <Clock size={16} />
                <span>Created {new Date(decision.createdAt).toLocaleDateString()}</span>
              </StatItem>
            </StatsRow>
          </Header>

          {/* Submission Status Bar */}
          {status === 'collecting' && (
            <Section>
              <CollectingRow>
                <Label>Waiting for submissions</Label>
                <Value>{submittedCount} / {totalMembers}</Value>
              </CollectingRow>
              <ProgressBar>
                <ProgressFill style={{ width: `${(submittedCount / totalMembers) * 100}%` }} />
              </ProgressBar>
              {!hasUserSubmitted && (
                <SubmitCol>
                  <Link to={`/decisions/${id}/submit`} style={{ width: '100%' }}>
                    <Button variant="primary" fullWidth>Submit Your Constraints</Button>
                  </Link>
                </SubmitCol>
              )}
            </Section>
          )}

          {/* Decision Result */}
          {status === 'completed' && finalDecision && (
            <>
              {/* Winner */}
              <WinnerCard>
                <WinnerRow>
                  <WinnerIconCol>
                    <Award size={32} color="#fff" />
                  </WinnerIconCol>
                  <WinnerContentCol>
                    <SubTitle>🎉 Decision Made!</SubTitle>
                    <WinnerTitle>{finalDecision.selectedOption.name}</WinnerTitle>
                    {finalDecision.selectedOption.price > 0 && (
                      <OptionPrice>Price: ${finalDecision.selectedOption.price}</OptionPrice>
                    )}
                    <WinnerStatsRow>
                      <WinnerStat>
                        <TrendingUp size={16} />
                        <Satisfaction>{(finalDecision.satisfactionRate * 100).toFixed(0)}% satisfaction</Satisfaction>
                      </WinnerStat>
                      <WinnerStat>
                        <CheckCircle size={16} />
                        <Satisfaction>Score: {finalDecision.algorithmScore.toFixed(2)}</Satisfaction>
                      </WinnerStat>
                    </WinnerStatsRow>
                  </WinnerContentCol>
                </WinnerRow>
              </WinnerCard>

              {/* Reasoning */}
              <ReasonCard>
                <ReasonHeader>
                  <Info size={20} color="#00796b" />
                  <ReasonSubTitle>Why This Decision?</ReasonSubTitle>
                </ReasonHeader>
                <ReasonList>
                  {finalDecision.reasoning.map((reason, index) => (
                    <ReasonItem key={index}>
                      <ReasonCheck>✓</ReasonCheck>
                      <ReasonText>{reason}</ReasonText>
                    </ReasonItem>
                  ))}
                </ReasonList>
              </ReasonCard>

              {/* Alternatives */}
              {finalDecision.alternatives && finalDecision.alternatives.length > 0 && (
                <AltCard>
                  <AltSubTitle>Alternative Options</AltSubTitle>
                  <AltCol>
                    {finalDecision.alternatives.map((alt, index) => (
                      <AltOptionBox key={index}>
                        <AltRow>
                          <AltName>{alt.option.name}</AltName>
                          <AltScore>Score: {alt.score.toFixed(2)}</AltScore>
                        </AltRow>
                        {alt.option.price > 0 && (
                          <AltPrice>Price: ${alt.option.price}</AltPrice>
                        )}
                        <AltWhy>{alt.why}</AltWhy>
                      </AltOptionBox>
                    ))}
                  </AltCol>
                </AltCard>
              )}
            </>
          )}

          {/* Processing State */}
          {status === 'processing' && (
            <ProcessingCard>
              <ProcessingIconCol>
                <ProcessingIconBox>
                  <Clock size={32} color="#f59e42" />
                </ProcessingIconBox>
              </ProcessingIconCol>
              <ProcessingSubTitle>Processing Decision...</ProcessingSubTitle>
              <ProcessingInfo>Our algorithm is finding the best option for your group</ProcessingInfo>
            </ProcessingCard>
          )}

          {/* Collecting State */}
          {status === 'collecting' && (
            <Card>
              <SubTitle style={{ color: '#1a202c', fontSize: '1.125rem', marginBottom: '1rem' }}>Submission Status</SubTitle>
              <FlexCol>
                {constraints?.map((constraint) => (
                  <SubmissionRow key={constraint.userId._id || constraint.userId}>
                    <SubmissionUser>
                      <Avatar src={constraint.userId.avatar} alt={constraint.userId.name} />
                      <SubmissionName>{constraint.userId.name}</SubmissionName>
                    </SubmissionUser>
                    <SubmissionStatus>
                      <CheckCircle size={16} /> Submitted
                    </SubmissionStatus>
                  </SubmissionRow>
                ))}
              </FlexCol>
            </Card>
          )}

          {/* PDF Export - Show when decision is completed */}
          {status === 'completed' && finalDecision && (
            <PDFExport 
              decision={{
                title: decision.title,
                category: decision.category,
                result: finalDecision.selectedOption.name,
                score: finalDecision.algorithmScore,
                reasoning: finalDecision.reasoning.join(', '),
                alternatives: finalDecision.alternatives || [],
                constraints: constraints || [],
                completedAt: decision.completedAt || new Date().toISOString(),
                id: decision._id
              }}
              groupInfo={{
                name: groupId?.name || 'Group',
                memberCount: totalMembers,
                totalDecisions: groupId?.totalDecisions || 0,
                avgSatisfaction: 8.5
              }}
              showPreview={false}
            />
          )}
          </DecisionContentWrapper>
        </DecisionDetailContainer>
      );
    }

    export default DecisionDetail;