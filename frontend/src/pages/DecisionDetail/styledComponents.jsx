export const SubmissionStatus = styled.span`
	display: inline-block;
	padding: 0.25rem 0.75rem;
	border-radius: 1rem;
	font-size: 0.95rem;
	font-weight: 500;
	background: rgba(92, 124, 137, 0.3);
	color: #b0d4dd;
	margin-left: 0.5rem;
`;
export const DecisionDetailContainer = styled.div`
	min-height: 100vh;
	background: linear-gradient(135deg, #011425 0%, #1f4959 50%, #5c7c89 100%);
	padding: clamp(1rem, 3vw, 1.5rem);
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	box-sizing: border-box;
`;

export const DecisionContentWrapper = styled.div`
	max-width: 800px;
	width: 100%;
	background: rgba(31, 73, 89, 0.4);
	backdrop-filter: blur(20px);
	border-radius: 1.5rem;
	box-shadow: 0 8px 32px rgba(1, 20, 37, 0.3);
	border: 2px solid rgba(92, 124, 137, 0.5);
	padding: clamp(1.5rem, 3vw, 2.5rem);
	display: flex;
	flex-direction: column;
	align-items: stretch;
`;

export const BackButton = styled.button`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	background: none;
	border: none;
	color: #5c7c89;
	font-size: 1rem;
	font-weight: 500;
	cursor: pointer;
	margin-bottom: 1.5rem;
	padding: 0;
	transition: color 0.2s;
	align-self: flex-start;
	
	&:hover {
		color: #ffffff;
	}
`;

export const Header = styled.div`
	text-align: left;
	margin-bottom: 2rem;
`;

export const StatusBadge = styled.span`
	display: inline-block;
	padding: 0.25rem 0.75rem;
	border-radius: 1rem;
	font-size: 0.95rem;
	font-weight: 500;
	background: rgba(92, 124, 137, 0.3);
	color: #b0d4dd;
	margin-left: 0.5rem;
`;

export const ProgressBar = styled.div`
	width: 100%;
	height: 8px;
	background: rgba(92, 124, 137, 0.2);
	border-radius: 4px;
	margin: 0.5rem 0 1rem 0;
	overflow: hidden;
`;

export const ProgressFill = styled.div`
	height: 100%;
	background: #5c7c89;
	border-radius: 4px;
	transition: width 0.3s;
`;

export const ReasonList = styled.ul`
	padding-left: 1.25rem;
	margin: 0;
	color: #b0d4dd;
`;

export const FlexRow = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
`;

export const FlexCol = styled.div`
	display: flex;
	flex-direction: column;
`;

export const Title = styled.h2`
	font-size: 2rem;
	font-weight: 700;
	color: #ffffff;
	margin-bottom: 0.25rem;
`;

export const SubTitle = styled.p`
	font-size: 1.1rem;
	color: #5c7c89;
	margin-bottom: 0.5rem;
`;

export const Section = styled.section`
	margin-bottom: 2rem;
`;

export const Label = styled.span`
	font-weight: 500;
	color: #b0d4dd;
	margin-right: 0.5rem;
`;

export const Value = styled.span`
	color: #5c7c89;
	font-size: 1rem;
`;

export const InfoText = styled.div`
	color: #b0d4dd;
	font-size: 0.95rem;
	margin-bottom: 0.5rem;
`;

export const OptionPrice = styled.span`
	color: #5c7c89;
	font-size: 0.95rem;
	margin-left: 0.5rem;
`;

export const Satisfaction = styled.div`
	color: #4caf50;
	font-weight: 600;
	font-size: 1rem;
	margin-top: 0.5rem;
`;

export const SubmissionRow = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 0.5rem;
`;

export const SubmissionUser = styled.div`
	display: flex;
	align-items: center;
`;

export const SubmissionName = styled.span`
	font-weight: 500;
	color: #ffffff;
	margin-left: 0.5rem;
`;
export const Avatar = styled.img`
	width: 32px;
	height: 32px;
	border-radius: 50%;
	object-fit: cover;
	margin-right: 0.5rem;
`;
export const WinnerStatsRow = styled.div`
	display: flex;
	gap: 1.5rem;
	margin-top: 0.5rem;
	justify-content: center;
`;
export const AltOptionBox = styled.div`
	background: rgba(92, 124, 137, 0.2);
	border: 1px solid rgba(92, 124, 137, 0.4);
	border-radius: 0.75rem;
	padding: 1rem 1.25rem;
	margin-bottom: 1.25rem;
`;
// Header rows and stats
import styled from "styled-components";

