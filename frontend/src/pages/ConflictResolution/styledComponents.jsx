import styled from 'styled-components';

export const Container = styled.div`
	min-height: 100vh;
	background: linear-gradient(135deg, #011425 0%, #1f4959 50%, #5c7c89 100%);
	padding: clamp(1.5rem, 5vw, 3rem);
`;

export const AlertHeader = styled.div`
	background: linear-gradient(135deg, #ef4444 0%, #f97316 100%);
	color: #ffffff;
	border-radius: 1rem;
	box-shadow: 0 20px 40px rgba(239, 68, 68, 0.3);
	padding: clamp(2rem, 4vw, 3rem);
	margin-bottom: clamp(2rem, 4vw, 3rem);
`;

export const AlertContent = styled.div`
	display: flex;
	align-items: center;
	gap: 1.5rem;
	margin-bottom: clamp(1.5rem, 2vw, 2rem);
`;

export const AlertIconBox = styled.div`
	width: clamp(3rem, 5vw, 4rem);
	height: clamp(3rem, 5vw, 4rem);
	background: rgba(255, 255, 255, 0.2);
	backdrop-filter: blur(10px);
	border-radius: 9999px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;

	& svg {
		width: clamp(1.5rem, 3vw, 2.5rem);
		height: clamp(1.5rem, 3vw, 2.5rem);
	}
`;

export const AlertTitle = styled.h1`
	font-size: clamp(2rem, 5vw, 2.5rem);
	font-weight: 700;
	margin-bottom: 0.5rem;
`;

export const AlertSubtitle = styled.p`
	font-size: clamp(0.95rem, 2vw, 1.1rem);
	color: rgba(255, 255, 255, 0.9);
`;

export const StatsBox = styled.div`
	background: rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(10px);
	border-radius: 0.75rem;
	padding: 1rem;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
	gap: 1rem;
	text-align: center;
`;

export const StatItem = styled.div``;

export const StatNumber = styled.div`
	font-size: clamp(1.5rem, 3vw, 2rem);
	font-weight: 700;
	margin-bottom: 0.25rem;
`;

export const StatLabel = styled.div`
	font-size: 0.875rem;
	color: rgba(255, 255, 255, 0.8);
`;

export const ConflictsSection = styled.div`
	margin-bottom: clamp(2rem, 4vw, 3rem);
	max-width: 1200px;
	margin-left: auto;
	margin-right: auto;
`;

export const SectionTitle = styled.h2`
	font-size: clamp(1.5rem, 3vw, 2rem);
	font-weight: 700;
	color: #ffffff;
	margin-bottom: clamp(1.5rem, 3vw, 2rem);
	display: flex;
	align-items: center;
	gap: 0.75rem;

	& svg {
		width: clamp(1.5rem, 2vw, 1.75rem);
		height: clamp(1.5rem, 2vw, 1.75rem);
	}
`;

export const ConflictsList = styled.div`
	display: flex;
	flex-direction: column;
	gap: clamp(1rem, 2vw, 1.5rem);
`;

export const ConflictCard = styled.div`
	border-radius: 0.75rem;
	padding: clamp(1rem, 2vw, 1.5rem);
	border: 2px solid;
	background: rgba(31, 73, 89, 0.3);
	transition: all 0.3s ease;

	${props => {
		switch (props.$severity) {
			case 'high':
				return `
					border-color: rgba(239, 68, 68, 0.6);
					background: rgba(239, 68, 68, 0.1);
				`;
			case 'medium':
				return `
					border-color: rgba(245, 158, 11, 0.6);
					background: rgba(245, 158, 11, 0.1);
				`;
			case 'low':
				return `
					border-color: rgba(59, 130, 246, 0.6);
					background: rgba(59, 130, 246, 0.1);
				`;
			default:
				return `
					border-color: rgba(92, 124, 137, 0.5);
				`;
		}
	}}

	&:hover {
		background: rgba(31, 73, 89, 0.5);
	}
`;

export const ConflictHeader = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	margin-bottom: 1rem;
	gap: 1rem;
`;

export const ConflictDescription = styled.div`
	font-weight: 700;
	font-size: clamp(1rem, 1.5vw, 1.1rem);
	color: #ffffff;
	margin-bottom: 0.5rem;
