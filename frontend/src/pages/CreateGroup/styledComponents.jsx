export const CreateGroupContainer = styled.div`
	max-width: 500px;
	margin: 2rem auto;
	background: rgba(31, 73, 89, 0.4);
	backdrop-filter: blur(20px);
	border-radius: 1.5rem;
	box-shadow: 0 8px 32px rgba(1, 20, 37, 0.3);
	border: 2px solid rgba(92, 124, 137, 0.5);
	padding: 2.5rem 2rem 2rem 2rem;
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
	&:hover {
		color: #ffffff;
	}
`;

export const Header = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 1.5rem;
`;

export const HeaderIcon = styled.div`
	background: rgba(92, 124, 137, 0.3);
	border-radius: 50%;
	padding: 0.75rem;
	margin-bottom: 0.5rem;
	display: flex;
	align-items: center;
	justify-content: center;
	svg {
		color: #5c7c89;
		width: 2rem;
		height: 2rem;
	}
`;

export const Title = styled.h2`
	font-size: 2rem;
	font-weight: 700;
	color: #ffffff;
	margin-bottom: 0.25rem;
`;

export const Subtitle = styled.p`
	font-size: 1.1rem;
	color: #5c7c89;
	margin-bottom: 0.5rem;
`;

export const FormInfoBox = styled.div`
	background: rgba(92, 124, 137, 0.2);
	border: 2px solid rgba(92, 124, 137, 0.5);
	border-radius: 0.75rem;
	padding: 1rem 1.25rem;
	margin-bottom: 1.25rem;
`;

export const InfoTitle = styled.div`
	font-weight: 600;
	color: #b0d4dd;
	margin-bottom: 0.5rem;
`;

export const InfoList = styled.ul`
	padding-left: 1.25rem;
	margin: 0;
	color: #b0d4dd;
`;

export const InfoListItem = styled.li`
	margin-bottom: 0.25rem;
	font-size: 1rem;
`;

export const HelpText = styled.div`
	text-align: center;
	color: #5c7c89;
	font-size: 0.95rem;
	margin-top: 1.5rem;
`;

export const DescriptionCharCount = styled.div`
	text-align: right;
	color: #888;
	font-size: 0.9rem;
	margin-top: 0.1rem;
	margin-bottom: 0.5rem;
`;
import styled from "styled-components";

export const DescriptionField = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 1.25rem;
`;

export const DescriptionLabel = styled.label`
	font-weight: 500;
	color: #ffffff;
	margin-bottom: 0.25rem;
	font-size: 1rem;
`;

export const DescriptionOptional = styled.span`
	color: #5c7c89;
	font-size: 0.95rem;
	margin-left: 0.5rem;
`;

export const DescriptionTextarea = styled.textarea`
	width: 100%;
	border-radius: 8px;
	border: 1px solid #b2dfdb;
	padding: 0.75rem;
	font-size: 1rem;
	resize: vertical;
	margin-bottom: 0.25rem;
	background: #fff;
	color: #222;
	&:focus {
		outline: none;
		border-color: #009688;
	}
`;

export const DescriptionError = styled.span`
	color: #e53e3e;
	font-size: 0.95rem;
	margin-bottom: 0.25rem;
`;
