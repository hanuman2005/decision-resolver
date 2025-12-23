import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const DashboardContainer = styled.div`
	min-height: 100vh;
	background: linear-gradient(135deg, #011425 0%, #1f4959 50%, #5c7c89 100%);
	padding: clamp(1rem, 3vw, 1.5rem);
`;

export const DashboardContent = styled.div`
	max-width: 1400px;
	margin: 0 auto;
`;

export const Header = styled.div`
	margin-bottom: clamp(2rem, 4vw, 3rem);
`;

export const Title = styled.h1`
	font-size: clamp(1.75rem, 5vw, 2.5rem);
	font-weight: 700;
	color: #ffffff;
	margin-bottom: 0.5rem;
`;

export const Subtitle = styled.p`
	font-size: clamp(0.95rem, 2vw, 1.1rem);
	color: #cbd5e1;
`;

export const StatsGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	gap: clamp(1rem, 2vw, 1.5rem);
	margin-bottom: clamp(2rem, 4vw, 3rem);
`;

export const StatCard = styled.div`
	background: rgba(31, 73, 89, 0.4);
	backdrop-filter: blur(20px);
	border-radius: 1rem;
	padding: clamp(1.5rem, 3vw, 2rem);
	border: 2px solid rgba(92, 124, 137, 0.5);
	border-left-width: 4px;
	border-left-color: ${props => props.$borderColor || '#4f46e5'};
	box-shadow: 0 8px 32px rgba(1, 20, 37, 0.2);
	transition: all 0.3s ease;

	&:hover {
		background: rgba(31, 73, 89, 0.6);
		box-shadow: 0 12px 40px rgba(31, 73, 89, 0.3);
		transform: translateY(-4px);
		border-color: rgba(92, 124, 137, 0.7);
	}
`;

export const StatIcon = styled.div`
	width: clamp(2.5rem, 4vw, 3rem);
	height: clamp(2.5rem, 4vw, 3rem);
	border-radius: 0.75rem;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 1rem;
	background: ${props => props.$bgColor || 'rgba(79, 70, 229, 0.2)'};

	& svg {
		width: 1.5rem;
		height: 1.5rem;
		color: ${props => props.$iconColor || '#4f46e5'};
	}
`;

export const StatValue = styled.div`
	font-size: clamp(1.75rem, 4vw, 2.25rem);
	font-weight: 700;
	color: #ffffff;
	margin-bottom: 0.5rem;
`;

export const StatLabel = styled.div`
	font-size: clamp(0.85rem, 1.5vw, 0.95rem);
	color: #cbd5e1;
	font-weight: 600;
`;

export const QuickActionsSection = styled.div`
	background: rgba(31, 73, 89, 0.4);
	backdrop-filter: blur(20px);
	border-radius: 1rem;
	border: 2px solid rgba(92, 124, 137, 0.5);
	padding: clamp(1.5rem, 3vw, 2rem);
	margin-bottom: clamp(2rem, 4vw, 3rem);
	box-shadow: 0 8px 32px rgba(1, 20, 37, 0.2);
`;

export const SectionTitle = styled.h2`
	font-size: clamp(1.25rem, 3vw, 1.5rem);
	font-weight: 700;
	color: #ffffff;
	margin-bottom: clamp(1rem, 2vw, 1.5rem);
	display: flex;
	align-items: center;
	gap: 0.75rem;

	& svg {
		width: clamp(1.25rem, 2vw, 1.5rem);
		height: clamp(1.25rem, 2vw, 1.5rem);
	}
`;

export const ActionsGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
	gap: clamp(0.75rem, 1.5vw, 1rem);
`;

export const ActionButton = styled(Link)`
	width: 100%;
	display: flex;
	align-items: center;
	gap: 0.75rem;
	padding: clamp(0.75rem, 1.5vw, 1rem);
	background: rgba(255, 255, 255, 0.2);
	backdrop-filter: blur(10px);
	color: #ffffff;
	font-weight: 600;
	font-size: clamp(0.85rem, 1.5vw, 0.95rem);
	border-radius: 0.75rem;
	text-decoration: none;
	border: 1px solid rgba(255, 255, 255, 0.3);
	transition: all 0.3s ease;
	cursor: pointer;

	&:hover {
		background: rgba(255, 255, 255, 0.3);
		border-color: rgba(255, 255, 255, 0.5);
		transform: translateY(-2px);
	}

	& svg {
		width: 1.25rem;
		height: 1.25rem;
		flex-shrink: 0;
	}
`;

export const MainContentGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	gap: clamp(1.5rem, 3vw, 2rem);
	margin-bottom: clamp(2rem, 4vw, 3rem);

	@media (min-width: 1024px) {
		grid-template-columns: 2fr 1fr;
	}
`;

export const Section = styled.div`
	background: rgba(31, 73, 89, 0.4);
	backdrop-filter: blur(20px);
	border-radius: 1rem;
	padding: clamp(1.5rem, 3vw, 2rem);
	border: 2px solid rgba(92, 124, 137, 0.5);
	box-shadow: 0 8px 32px rgba(1, 20, 37, 0.2);