`;

export const ConflictAffected = styled.div`
	font-size: 0.875rem;
	color: #cbd5e1;
`;

export const SeverityBadge = styled.span`
	display: inline-block;
	padding: clamp(0.375rem, 0.75vw, 0.5rem) clamp(0.75rem, 1.5vw, 1rem);
	background: rgba(255, 255, 255, 0.2);
	border-radius: 9999px;
	font-size: 0.75rem;
	font-weight: 600;
	text-transform: uppercase;
	color: #ffffff;
	white-space: nowrap;
`;

export const ConflictDetailsGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	gap: 1rem;
`;

export const UserDetailBox = styled.div`
	background: rgba(1, 20, 37, 0.5);
	border-radius: 0.5rem;
	padding: 0.75rem;
	border: 1px solid rgba(92, 124, 137, 0.3);
`;

export const UserName = styled.div`
	font-weight: 600;
	color: #ffffff;
	margin-bottom: 0.25rem;
`;

export const UserWants = styled.div`
	font-size: 0.875rem;
	color: #cbd5e1;
`;

export const UserConstraint = styled.div`
	font-size: 0.75rem;
	color: #94a3b8;
	margin-top: 0.25rem;
`;

export const CompromisesSection = styled.div`
	margin-bottom: clamp(2rem, 4vw, 3rem);
	max-width: 1400px;
	margin-left: auto;
	margin-right: auto;
`;

export const CompromisesGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	gap: clamp(1.5rem, 2vw, 2rem);
`;

export const CompromiseCard = styled.div`
	background: rgba(31, 73, 89, 0.4);
	backdrop-filter: blur(20px);
	border-radius: 1rem;
	border: 2px solid rgba(92, 124, 137, 0.5);
	overflow: hidden;
	box-shadow: 0 8px 32px rgba(1, 20, 37, 0.2);
	transition: all 0.3s ease;

	${props => props.$selected ? `
		border-color: #10b981;
		box-shadow: 0 12px 40px rgba(16, 185, 129, 0.3);
		transform: scale(1.02);
	` : `
		&:hover {
			background: rgba(31, 73, 89, 0.6);
			border-color: rgba(92, 124, 137, 0.7);
			box-shadow: 0 12px 40px rgba(1, 20, 37, 0.3);
		}
	`}
`;

export const ProbabilityBar = styled.div`
	height: 0.5rem;
	background: linear-gradient(90deg, ${props => {
		const colors = {
			'from-green-500 to-emerald-600': '#10b981 0%, #059669 100%',
			'from-blue-500 to-cyan-600': '#3b82f6 0%, #06b6d4 100%',
			'from-purple-500 to-pink-600': '#a855f7 0%, #ec4899 100%',
			'from-orange-500 to-red-600': '#f97316 0%, #dc2626 100%'
		};
		return colors[props.$gradient] || '#4f46e5 0%, #7c3aed 100%';
	}});
	width: ${props => props.$probability}%;
	transition: width 0.3s ease;
`;

export const CompromiseCardContent = styled.div`
	padding: clamp(1.5rem, 3vw, 2rem);
`;

export const CompromiseHeader = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	margin-bottom: 1rem;
	gap: 1rem;
`;

export const CompromiseIcon = styled.div`
	width: clamp(2.5rem, 4vw, 3rem);
	height: clamp(2.5rem, 4vw, 3rem);
	border-radius: 0.75rem;
	background: linear-gradient(135deg, ${props => {
		const colors = {
			'from-green-500 to-emerald-600': '#10b981 0%, #059669 100%',
			'from-blue-500 to-cyan-600': '#3b82f6 0%, #06b6d4 100%',
			'from-purple-500 to-pink-600': '#a855f7 0%, #ec4899 100%',
			'from-orange-500 to-red-600': '#f97316 0%, #dc2626 100%'
		};
		return colors[props.$gradient] || '#4f46e5 0%, #7c3aed 100%';
	}});
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

export const CompromiseTitle = styled.h3`
	font-size: clamp(1.1rem, 2vw, 1.25rem);
	font-weight: 700;
	color: #ffffff;
`;

export const CompromiseSuccessRate = styled.p`
	font-size: 0.875rem;
	color: #cbd5e1;
