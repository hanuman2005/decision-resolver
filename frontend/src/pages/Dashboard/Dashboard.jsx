import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, Plus, Clock, CheckCircle, 
  BarChart3, MessageCircle, Sparkles,
  ArrowRight, Target, Award, Zap, AlertTriangle, Lightbulb
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import groupService from '../../services/groupService';
import api from '../../services/api';
import Loading from '../../components/common/Loading';
import toast from 'react-hot-toast';
import {
  DashboardContainer,
  DashboardContent,
  Header,
  Title,
  Subtitle,
  StatsGrid,
  StatCard,
  StatIcon,
  StatValue,
  StatLabel,
  QuickActionsSection,
  SectionTitle,
  ActionsGrid,
  ActionButton,
  MainContentGrid,
  Section,
  ActivityItem,
  ActivityIcon,
  ActivityContent,
  ActivityText,
  ActivityMeta,
  ViewMoreButton,
  DecisionCard,
  DecisionTitle,
  DecisionGroup,
  DecisionMeta,
  DecisionDeadline,
  DecisionPending,
  SectionHeader,
  ViewAllLink,
  EmptyState,
  EmptyIcon,
  EmptyTitle,
  EmptyText,
  CreateButton,
  GroupsGrid,
  GroupCard,
  GroupHeader,
  GroupIcon,
  GroupCode,
  GroupName,
  GroupDesc,
  GroupFooter,
  GroupMembers,
  GroupViewLink,
  FeatureHighlightsGrid,
  FeatureCard,
  FeatureIcon,
  FeatureTitle,
  FeatureDesc,
  FeatureLink
} from './styledComponents';