`;

export const ActivityItem = styled.div`
	display: flex;
	gap: 1rem;
	padding: clamp(1rem, 2vw, 1.25rem);
	background: rgba(1, 20, 37, 0.3);
	border-radius: 0.75rem;
	border: 1px solid rgba(92, 124, 137, 0.3);
	transition: all 0.3s ease;

	&:hover {
		background: rgba(1, 20, 37, 0.5);
		border-color: rgba(92, 124, 137, 0.5);
	}
`;

export const ActivityIcon = styled.div`
	width: 2.5rem;
	height: 2.5rem;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
	background: rgba(79, 70, 229, 0.2);
	color: #4f46e5;

	& svg {
		width: 1.25rem;
		height: 1.25rem;
	}
`;

export const ActivityContent = styled.div`
	flex: 1;
	min-width: 0;
`;

export const ActivityText = styled.p`
	font-weight: 600;
	color: #ffffff;
	font-size: clamp(0.9rem, 1.5vw, 1rem);
	margin-bottom: 0.25rem;
`;

export const ActivityMeta = styled.p`
	font-size: clamp(0.8rem, 1.5vw, 0.9rem);
	color: #94a3b8;
`;

export const ViewMoreButton = styled.button`
	width: 100%;
	padding: clamp(0.75rem, 1.5vw, 1rem);
	background: transparent;
	color: #4f46e5;
	font-weight: 600;
	border: none;
	border-top: 1px solid rgba(92, 124, 137, 0.3);
	cursor: pointer;
	margin-top: 1rem;
	font-size: clamp(0.9rem, 1.5vw, 1rem);
	transition: all 0.3s ease;

	&:hover {
		color: #7c3aed;
	}
`;

export const DecisionCard = styled.div`
	padding: clamp(1rem, 2vw, 1.25rem);
	background: linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.1));
	border-radius: 0.75rem;
	border: 1px solid rgba(168, 85, 247, 0.3);
	transition: all 0.3s ease;

	&:hover {
		background: linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(236, 72, 153, 0.15));
		border-color: rgba(168, 85, 247, 0.5);
	}
`;

export const DecisionTitle = styled.div`
	font-weight: 700;
	color: #ffffff;
	font-size: clamp(0.95rem, 1.5vw, 1.05rem);
	margin-bottom: 0.5rem;
`;

export const DecisionGroup = styled.div`
	font-size: clamp(0.8rem, 1.5vw, 0.9rem);
	color: #cbd5e1;
	margin-bottom: 0.75rem;
`;

export const DecisionMeta = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 0.5rem;
	font-size: clamp(0.75rem, 1.5vw, 0.85rem);
`;

export const DecisionDeadline = styled.span`
	color: #a78bfa;
	font-weight: 600;
`;

export const DecisionPending = styled.span`
	background: rgba(245, 158, 11, 0.3);
	color: #fbbf24;
	padding: clamp(0.25rem, 0.5vw, 0.4rem) clamp(0.5rem, 1vw, 0.75rem);
	border-radius: 9999px;
	font-weight: 600;
	display: inline-block;
`;

export const SectionHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: clamp(1.5rem, 3vw, 2rem);
`;

export const ViewAllLink = styled(Link)`
	color: #4f46e5;
	font-weight: 600;
	font-size: clamp(0.9rem, 1.5vw, 1rem);
	text-decoration: none;
	display: flex;
	align-items: center;
	gap: 0.5rem;
	transition: all 0.3s ease;

	&:hover {
		color: #7c3aed;
	}

	& svg {
		width: 1rem;
		height: 1rem;
	}
`;

export const EmptyState = styled.div`
	text-align: center;
	padding: clamp(2rem, 4vw, 3rem);
`;

export const EmptyIcon = styled.div`
	width: clamp(4rem, 8vw, 5rem);
	height: clamp(4rem, 8vw, 5rem);
	border-radius: 50%;
	background: rgba(79, 70, 229, 0.2);
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0 auto clamp(1rem, 2vw, 1.5rem);

	& svg {
		width: 50%;
		height: 50%;
		color: #4f46e5;
	}
`;

export const EmptyTitle = styled.h3`
	font-size: clamp(1.25rem, 3vw, 1.5rem);
	font-weight: 700;
	color: #ffffff;
	margin-bottom: 0.75rem;
`;

export const EmptyText = styled.p`
	font-size: clamp(0.95rem, 1.5vw, 1.05rem);
	color: #cbd5e1;
	margin-bottom: clamp(1.5rem, 2vw, 2rem);
