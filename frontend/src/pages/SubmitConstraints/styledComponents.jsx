export const SubmitConstraintsContainer = styled.div`
	max-width: 700px;
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
	text-align: center;
	margin-bottom: 2rem;
`;

export const Section = styled.section`
	margin-bottom: 2rem;
`;

export const InfoText = styled.div`
	color: #b0d4dd;
	font-size: 0.95rem;
	margin-bottom: 0.5rem;
`;

export const PreferencesCard = styled.div`
	background: rgba(92, 124, 137, 0.2);
	border: 1px solid rgba(92, 124, 137, 0.4);
	border-radius: 0.75rem;
	padding: 1rem 1.25rem;
	margin-bottom: 1.25rem;
`;

export const MustHavesCard = styled.div`
	background: rgba(92, 124, 137, 0.2);
	border: 1px solid rgba(92, 124, 137, 0.4);
	border-radius: 0.75rem;
	padding: 1rem 1.25rem;
	margin-bottom: 1.25rem;
`;

export const DealBreakersCard = styled.div`
	background: rgba(92, 124, 137, 0.2);
	border: 1px solid rgba(92, 124, 137, 0.4);
	border-radius: 0.75rem;
	padding: 1rem 1.25rem;
	margin-bottom: 1.25rem;
`;

export const InfoBox = styled.div`
	background: rgba(76, 175, 80, 0.1);
	border: 1px solid rgba(76, 175, 80, 0.3);
	border-radius: 0.75rem;
	padding: 1rem 1.25rem;
	margin-bottom: 1.25rem;
`;

export const CardHeader = styled.div`
	display: flex;
	align-items: center;
	gap: 0.75rem;
	margin-bottom: 1rem;
	svg {
		color: #5c7c89;
		flex-shrink: 0;
	}
`;

export const CardInputs = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	margin-bottom: 0.5rem;
`;

export const CardOptions = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
	margin-bottom: 0.5rem;
`;

export const CardInputGroup = styled.div`
	display: flex;
	align-items: flex-end;
	gap: 0.75rem;
	margin-bottom: 1rem;
	button {
		white-space: nowrap;
		padding: 0.6rem 1.25rem;
	}
`;

export const CardTags = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 0.5rem;
	margin-top: 1rem;
	padding-top: 0.5rem;
`;

export const CardTag = styled.span`
	background: rgba(0, 150, 136, 0.2);
	color: #4db8aa;
	border-radius: 0.5rem;
	padding: 0.2rem 0.75rem;
	font-size: 0.95rem;
	margin-right: 0.25rem;
	border: 1px solid rgba(0, 150, 136, 0.3);
`;

export const CardTagRemove = styled.button`
	background: none;
	border: none;
	color: #e53e3e;
	font-size: 1rem;
	cursor: pointer;
	margin-left: 0.5rem;
	transition: color 0.2s;
	&:hover {
		color: #ff6b6b;
	}
`;

export const CardInfo = styled.div`
	color: #b0d4dd;
	font-size: 0.95rem;
	margin-top: 0.5rem;
`;

export const ActionsRow = styled.div`
	display: flex;
	gap: 1rem;
	margin-top: 1.5rem;
`;
import styled from "styled-components";

export const Title = styled.h1`
	font-size: 2rem;
	font-weight: bold;
	color: #ffffff;
	margin-bottom: 0.5rem;
`;

export const SubTitle = styled.p`
	color: #b0d4dd;
	font-size: 1.1rem;
	margin-bottom: 0.5rem;
`;

export const CardTitle = styled.h3`
	font-size: 1.15rem;
	font-weight: 600;
	color: #4db8aa;
	margin: 0;
`;

export const CardSubText = styled.p`
	color: #b0d4dd;
	font-size: 0.98rem;
	margin: 0;
`;

export const FormBox = styled.form`
	background: rgba(31, 73, 89, 0.4);
	backdrop-filter: blur(20px);
	border: 1px solid rgba(92, 124, 137, 0.4);
	border-radius: 12px;
	box-shadow: 0 8px 32px rgba(1, 20, 37, 0.3);
	padding: 2rem;
	margin-bottom: 2rem;
`;

export const BudgetCard = styled.div`
	margin-bottom: 2rem;
`;

export const DietaryCard = styled.div`
	margin-bottom: 2rem;
`;
