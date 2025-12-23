export const Subtitle = styled.p`
	color: #5c7c89;
	font-size: 1.1rem;
	margin-bottom: 1.5rem;
`;
export const HeaderIcon = styled.div`
	width: 64px;
	height: 64px;
	background: linear-gradient(135deg, #1f4959, #5c7c89);
	border-radius: 16px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0 auto 1rem;
`;
export const ExampleBox = styled.div`
	background: rgba(31, 73, 89, 0.4);
	backdrop-filter: blur(20px);
	border-radius: 12px;
	border: 2px solid rgba(92, 124, 137, 0.5);
	padding: 1rem;
	margin-bottom: 1.5rem;
`;

export const ExampleCode = styled.code`
	background: #e0f2f1;
	color: #00796b;
	padding: 0.2rem 0.5rem;
	border-radius: 6px;
	font-size: 1rem;
`;

export const InfoBox = styled.div`
	background: #f9fafb;
	border-radius: 12px;
	padding: 1rem;
	margin-bottom: 1.5rem;
`;

export const InfoTitle = styled.h2`
	font-size: 1.1rem;
	font-weight: 600;
	color: #222;
	margin-bottom: 0.5rem;
`;

export const InfoList = styled.ul`
	padding-left: 1.2rem;
	margin-bottom: 1rem;
`;

export const InfoListItem = styled.li`
	color: #444;
	font-size: 1rem;
	margin-bottom: 0.25rem;
`;

export const InfoListIcon = styled.span`
	color: #10b981;
	margin-right: 0.5rem;
`;

export const ButtonRow = styled.div`
	display: flex;
	gap: 1rem;
	margin-top: 1.5rem;
`;

export const HelpText = styled.p`
	color: #888;
	font-size: 0.98rem;
	margin-top: 1.5rem;
`;

export const HelpButton = styled.button`
	background: none;
	border: none;
	color: #10b981;
	font-weight: 600;
	cursor: pointer;
	margin-left: 0.5rem;
	font-size: 1rem;
	&:hover {
		text-decoration: underline;
	}
`;
export const JoinGroupContainer = styled.div`
	min-height: 100vh;
	background: linear-gradient(135deg, #011425 0%, #1f4959 50%, #5c7c89 100%);
	padding: 2rem 0;
`;
import styled from "styled-components";

export const PageWrapper = styled.div`
	max-width: 600px;
	margin: 0 auto;
	padding: 2rem 0;
`;

export const BackButton = styled.button`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	color: #666;
	background: none;
	border: none;
	margin-bottom: 1.5rem;
	cursor: pointer;
	transition: color 0.2s;
	font-size: 1rem;
	&:hover {
		color: #222;
	}
`;

export const Header = styled.div`
	text-align: center;
	margin-bottom: 2rem;
`;



export const Title = styled.h1`
	font-size: 2rem;
	font-weight: bold;
	color: #00796b;
	margin-bottom: 1.5rem;
`;
