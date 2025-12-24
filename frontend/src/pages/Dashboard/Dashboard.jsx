import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  const [showAllActivity, setShowAllActivity] = useState(false);
  const [allActivity, setAllActivity] = useState([]);

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
        const statsData = statsResponse.data?.data || statsResponse.data || {};
        
        if (statsData && statsData.totalGroups !== undefined) {
          setStats({
            totalGroups: statsData.totalGroups,
            activeDecisions: statsData.activeDecisions || 0,
            completedDecisions: statsData.completedDecisions || 0,
            avgSatisfaction: statsData.avgSatisfaction || 0,
            successRate: statsData.successRate || 0
          });
        } else {
          // Fallback to basic stats
          setStats({
            totalGroups: userGroups.length,
            activeDecisions: 0,
            completedDecisions: 0,
            avgSatisfaction: 0,
            successRate: 0
          });
        }
      } catch (error) {
        console.error('Stats fetch error:', error);
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
        const activityData = activityResponse.data?.data?.activity || activityResponse.data?.activity || [];
        
        if (Array.isArray(activityData) && activityData.length > 0) {
          // Map icon names to actual icons
          const iconMap = {
            MessageCircle: MessageCircle,
            CheckCircle: CheckCircle,
            Users: Users,
            Clock: Clock
          };
          
          const formattedActivity = activityData.map(item => ({
            ...item,
            icon: iconMap[item.icon] || MessageCircle
          }));
          setRecentActivity(formattedActivity.slice(0, 5)); // Show only 5 in dashboard
          setAllActivity(formattedActivity); // Store all for "View All"
        } else {
          setRecentActivity([]);
        }
      } catch (error) {
        console.error('Activity fetch error:', error);
        setRecentActivity([]);
      }

      // Fetch upcoming decisions from backend
      try {
        const decisionsResponse = await api.get('/dashboard/decisions');
        const decisionsData = decisionsResponse.data?.data?.decisions || decisionsResponse.data?.decisions || [];
        
        if (Array.isArray(decisionsData) && decisionsData.length > 0) {
          setUpcomingDecisions(decisionsData);
        } else {
          setUpcomingDecisions([]);
        }
      } catch (error) {
        console.error('Decisions fetch error:', error);
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
        <StatsGrid as={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          {[
            { borderColor: "#4f46e5", bgColor: "rgba(79, 70, 229, 0.2)", iconColor: "#4f46e5", Icon: Users, value: stats.totalGroups, label: "Total Groups" },
            { borderColor: "#f59e0b", bgColor: "rgba(245, 158, 11, 0.2)", iconColor: "#f59e0b", Icon: Clock, value: stats.activeDecisions, label: "Active Now" },
            { borderColor: "#10b981", bgColor: "rgba(16, 185, 129, 0.2)", iconColor: "#10b981", Icon: CheckCircle, value: stats.completedDecisions, label: "Completed" },
            { borderColor: "#a855f7", bgColor: "rgba(168, 85, 247, 0.2)", iconColor: "#a855f7", Icon: Award, value: stats.avgSatisfaction, label: "Avg Satisfaction", suffix: "/10" },
            { borderColor: "#06b6d4", bgColor: "rgba(6, 182, 212, 0.2)", iconColor: "#06b6d4", Icon: Target, value: stats.successRate, label: "Success Rate", suffix: "%" }
          ].map((stat, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
              <StatCard $borderColor={stat.borderColor}>
                <StatIcon $bgColor={stat.bgColor} $iconColor={stat.iconColor}>
                  <stat.Icon />
                </StatIcon>
                <StatValue>{stat.value}{stat.suffix || ''}</StatValue>
                <StatLabel>{stat.label}</StatLabel>
              </StatCard>
            </motion.div>
          ))}
        </StatsGrid>

        {/* Quick Actions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
          <QuickActionsSection>
            <SectionTitle>
              <Zap />
              Quick Actions
            </SectionTitle>
            <ActionsGrid as={motion.div} variants={{ container: { staggerChildren: 0.1 } }} initial="hidden" animate="visible">
              {[
                { to: "/groups/create", Icon: Plus, label: "Create Group" },
                { to: "/groups/join", Icon: Users, label: "Join Group" },
                { to: "/analytics", Icon: BarChart3, label: "View Analytics" },
                { to: "/decisions/templates", Icon: Sparkles, label: "Use Template" }
              ].map((action, index) => (
                <motion.div key={index} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
                  <ActionButton to={action.to}>
                    <action.Icon />
                    {action.label}
                  </ActionButton>
                </motion.div>
              ))}
            </ActionsGrid>
          </QuickActionsSection>
        </motion.div>

        {/* Main Content Grid */}
        <MainContentGrid>
          {/* Recent Activity */}
          <Section>
            <SectionHeader>
              <SectionTitle>Recent Activity</SectionTitle>
            </SectionHeader>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {(showAllActivity ? allActivity : recentActivity).length > 0 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                  {(showAllActivity ? allActivity : recentActivity).map((activity, index) => {
                    const Icon = activity.icon;
                    return (
                      <motion.div key={activity.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: index * 0.05 }}>
                        <ActivityItem>
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
                      </motion.div>
                    );
                  })}
                </motion.div>
              ) : (
                <ActivityText style={{ textAlign: 'center', color: '#94a3b8', padding: '2rem 0' }}>
                  No recent activity yet. Start making decisions!
                </ActivityText>
              )}
            </div>
            <ViewMoreButton onClick={() => setShowAllActivity(!showAllActivity)}>
              {showAllActivity ? 'Show Less Activity ↑' : 'View All Activity →'}
            </ViewMoreButton>
          </Section>

          {/* Upcoming Decisions */}
          <Section>
            <SectionHeader>
              <SectionTitle>Upcoming</SectionTitle>
            </SectionHeader>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {upcomingDecisions.length > 0 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                  {upcomingDecisions.map((decision, index) => (
                    <motion.div key={decision.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: index * 0.05 }}>
                      <DecisionCard>
                        <DecisionTitle>{decision.title}</DecisionTitle>
                        <DecisionGroup>{decision.group}</DecisionGroup>
                        <DecisionMeta>
                          <DecisionDeadline>Due in {decision.deadline}</DecisionDeadline>
                          <DecisionPending>{decision.pending} pending</DecisionPending>
                        </DecisionMeta>
                      </DecisionCard>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div style={{ textAlign: 'center', color: '#94a3b8', padding: '2rem 0' }}>
                  No upcoming decisions. Create one to get started!
                </div>
              )}
            </div>
            <Link to="/groups" style={{ textDecoration: 'none' }}>
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
            <GroupsGrid as={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              {groups.slice(0, 6).map((group, index) => (
                <motion.div key={group._id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: index * 0.1 }}>
                  <GroupCard to={`/groups/${group._id}`}>
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
                </motion.div>
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

          <FeatureCard to="/decisions/templates" $gradient="linear-gradient(135deg, #a855f7 0%, #9333ea 100%)">
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