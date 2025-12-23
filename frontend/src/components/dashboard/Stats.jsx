import styled from 'styled-components';
import { Users, Clock, CheckCircle, TrendingUp } from 'lucide-react';
import Card from '../common/Card';

/**
 * Dashboard Stats Component
 * Displays key statistics cards
 */

const DashboardStats = ({ stats }) => {

  // Styled-components (defined here for small file)
  const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  `;
  const StatCard = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `;
  const StatInfo = styled.div`
    flex: 1;
  `;
  const StatLabel = styled.p`
    font-size: 0.875rem;
    color: #6b7280;
    margin-bottom: 0.25rem;
  `;
  const StatValue = styled.p`
    font-size: 2rem;
    font-weight: 700;
    color: #111827;
  `;
  const IconBox = styled.div`
    width: 3rem;
    height: 3rem;
    border-radius: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background: ${({ $bg }) => $bg};
  `;

  const StyledIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      width: 1.5rem;
      height: 1.5rem;
      color: ${({ $color }) => $color};
    }
  `;

  const statItems = [
    {
      label: 'Total Groups',
      value: stats?.totalGroups || 0,
      icon: Users,
      color: '#0ea5e9',
      bgColor: '#dbeafe',
    },
    {
      label: 'Active Decisions',
      value: stats?.activeDecisions || 0,
      icon: Clock,
      color: '#f59e0b',
      bgColor: '#fef3c7',
    },
    {
      label: 'Completed',
      value: stats?.completedDecisions || 0,
      icon: CheckCircle,
      color: '#10b981',
      bgColor: '#d1fae5',
    },
    {
      label: 'Satisfaction Rate',
      value: stats?.satisfactionRate || '-',
      icon: TrendingUp,
      color: '#8b5cf6',
      bgColor: '#ede9fe',
    },
  ];

  return (
    <Grid>
      {statItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <Card key={index}>
            <StatCard>
              <StatInfo>
                <StatLabel>{item.label}</StatLabel>
                <StatValue>{item.value}</StatValue>
              </StatInfo>
              <IconBox $bg={item.bgColor}>
                <StyledIcon $color={item.color}>
                  <Icon />
                </StyledIcon>
              </IconBox>
            </StatCard>
          </Card>
        );
      })}
    </Grid>
  );
};

export default DashboardStats;