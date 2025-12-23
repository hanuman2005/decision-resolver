import styled from "styled-components";

export const DashboardContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #011425 0%, #1f4959 50%, #5c7c89 100%);
  padding: 2rem 1rem;

  @media (min-width: 768px) {
    padding: 2rem 1.5rem;
  }

  @media (min-width: 1024px) {
    padding: 2rem 2rem;
  }
`;

export const Header = styled.div`
  margin-bottom: 2rem;
`;

export const Title = styled.h1`
  font-size: clamp(2rem, 5vw, 2.25rem);
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.5rem;
`;

export const Subtitle = styled.p`
  color: #5c7c89;
  font-size: 1.125rem;
  font-weight: 500;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }

  @media (min-width: 641px) and (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1025px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const StatCard = styled.div`
  background: rgba(31, 73, 89, 0.4);
  backdrop-filter: blur(20px);
  border-radius: 0.75rem;
  box-shadow: 0 8px 32px rgba(1, 20, 37, 0.3);
  padding: 1.5rem;
  border: 2px solid rgba(92, 124, 137, 0.5);
  border-left: 4px solid;
  border-left-color: ${(props) => {
    const colors = {
      blue: "#3b82f6",
      green: "#10b981",
      purple: "#8b5cf6",
      orange: "#f59e0b",
    };
    return colors[props.$color] || "#3b82f6";
  }};
  transition: all 0.3s ease;

  &:hover {
    background: rgba(31, 73, 89, 0.6);
    box-shadow: 0 12px 40px rgba(31, 73, 89, 0.4);
    transform: translateY(-0.25rem);
  }
`;

export const StatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const StatIcon = styled.div`
  background: rgba(92, 124, 137, 0.2);
  padding: 0.75rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    color: #5c7c89;
  }
`;

export const StatValue = styled.div`
  font-size: 1.875rem;
  font-weight: 700;
  color: #ffffff;
`;

export const StatLabel = styled.div`
  color: #5c7c89;
  font-size: 0.875rem;
  font-weight: 500;
  margin-top: 0.25rem;
`;

export const StatChange = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  margin-top: 0.5rem;
  color: ${(props) => (props.$positive ? "#059669" : "#dc2626")};
`;

export const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const ChartCard = styled.div`
  background: rgba(31, 73, 89, 0.4);
  backdrop-filter: blur(20px);
  border-radius: 0.75rem;
  box-shadow: 0 8px 32px rgba(1, 20, 37, 0.3);
  padding: 1.5rem;
  border: 2px solid rgba(92, 124, 137, 0.5);
  transition: all 0.2s ease;

  &:hover {
    background: rgba(31, 73, 89, 0.6);
    box-shadow: 0 12px 40px rgba(31, 73, 89, 0.4);
  }
`;

export const ChartTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 1rem;
`;

export const FullWidthChart = styled.div`
  background: rgba(31, 73, 89, 0.4);
  backdrop-filter: blur(20px);
  border-radius: 0.75rem;
  box-shadow: 0 8px 32px rgba(1, 20, 37, 0.3);
  padding: 1.5rem;
  border: 2px solid rgba(92, 124, 137, 0.5);
  transition: all 0.2s ease;

  &:hover {
    background: rgba(31, 73, 89, 0.6);
    box-shadow: 0 12px 40px rgba(31, 73, 89, 0.4);
  }
`;

export const TimeRangeContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;

  @media (max-width: 640px) {
    gap: 0.5rem;
  }
`;

export const TimeRangeButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.2s ease;
  border: 2px solid #5c7c89;
  cursor: pointer;
  background: ${(props) =>
    props.$active ? "rgba(92, 124, 137, 0.5)" : "transparent"};
  color: ${(props) => (props.$active ? "#ffffff" : "#5c7c89")};

  &:hover {
    background: ${(props) =>
      props.$active ? "rgba(92, 124, 137, 0.7)" : "rgba(92, 124, 137, 0.3)"};
    color: #ffffff;
    border-color: #ffffff;
  }
`;