`;

export const CreateButton = styled(Link)`
	display: inline-flex;
	align-items: center;
	gap: 0.75rem;
	padding: clamp(0.75rem, 1.5vw, 1rem) clamp(1.5rem, 3vw, 2rem);
	background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
	color: #ffffff;
	font-weight: 700;
	font-size: clamp(0.95rem, 1.5vw, 1.05rem);
	border-radius: 0.75rem;
	text-decoration: none;
	box-shadow: 0 8px 24px rgba(79, 70, 229, 0.3);
	transition: all 0.3s ease;

	&:hover {
		box-shadow: 0 12px 32px rgba(79, 70, 229, 0.4);
		transform: translateY(-2px);
	}

	& svg {
		width: 1.25rem;
		height: 1.25rem;
	}
`;

export const GroupsGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	gap: clamp(1.5rem, 2vw, 2rem);
`;

export const GroupCard = styled(Link)`
	display: block;
	background: rgba(31, 73, 89, 0.4);
	backdrop-filter: blur(20px);
	border-radius: 1rem;
	padding: clamp(1.5rem, 3vw, 2rem);
	border: 2px solid rgba(92, 124, 137, 0.5);
	text-decoration: none;
	transition: all 0.3s ease;
	box-shadow: 0 8px 32px rgba(1, 20, 37, 0.2);

	&:hover {
		background: rgba(31, 73, 89, 0.6);
		border-color: #4f46e5;
		box-shadow: 0 12px 40px rgba(31, 73, 89, 0.3);
		transform: translateY(-4px);
	}
`;

export const GroupHeader = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	margin-bottom: 1rem;
`;

export const GroupIcon = styled.div`
	width: clamp(2.5rem, 4vw, 3rem);
	height: clamp(2.5rem, 4vw, 3rem);
	border-radius: 0.75rem;
	background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;

	& svg {
		width: 1.5rem;
		height: 1.5rem;
		color: #ffffff;
	}
`;

export const GroupCode = styled.span`
	padding: clamp(0.25rem, 0.5vw, 0.4rem) clamp(0.75rem, 1vw, 0.9rem);
	background: rgba(79, 70, 229, 0.2);
	color: #4f46e5;
	font-size: clamp(0.7rem, 1.5vw, 0.8rem);
	font-weight: 700;
	border-radius: 9999px;
`;

export const GroupName = styled.h3`
	font-size: clamp(1.1rem, 2vw, 1.25rem);
	font-weight: 700;
	color: #ffffff;
	margin-bottom: 0.75rem;
	line-height: 1.2;
`;

export const GroupDesc = styled.p`
	font-size: clamp(0.85rem, 1.5vw, 0.95rem);
	color: #cbd5e1;
	margin-bottom: 1rem;
	line-height: 1.5;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
`;

export const GroupFooter = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: clamp(0.8rem, 1.5vw, 0.9rem);
`;

export const GroupMembers = styled.span`
	color: #94a3b8;
	display: flex;
	align-items: center;
	gap: 0.5rem;

	& svg {
		width: 1rem;
		height: 1rem;
	}
`;

export const GroupViewLink = styled.span`
	color: #4f46e5;
	font-weight: 600;
	transition: color 0.3s ease;

	${GroupCard}:hover & {
		color: #7c3aed;
	}
`;

export const FeatureHighlightsGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	gap: clamp(1.5rem, 2vw, 2rem);
	margin-top: clamp(2rem, 4vw, 3rem);
`;

export const FeatureCard = styled(Link)`
	display: block;
	background: rgba(31, 73, 89, 0.4);
	backdrop-filter: blur(20px);
	border-radius: 1rem;
	border: 2px solid rgba(92, 124, 137, 0.5);
	padding: clamp(1.5rem, 3vw, 2rem);
	color: #ffffff;
	text-decoration: none;
	transition: all 0.3s ease;
	box-shadow: 0 8px 32px rgba(1, 20, 37, 0.2);

	&:hover {
		background: rgba(31, 73, 89, 0.6);
		border-color: rgba(92, 124, 137, 0.7);
		box-shadow: 0 12px 40px rgba(1, 20, 37, 0.3);
		transform: translateY(-4px);
	}
`;

export const FeatureIcon = styled.div`
	width: clamp(2.5rem, 4vw, 3rem);
	height: clamp(2.5rem, 4vw, 3rem);
	margin-bottom: clamp(1rem, 2vw, 1.5rem);
	opacity: 0.9;

	& svg {
		width: 100%;
		height: 100%;
		color: #ffffff;
	}
`;

export const FeatureTitle = styled.h3`
	font-size: clamp(1.25rem, 2vw, 1.5rem);
	font-weight: 700;
	margin-bottom: 0.75rem;
`;

export const FeatureDesc = styled.p`
	font-size: clamp(0.9rem, 1.5vw, 1rem);
	line-height: 1.6;
	margin-bottom: clamp(1rem, 1.5vw, 1.25rem);
	opacity: 0.95;
`;

export const FeatureLink = styled.div`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	font-weight: 600;
	font-size: clamp(0.9rem, 1.5vw, 1rem);

	& svg {
		width: 1rem;
		height: 1rem;
		transition: transform 0.3s ease;
	}

	${FeatureCard}:hover & svg {
		transform: translateX(4px);
	}
`;
