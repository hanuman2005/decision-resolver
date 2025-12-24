import styled from "styled-components";

export const NotFoundContainer = styled.div`
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background: linear-gradient(135deg, #011425 0%, #1f4959 50%, #5c7c89 100%);
	padding: 2rem;
`;

export const CenteredContent = styled.div`
	text-align: center;
`;

export const ErrorCode = styled.h1`
	font-size: 8rem;
	font-weight: 900;
	background: linear-gradient(90deg, #5c7c89, #b0d4dd);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	margin-bottom: 2rem;
`;

export const ErrorTitle = styled.h2`
	font-size: 2rem;
	font-weight: bold;
	color: #ffffff;
	margin-bottom: 1rem;
`;

export const ErrorText = styled.p`
	font-size: 1.2rem;
	color: #b0d4dd;
	margin-bottom: 2rem;
`;

export const ButtonRow = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;

	@media (min-width: 768px) {
		flex-direction: row;
		gap: 1.5rem;
	}

	a {
		width: 100%;
		@media (min-width: 768px) {
			width: auto;
		}
	}

	button {
		width: 100%;
		@media (min-width: 768px) {
			width: auto;
		}
	}
`;