export const HeaderRow = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 1rem;
	margin-bottom: 0.5rem;
`;
export const StatsRow = styled.div`
	display: flex;
	gap: 2rem;
	font-size: 1rem;
	color: #b0d4dd;
	justify-content: flex-start;
`;
export const StatItem = styled.div`
	display: flex;
	gap: 0.5rem;
	align-items: center;
`;

// Collecting section
export const CollectingRow = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 0.5rem;
`;
export const SubmitCol = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 1rem;
`;

// Winner card
export const WinnerCard = styled.div`
	margin-bottom: 1.5rem;
	background: rgba(92, 124, 137, 0.3);
	border: 1px solid rgba(92, 124, 137, 0.5);
	border-radius: 1rem;
	padding: 1.5rem;
`;

export const WinnerRow = styled.div`
	display: flex;
	align-items: center;
	gap: 1.5rem;
`;

export const WinnerIconCol = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 60px;
	height: 60px;
	background: rgba(76, 175, 80, 0.2);
	border-radius: 50%;
	flex-shrink: 0;
`;

export const WinnerContentCol = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
`;

export const WinnerTitle = styled.h3`
	font-size: 1.75rem;
	font-weight: 700;
	color: #ffffff;
	margin: 0;
`;

export const WinnerStat = styled.div`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	color: #b0d4dd;
	font-size: 0.95rem;
`;

export const ReasonCard = styled.div`
	margin-bottom: 2rem;
	background: rgba(92, 124, 137, 0.2);
	border: 1px solid rgba(92, 124, 137, 0.4);
	border-radius: 1rem;
	padding: 1.5rem;
`;

export const ReasonHeader = styled.div`
	display: flex;
	align-items: center;
	gap: 0.75rem;
	margin-bottom: 1rem;
`;

export const ReasonSubTitle = styled.h4`
	font-size: 1.1rem;
	color: #ffffff;
	margin: 0;
	font-weight: 600;
`;

export const ReasonItem = styled.li`
	display: flex;
	gap: 0.75rem;
	margin-bottom: 0.75rem;
	color: #b0d4dd;
	font-size: 0.95rem;
`;

export const ReasonCheck = styled.span`
	color: #4caf50;
	font-weight: 700;
	margin-top: 0.125rem;
`;

export const ReasonText = styled.span`
	flex: 1;
`;

export const AltCard = styled.div`
	margin-bottom: 2rem;
	background: rgba(92, 124, 137, 0.2);
	border: 1px solid rgba(92, 124, 137, 0.4);
	border-radius: 1rem;
	padding: 1.5rem;
`;

export const AltSubTitle = styled.h4`
	font-size: 1.1rem;
	color: #ffffff;
	margin: 0 0 1rem 0;
	font-weight: 600;
`;

export const AltCol = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

export const AltRow = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 0.5rem;
`;

export const AltName = styled.span`
	font-weight: 600;
	color: #ffffff;
	font-size: 1rem;
`;

export const AltScore = styled.span`
	color: #5c7c89;
	font-size: 0.9rem;
`;

export const AltPrice = styled.span`
	color: #b0d4dd;
	font-size: 0.85rem;
	margin-bottom: 0.5rem;
`;

export const AltWhy = styled.p`
	color: #b0d4dd;
	font-size: 0.9rem;
	margin: 0;
	font-style: italic;
`;

export const ProcessingCard = styled.div`
	margin-bottom: 2rem;
	background: rgba(92, 124, 137, 0.3);
	border: 1px solid rgba(92, 124, 137, 0.5);
	border-radius: 1rem;
	padding: 2rem;
	text-align: center;
`;

export const ProcessingIconCol = styled.div`
	display: flex;
	justify-content: center;
	margin-bottom: 1rem;
`;

export const ProcessingIconBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	animation: spin 2s linear infinite;
	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
`;

export const ProcessingSubTitle = styled.h3`
	font-size: 1.25rem;
	color: #ffffff;
	margin: 0 0 0.5rem 0;
	font-weight: 600;
`;

export const ProcessingInfo = styled.p`
	color: #b0d4dd;
	font-size: 0.95rem;
	margin: 0;
`;

export const Card = styled.div`
	margin-bottom: 2rem;
	background: rgba(92, 124, 137, 0.2);
	border: 1px solid rgba(92, 124, 137, 0.4);
	border-radius: 1rem;
	padding: 1.5rem;
`;
