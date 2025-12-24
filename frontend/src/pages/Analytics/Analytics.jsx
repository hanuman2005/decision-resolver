import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, Users, CheckCircle, Award, Calendar, Target } from 'lucide-react';
import { DashboardContainer, Header, Title, Subtitle, StatsGrid, StatCard, StatHeader, StatIcon, StatValue, StatLabel, StatChange, ChartsGrid, ChartCard, ChartTitle, TimeRangeContainer, TimeRangeButton } from './styledComponents';
import api from '../../services/api';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

// Mock data fallback
const MOCK_DATA = {
  stats: {
    totalDecisions: 247,
    activeGroups: 18,
    avgSatisfaction: 8.6,
    successRate: 94.2
  },
  decisionTrend: [
    { date: 'Mon', decisions: 28, successful: 26 },
    { date: 'Tue', decisions: 35, successful: 33 },
    { date: 'Wed', decisions: 42, successful: 40 },
    { date: 'Thu', decisions: 38, successful: 36 },
    { date: 'Fri', decisions: 45, successful: 43 },
    { date: 'Sat', decisions: 52, successful: 49 },
    { date: 'Sun', decisions: 48, successful: 45 }
  ],
  categoryDistribution: [
    { name: 'Restaurants', value: 35 },
    { name: 'Movies', value: 25 },
    { name: 'Activities', value: 20 },
    { name: 'Meetings', value: 12 },
    { name: 'Events', value: 8 }
  ],
  satisfactionTrend: [
    { week: 'Week 1', satisfaction: 7.8, fairness: 8.2 },
    { week: 'Week 2', satisfaction: 8.1, fairness: 8.4 },
    { week: 'Week 3', satisfaction: 8.3, fairness: 8.5 },
    { week: 'Week 4', satisfaction: 8.6, fairness: 8.7 }
  ],
  topCategories: [
    { category: 'Italian Food', count: 42, avgScore: 8.9 },
    { category: 'Action Movies', count: 38, avgScore: 8.5 },
    { category: 'Outdoor Activities', count: 35, avgScore: 8.7 },
    { category: 'Team Lunch', count: 28, avgScore: 8.3 },
    { category: 'Weekend Plans', count: 24, avgScore: 8.6 }
  ]
};

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState('7days');
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    totalDecisions: 0,
    activeGroups: 0,
    avgSatisfaction: 0,
    successRate: 0
  });

  const [decisionTrend, setDecisionTrend] = useState([]);
  const [categoryDistribution, setCategoryDistribution] = useState([]);
  const [satisfactionTrend, setSatisfactionTrend] = useState([]);
  const [topCategories, setTopCategories] = useState([]);
  const [isUsingFallback, setIsUsingFallback] = useState(false);

  useEffect(() => {
    fetchAnalyticsData();
  }, [timeRange]);

  const fetchAnalyticsData = async () => {
    setLoading(true);
    try {
      // Try to fetch real data from backend
      const response = await api.get('/analytics', {
        params: { timeRange }
      });

      if (response.data && Object.keys(response.data).length > 0) {
        // Real data available
        setStats(response.data.stats || MOCK_DATA.stats);
        setDecisionTrend(response.data.decisionTrend || MOCK_DATA.decisionTrend);
        setCategoryDistribution(response.data.categoryDistribution || MOCK_DATA.categoryDistribution);
        setSatisfactionTrend(response.data.satisfactionTrend || MOCK_DATA.satisfactionTrend);
        setTopCategories(response.data.topCategories || MOCK_DATA.topCategories);
        setIsUsingFallback(false);
      } else {
        // No data returned, use fallback
        useFallbackData();
      }
    } catch (error) {
      // API error or endpoint doesn't exist, use fallback
      useFallbackData();
    } finally {
      setLoading(false);
    }
  };

  const useFallbackData = () => {
    setStats(MOCK_DATA.stats);
    setDecisionTrend(MOCK_DATA.decisionTrend);
    setCategoryDistribution(MOCK_DATA.categoryDistribution);
    setSatisfactionTrend(MOCK_DATA.satisfactionTrend);
    setTopCategories(MOCK_DATA.topCategories);
    setIsUsingFallback(true);
  };

  if (loading) {
    return (
      <DashboardContainer>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
          <div style={{ animation: 'spin 1s linear infinite', borderRadius: '9999px', height: '64px', width: '64px', borderTop: '4px solid #3b82f6', borderRight: 'transparent', borderBottom: '4px solid #3b82f6', borderLeft: 'transparent' }}></div>
        </div>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <Header>
        <Title>📊 Analytics Dashboard</Title>
        <Subtitle>Track your group's decision-making patterns and performance</Subtitle>
        {isUsingFallback && (
          <div style={{
            marginTop: '0.75rem',
            padding: '0.75rem 1rem',
            backgroundColor: '#fef3c7',
            color: '#92400e',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: '500'
          }}>
            ℹ️ Showing sample data - Analytics backend not available
          </div>
        )}
      </Header>

      {/* Stats Cards */}
      <StatsGrid as={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
        {[
          { color: 'blue', icon: CheckCircle, value: stats.totalDecisions, label: 'Total Decisions', change: '+12.5% from last week' },
          { color: 'green', icon: Users, value: stats.activeGroups, label: 'Active Groups', change: '+3 this month' },
          { color: 'orange', icon: Award, value: `${stats.avgSatisfaction}/10`, label: 'Avg Satisfaction', change: '+0.4 from last week' },
          { color: 'red', icon: Target, value: `${stats.successRate}%`, label: 'Success Rate', change: '+2.1% from last week' }
        ].map((stat, index) => (
          <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
            <StatCard $color={stat.color}>
              <StatHeader>
                <StatIcon $bgColor={stat.color}>
                  <stat.icon style={{ width: '24px', height: '24px', color: stat.color === 'blue' ? '#2563eb' : stat.color === 'green' ? '#059669' : stat.color === 'orange' ? '#d97706' : '#dc2626' }} />
                </StatIcon>
              </StatHeader>
              <StatValue>{stat.value}</StatValue>
              <StatLabel>{stat.label}</StatLabel>
              <StatChange $positive={true}>
                <TrendingUp style={{ width: '16px', height: '16px' }} />
                {stat.change}
              </StatChange>
            </StatCard>
          </motion.div>
        ))}
      </StatsGrid>

      {/* Charts Row 1 */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
        <ChartsGrid>
        {/* Decision Trend */}
        <ChartCard>
          <ChartTitle>📈 Decision Activity Trend</ChartTitle>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={decisionTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }} 
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="decisions" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', r: 5 }}
                name="Total Decisions"
              />
              <Line 
                type="monotone" 
                dataKey="successful" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', r: 5 }}
                name="Successful"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Category Distribution */}
        <ChartCard>
          <ChartTitle>🎯 Decision Categories</ChartTitle>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </ChartsGrid>

      {/* Charts Row 2 */}
      <ChartsGrid>
        {/* Satisfaction Trend */}
        <ChartCard>
          <ChartTitle>😊 Satisfaction & Fairness Trends</ChartTitle>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={satisfactionTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="week" stroke="#64748b" />
              <YAxis domain={[0, 10]} stroke="#64748b" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }} 
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="satisfaction" 
                stackId="1"
                stroke="#8b5cf6" 
                fill="#8b5cf6"
                fillOpacity={0.6}
                name="Satisfaction Score"
              />
              <Area 
                type="monotone" 
                dataKey="fairness" 
                stackId="2"
                stroke="#ec4899" 
                fill="#ec4899"
                fillOpacity={0.6}
                name="Fairness Score"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Top Categories Bar Chart */}
        <ChartCard>
          <ChartTitle>🏆 Top Decision Categories</ChartTitle>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topCategories} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis type="number" stroke="#64748b" />
              <YAxis dataKey="category" type="category" width={120} stroke="#64748b" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }} 
              />
              <Legend />
              <Bar dataKey="count" fill="#3b82f6" name="Decision Count" radius={[0, 8, 8, 0]} />
              <Bar dataKey="avgScore" fill="#10b981" name="Avg Score" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </ChartsGrid>
      </motion.div>

      {/* Time Range Selector */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }}>
        <TimeRangeContainer>
        {['7days', '30days', '90days', 'all'].map((range) => (
          <TimeRangeButton
            key={range}
            $active={timeRange === range}
            onClick={() => setTimeRange(range)}
          >
            {range === '7days' && 'Last 7 Days'}
            {range === '30days' && 'Last 30 Days'}
            {range === '90days' && 'Last 90 Days'}
            {range === 'all' && 'All Time'}
          </TimeRangeButton>
        ))}
        </TimeRangeContainer>
      </motion.div>
    </DashboardContainer>
  );
};

export default AnalyticsDashboard;