`;

export const ImpactBadge = styled.span`
	display: inline-block;
	padding: clamp(0.375rem, 0.75vw, 0.5rem) clamp(0.75rem, 1.5vw, 1rem);
	border-radius: 9999px;
	font-size: 0.75rem;
	font-weight: 600;
	white-space: nowrap;
	text-transform: capitalize;

	${props => {
		switch (props.$impact) {
			case 'high':
				return `
					background: rgba(16, 185, 129, 0.2);
					color: #10b981;
				`;
			case 'medium':
				return `
					background: rgba(59, 130, 246, 0.2);
					color: #3b82f6;
				`;
			case 'low':
				return `
					background: rgba(107, 114, 128, 0.2);
					color: #d1d5db;
				`;
			default:
				return `
					background: rgba(92, 124, 137, 0.2);
					color: #cbd5e1;
				`;
		}
	}}
`;

export const CompromiseDescription = styled.p`
	color: #cbd5e1;
	font-size: clamp(0.875rem, 1.5vw, 1rem);
	margin-bottom: 1.5rem;
	line-height: 1.5;
`;

export const SatisfactionBox = styled.div`
	background: rgba(1, 20, 37, 0.5);
	border-radius: 0.75rem;
	padding: 1rem;
	margin-bottom: 1.5rem;
	border: 1px solid rgba(92, 124, 137, 0.3);
`;

export const SatisfactionLabel = styled.div`
	font-size: 0.875rem;
	font-weight: 600;
	color: #ffffff;
	margin-bottom: 1rem;
`;

export const SatisfactionItem = styled.div`
	display: flex;
	align-items: center;
	gap: 0.75rem;
	margin-bottom: 0.75rem;

	&:last-child {
		margin-bottom: 0;
	}
`;

export const SatisfactionUser = styled.div`
	width: 5rem;
	font-size: 0.875rem;
	font-weight: 500;
	color: #cbd5e1;
`;

export const SatisfactionBar = styled.div`
	flex: 1;
	height: 0.75rem;
	background: rgba(92, 124, 137, 0.3);
	border-radius: 9999px;
	overflow: hidden;
`;

export const SatisfactionScore = styled.div`
	width: 3rem;
	text-align: right;
	font-size: 0.875rem;
	font-weight: 600;
	color: #10b981;
`;

export const RecommendationBox = styled.div`
	background: ${props => {
		const colors = {
			'from-green-500 to-emerald-600': 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%)',
			'from-blue-500 to-cyan-600': 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)',
			'from-purple-500 to-pink-600': 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)',
			'from-orange-500 to-red-600': 'linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(220, 38, 38, 0.1) 100%)'
		};
		return colors[props.$gradient] || 'linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%)';
	}};
	border-radius: 0.75rem;
	padding: 1rem;
	margin-bottom: 1.5rem;
	border: 1px solid rgba(92, 124, 137, 0.3);
`;

export const RecommendationTitle = styled.div`
	font-weight: 600;
	color: #ffffff;
	margin-bottom: 0.75rem;
	display: flex;
	align-items: center;
	gap: 0.5rem;

	& svg {
		width: 1rem;
		height: 1rem;
	}
`;

export const RecommendationContent = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

export const RecommendationItem = styled.div`
	font-size: clamp(0.8rem, 1.2vw, 0.95rem);
	color: #cbd5e1;
`;

export const TradeoffsSection = styled.div`
	margin-bottom: 1.5rem;
`;

export const TradeoffLabel = styled.div`
	font-size: 0.875rem;
	font-weight: 600;
	color: #ffffff;
	margin-bottom: 0.75rem;
`;

export const TradeoffItem = styled.div`
	display: flex;
	align-items: flex-start;
	gap: 0.5rem;
	margin-bottom: 0.75rem;
	font-size: clamp(0.8rem, 1.2vw, 0.95rem);

	&:last-child {
		margin-bottom: 0;
	}
`;

export const TradeoffArrow = styled.div`
	color: #a855f7;
	flex-shrink: 0;
	margin-top: 0.125rem;

	& svg {
		width: 1rem;
		height: 1rem;
	}
`;

export const TradeoffText = styled.div`
	flex: 1;