const Dashboard = () => {
  const { user } = useAuth();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalGroups: 0,
    activeDecisions: 0,
    completedDecisions: 0,
    avgSatisfaction: 0,
    successRate: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [upcomingDecisions, setUpcomingDecisions] = useState([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Fetch groups
      const groupResponse = await groupService.getMyGroups();
      const userGroups = groupResponse.data.groups || [];
      setGroups(userGroups);
      
      // Fetch dashboard stats from backend
      try {
        const statsResponse = await api.get('/dashboard/stats');
        if (statsResponse.data) {
          setStats({
            totalGroups: statsResponse.data.totalGroups || userGroups.length,
            activeDecisions: statsResponse.data.activeDecisions || 0,
            completedDecisions: statsResponse.data.completedDecisions || 0,
            avgSatisfaction: statsResponse.data.avgSatisfaction || 0,
            successRate: statsResponse.data.successRate || 0
          });
        } else {
          setStats({
            totalGroups: userGroups.length,
            activeDecisions: 0,
            completedDecisions: 0,
            avgSatisfaction: 0,
            successRate: 0
          });
        }
      } catch (error) {
        // Fallback to basic stats from groups
        setStats({
          totalGroups: userGroups.length,
          activeDecisions: 0,
          completedDecisions: 0,
          avgSatisfaction: 0,
          successRate: 0
        });
      }
      
      // Fetch recent activity from backend
      try {
        const activityResponse = await api.get('/dashboard/activity');
        if (activityResponse.data?.activity && Array.isArray(activityResponse.data.activity)) {
          setRecentActivity(activityResponse.data.activity);
        } else {
          setRecentActivity([]);
        }
      } catch (error) {
        setRecentActivity([]);
      }

      // Fetch upcoming decisions from backend
      try {
        const decisionsResponse = await api.get('/dashboard/decisions');
        if (decisionsResponse.data?.decisions && Array.isArray(decisionsResponse.data.decisions)) {
          setUpcomingDecisions(decisionsResponse.data.decisions);
        } else {
          setUpcomingDecisions([]);
        }
      } catch (error) {
        setUpcomingDecisions([]);
      }
    } catch (error) {
      toast.error('Failed to load dashboard data');
      // Set empty states gracefully
      setStats({
        totalGroups: 0,
        activeDecisions: 0,
        completedDecisions: 0,
        avgSatisfaction: 0,
        successRate: 0
      });
      setRecentActivity([]);
      setUpcomingDecisions([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading text="Loading dashboard..." />;
  }

  return (
    <DashboardContainer>
      <DashboardContent>
        {/* Header */}
        <Header>
          <Title>
            Welcome back, {user?.name}! 👋
          </Title>
          <Subtitle>
            Here's what's happening with your groups
          </Subtitle>
        </Header>

        {/* Stats Grid */}
        <StatsGrid>
          <StatCard $borderColor="#4f46e5">
            <StatIcon $bgColor="rgba(79, 70, 229, 0.2)" $iconColor="#4f46e5">
              <Users />
            </StatIcon>
            <StatValue>{stats.totalGroups}</StatValue>
            <StatLabel>Total Groups</StatLabel>
          </StatCard>

          <StatCard $borderColor="#f59e0b">
            <StatIcon $bgColor="rgba(245, 158, 11, 0.2)" $iconColor="#f59e0b">
              <Clock />
            </StatIcon>
            <StatValue>{stats.activeDecisions}</StatValue>
            <StatLabel>Active Now</StatLabel>
          </StatCard>

          <StatCard $borderColor="#10b981">
            <StatIcon $bgColor="rgba(16, 185, 129, 0.2)" $iconColor="#10b981">
              <CheckCircle />
            </StatIcon>
            <StatValue>{stats.completedDecisions}</StatValue>
            <StatLabel>Completed</StatLabel>
          </StatCard>

          <StatCard $borderColor="#a855f7">
            <StatIcon $bgColor="rgba(168, 85, 247, 0.2)" $iconColor="#a855f7">
              <Award />
            </StatIcon>
            <StatValue>{stats.avgSatisfaction}/10</StatValue>
            <StatLabel>Avg Satisfaction</StatLabel>
          </StatCard>

          <StatCard $borderColor="#06b6d4">
            <StatIcon $bgColor="rgba(6, 182, 212, 0.2)" $iconColor="#06b6d4">
              <Target />
            </StatIcon>
            <StatValue>{stats.successRate}%</StatValue>
            <StatLabel>Success Rate</StatLabel>
          </StatCard>
        </StatsGrid>

        {/* Quick Actions */}
        <QuickActionsSection>
          <SectionTitle>
            <Zap />
            Quick Actions
          </SectionTitle>
          <ActionsGrid>
            <ActionButton to="/groups/create">
              <Plus />
              Create Group
            </ActionButton>
            <ActionButton to="/groups/join">
              <Users />
              Join Group
            </ActionButton>
            <ActionButton to="/analytics">
              <BarChart3 />
              View Analytics
            </ActionButton>
            <ActionButton to="/templates">
              <Sparkles />
              Use Template
            </ActionButton>
          </ActionsGrid>
        </QuickActionsSection>

        {/* Main Content Grid */}
        <MainContentGrid>
          {/* Recent Activity */}
          <Section>
            <SectionHeader>
              <SectionTitle>Recent Activity</SectionTitle>
            </SectionHeader>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {recentActivity.map((activity) => {
                const Icon = activity.icon;
                return (
                  <ActivityItem key={activity.id}>
                    <ActivityIcon>
                      <Icon />
                    </ActivityIcon>
                    <ActivityContent>
                      <ActivityText>{activity.action}</ActivityText>
                      <ActivityMeta>
                        {activity.group} • {activity.time}
                      </ActivityMeta>
                    </ActivityContent>
                  </ActivityItem>
                );
              })}
            </div>
            <ViewMoreButton>View All Activity →</ViewMoreButton>
          </Section>

          {/* Upcoming Decisions */}
          <Section>
            <SectionHeader>
              <SectionTitle>Upcoming</SectionTitle>
            </SectionHeader>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {upcomingDecisions.map((decision) => (
                <DecisionCard key={decision.id}>
                  <DecisionTitle>{decision.title}</DecisionTitle>
                  <DecisionGroup>{decision.group}</DecisionGroup>
                  <DecisionMeta>
                    <DecisionDeadline>Due in {decision.deadline}</DecisionDeadline>
                    <DecisionPending>{decision.pending} pending</DecisionPending>
                  </DecisionMeta>
                </DecisionCard>
              ))}
            </div>
            <Link to="/decisions" style={{ textDecoration: 'none' }}>
              <button style={{
                width: '100%',
                marginTop: '1rem',
                padding: 'clamp(0.75rem, 1.5vw, 1rem)',
                background: 'rgba(79, 70, 229, 0.2)',
                color: '#4f46e5',
                fontWeight: '600',
                border: '1px solid rgba(79, 70, 229, 0.5)',
                borderRadius: '0.75rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: 'clamp(0.9rem, 1.5vw, 1rem)'
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(79, 70, 229, 0.3)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(79, 70, 229, 0.2)';
                }}
              >
                View All Decisions
              </button>
            </Link>
          </Section>
        </MainContentGrid>

        {/* My Groups */}
        <Section>
          <SectionHeader>
            <SectionTitle>My Groups</SectionTitle>
            <ViewAllLink to="/groups">
              View All
              <ArrowRight />
            </ViewAllLink>
          </SectionHeader>

          {groups.length === 0 ? (
            <EmptyState>
              <EmptyIcon>
                <Users />
              </EmptyIcon>
              <EmptyTitle>No groups yet</EmptyTitle>
              <EmptyText>
                Create your first group to start making decisions together
              </EmptyText>
              <CreateButton to="/groups/create">
                <Plus />
                Create Your First Group
              </CreateButton>
            </EmptyState>
          ) : (
            <GroupsGrid>
              {groups.slice(0, 6).map((group) => (
                <GroupCard key={group._id} to={`/groups/${group._id}`}>
                  <GroupHeader>
                    <GroupIcon>
                      <Users />
                    </GroupIcon>
                    <GroupCode>{group.inviteCode}</GroupCode>
                  </GroupHeader>
                  <GroupName>{group.name}</GroupName>
                  <GroupDesc>{group.description || 'No description'}</GroupDesc>
                  <GroupFooter>
                    <GroupMembers>
                      <Users style={{ width: '1rem', height: '1rem' }} />
                      {group.memberCount || 0} members
                    </GroupMembers>
                    <GroupViewLink>View →</GroupViewLink>
                  </GroupFooter>
                </GroupCard>
              ))}
            </GroupsGrid>
          )}
        </Section>

        {/* Feature Highlights */}
        <FeatureHighlightsGrid>
          <FeatureCard to="/analytics" $gradient="linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)">
            <FeatureIcon>
              <BarChart3 />
            </FeatureIcon>
            <FeatureTitle>Analytics</FeatureTitle>
            <FeatureDesc>
              Track your group's decision patterns and satisfaction scores
            </FeatureDesc>
            <FeatureLink>
              View Dashboard
              <ArrowRight />
            </FeatureLink>
          </FeatureCard>

          <FeatureCard to="/templates" $gradient="linear-gradient(135deg, #a855f7 0%, #9333ea 100%)">
            <FeatureIcon>
              <Sparkles />
            </FeatureIcon>
            <FeatureTitle>Templates</FeatureTitle>
            <FeatureDesc>
              Use pre-built templates for quick decision making
            </FeatureDesc>
            <FeatureLink>
              Browse Templates
              <ArrowRight />
            </FeatureLink>
          </FeatureCard>

          <FeatureCard to="/ai-suggestions" $gradient="linear-gradient(135deg, #f59e0b 0%, #f97316 100%)">
            <FeatureIcon>
              <Lightbulb />
            </FeatureIcon>
            <FeatureTitle>AI Suggestions</FeatureTitle>
            <FeatureDesc>
              Get smart recommendations based on your group's history
            </FeatureDesc>
            <FeatureLink>
              Get Suggestions
              <ArrowRight />
            </FeatureLink>
          </FeatureCard>

          <FeatureCard to="/conflict-resolution" $gradient="linear-gradient(135deg, #ef4444 0%, #dc2626 100%)">
            <FeatureIcon>
              <AlertTriangle />
            </FeatureIcon>
            <FeatureTitle>Conflict Resolution</FeatureTitle>
            <FeatureDesc>
              Find smart compromises when constraints don't align
            </FeatureDesc>
            <FeatureLink>
              Resolve Conflicts
              <ArrowRight />
            </FeatureLink>
          </FeatureCard>

          <FeatureCard as="div" $gradient="linear-gradient(135deg, #10b981 0%, #059669 100%)" style={{ cursor: 'pointer' }}>
            <FeatureIcon>
              <MessageCircle />
            </FeatureIcon>
            <FeatureTitle>Group Chat</FeatureTitle>
            <FeatureDesc>
              Real-time messaging with your decision groups
            </FeatureDesc>
            <FeatureLink>
              Open Chat
              <ArrowRight />
            </FeatureLink>
          </FeatureCard>
        </FeatureHighlightsGrid>
      </DashboardContent>
    </DashboardContainer>
  );
};

export default Dashboard;