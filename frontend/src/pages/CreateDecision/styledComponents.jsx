export const Subtitle = styled.p`
	font-size: 1.1rem;
	color: #5c7c89;
	margin-bottom: 0.5rem;
`;
export const CreateDecisionContainer = styled.div`
	max-width: 800px;
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

export const SectionTitle = styled.h3`
	font-size: 1.25rem;
	font-weight: 600;
	color: #ffffff;
	margin-bottom: 1rem;
`;

export const OptionFormBox = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
	margin-bottom: 1.5rem;
`;

export const OptionTagsLabel = styled.label`
	font-size: 1rem;
	color: #ffffff;
	margin-bottom: 0.25rem;
`;

export const OptionTagsInput = styled.input`
	width: 100%;
	border-radius: 8px;
	border: 2px solid rgba(92, 124, 137, 0.5);
	padding: 0.75rem;
	font-size: 1rem;
	margin-bottom: 0.25rem;
	background: rgba(31, 73, 89, 0.3);
	color: #ffffff;
	box-sizing: border-box;
	transition: all 0.2s ease;
	&:focus {
		outline: none;
		border-color: #5c7c89;
		background: rgba(31, 73, 89, 0.5);
	}
	&::placeholder {
		color: rgba(176, 212, 221, 0.7);
	}
`;

export const OptionTagsHelp = styled.div`
	color: #5c7c89;
	font-size: 0.95rem;
	margin-bottom: 0.5rem;
`;

export const OptionList = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0;
`;

export const OptionListItem = styled.li`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0.75rem 0;
	border-bottom: 1px solid rgba(92, 124, 137, 0.3);
`;

export const OptionName = styled.span`
	font-weight: 500;
	color: #ffffff;
`;

export const OptionPrice = styled.span`
	color: #b0d4dd;
	font-size: 0.95rem;
	margin-left: 0.5rem;
`;

export const OptionTagRow = styled.div`
	display: flex;
	gap: 0.5rem;
	margin-top: 0.25rem;
`;

export const OptionTag = styled.span`
	background: rgba(92, 124, 137, 0.3);
	color: #b0d4dd;
	border-radius: 0.5rem;
	padding: 0.2rem 0.75rem;
	font-size: 0.95rem;
	margin-right: 0.25rem;
`;

export const RemoveOptionButton = styled.button`
	background: none;
	border: none;
	color: #e53e3e;
	font-size: 1rem;
	cursor: pointer;
	margin-left: 1rem;
	&:hover {
		text-decoration: underline;
	}
`;

export const OptionError = styled.span`
	color: #e53e3e;
	font-size: 0.95rem;
	margin-left: 0.5rem;
`;

export const InfoBox = styled.div`
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

export const InfoListNumber = styled.span`
	font-weight: 700;
	color: #b0d4dd;
	margin-right: 0.5rem;
`;

export const CategoryRequired = styled.span`
	color: #e53e3e;
	margin-left: 0.25rem;
`;
export const CategorySelect = styled.select`
	width: 100%;
	padding: 0.75rem;
	border-radius: 8px;
	border: 2px solid rgba(92, 124, 137, 0.5);
	font-size: 1rem;
	background: rgba(31, 73, 89, 0.3);
	color: #ffffff;
	margin-bottom: 1.25rem;
	box-sizing: border-box;
	transition: all 0.2s ease;
	&:focus {
		outline: none;
		border-color: #5c7c89;
		background: rgba(31, 73, 89, 0.5);
	}
	option {
		background: #1f4959;
		color: #ffffff;
	}
`;
export const ButtonRow = styled.div`
	display: flex;
	gap: 1rem;
	margin-top: 1.5rem;
`;
import styled from "styled-components";

export const PageWrapper = styled.div`
	max-width: 700px;
	margin: 0 auto;
	padding: 2rem 0;
`;

export const BackButton = styled.button`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	color: #5c7c89;
	background: none;
	border: none;
	margin-bottom: 1.5rem;
	cursor: pointer;
	transition: color 0.2s;
	font-size: 1rem;
	&:hover {
		color: #ffffff;
	}
`;

export const Header = styled.div`
	text-align: center;
	margin-bottom: 2rem;
`;

export const HeaderIcon = styled.div`
	width: 64px;
	height: 64px;
	background: linear-gradient(135deg, #1f4959 0%, #5c7c89 100%);
	border-radius: 16px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0 auto 1rem;
	box-shadow: 0 4px 12px rgba(31, 73, 89, 0.3);
`;


export const Title = styled.h1`
	font-size: 2rem;
	font-weight: 700;
	color: #ffffff;
	margin-bottom: 1rem;
`;

export const CategoryLabel = styled.label`
	display: block;
	font-size: 1rem;
	font-weight: 500;
	color: #ffffff;
	margin-bottom: 0.5rem;
`;