`;

export const ActionButton = styled.button`
	width: 100%;
	padding: clamp(0.75rem, 1.5vw, 1rem);
	background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);
	color: #ffffff;
	font-weight: 600;
	border-radius: 0.75rem;
	border: none;
	cursor: pointer;
	transition: all 0.3s ease;
	font-size: clamp(0.9rem, 1.2vw, 1rem);

	&:hover {
		box-shadow: 0 8px 20px rgba(168, 85, 247, 0.3);
		transform: translateY(-2px);
	}
`;

export const ActionContent = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;

	& svg {
		width: clamp(1rem, 1.5vw, 1.25rem);
		height: clamp(1rem, 1.5vw, 1.25rem);
	}
`;

export const SelectedButton = styled.button`
	width: 100%;
	padding: clamp(0.75rem, 1.5vw, 1rem);
	background: linear-gradient(135deg, #10b981 0%, #059669 100%);
	color: #ffffff;
	font-weight: 600;
	border-radius: 0.75rem;
	border: none;
	cursor: default;
	font-size: clamp(0.9rem, 1.2vw, 1rem);
	box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
`;

export const ApprovalSection = styled.div`
	background: rgba(31, 73, 89, 0.4);
	backdrop-filter: blur(20px);
	border-radius: 1rem;
	border: 2px solid rgba(92, 124, 137, 0.5);
	padding: clamp(1.5rem, 3vw, 2rem);
	text-align: center;
	max-width: 1200px;
	margin-left: auto;
	margin-right: auto;
	margin-bottom: clamp(2rem, 4vw, 3rem);
`;

export const ApprovalTitle = styled.h3`
	font-size: clamp(1.1rem, 2vw, 1.5rem);
	font-weight: 700;
	color: #ffffff;
	margin-bottom: 0.75rem;
`;

export const ApprovalText = styled.p`
	color: #cbd5e1;
	margin-bottom: 1.5rem;
	font-size: clamp(0.9rem, 1.5vw, 1rem);
`;

export const ApprovalButtons = styled.div`
	display: flex;
	gap: 1rem;
	justify-content: center;
	flex-wrap: wrap;
`;

export const ApprovalAction = styled.button`
	padding: clamp(0.75rem, 1.5vw, 1rem) clamp(2rem, 4vw, 3rem);
	background: linear-gradient(135deg, #10b981 0%, #059669 100%);
	color: #ffffff;
	font-weight: 600;
	border-radius: 0.75rem;
	border: none;
	cursor: pointer;
	transition: all 0.3s ease;
	font-size: clamp(0.9rem, 1.5vw, 1rem);

	&:hover {
		box-shadow: 0 12px 24px rgba(16, 185, 129, 0.3);
		transform: translateY(-2px);
	}
`;

export const ApprovalCancel = styled.button`
	padding: clamp(0.75rem, 1.5vw, 1rem) clamp(2rem, 4vw, 3rem);
	background: rgba(107, 114, 128, 0.2);
	color: #cbd5e1;
	font-weight: 600;
	border: 2px solid rgba(107, 114, 128, 0.4);
	border-radius: 0.75rem;
	cursor: pointer;
	transition: all 0.3s ease;
	font-size: clamp(0.9rem, 1.5vw, 1rem);

	&:hover {
		background: rgba(107, 114, 128, 0.3);
		border-color: rgba(107, 114, 128, 0.6);
	}
`;

export const GuideSection = styled.div`
	margin-top: clamp(2rem, 4vw, 3rem);
	background: linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(220, 38, 38, 0.1) 100%);
	border: 2px solid rgba(249, 115, 22, 0.3);
	border-radius: 1rem;
	padding: clamp(1.5rem, 3vw, 2rem);
	max-width: 1200px;
	margin-left: auto;
	margin-right: auto;
	margin-bottom: clamp(2rem, 4vw, 3rem);
`;

export const GuideTitle = styled.h3`
	display: flex;
	align-items: center;
	gap: 0.75rem;
	font-weight: 700;
	color: #f97316;
	margin-bottom: 1rem;
	font-size: clamp(1.1rem, 2vw, 1.25rem);

	& svg {
		width: clamp(1.25rem, 1.5vw, 1.5rem);
		height: clamp(1.25rem, 1.5vw, 1.5rem);
	}
`;

export const GuideContent = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
`;

export const GuideItem = styled.p`
	font-size: clamp(0.875rem, 1.5vw, 1rem);
	color: #cbd5e1;
	line-height: 1.6;
`;
