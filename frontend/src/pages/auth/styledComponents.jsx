import styled from "styled-components";

export const DemoCredentials = styled.div`
	display: none;
`;

// Login page styles
export const LoginContainer = styled.div`
	min-height: 100vh;
	background: linear-gradient(135deg, #011425 0%, #1f4959 50%, #5c7c89 100%);
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 3rem 1rem;
`;

export const LoginWrapper = styled.div`
	width: 100%;
	max-width: 400px;
`;

export const LoginHeader = styled.div`
	text-align: center;
	margin-bottom: 2rem;
	animation: fade-in 0.7s;
`;

export const LoginIcon = styled.div`
	width: 64px;
	height: 64px;
	background: linear-gradient(135deg, #1f4959, #5c7c89);
	border-radius: 16px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0 auto 1rem auto;
`;

export const LoginTitle = styled.h1`
	font-size: 2rem;
	font-weight: bold;
	color: #ffffff;
	margin-bottom: 0.5rem;
`;

export const LoginSubtitle = styled.p`
	font-size: 1.1rem;
	color: #5c7c89;
	margin-bottom: 1.5rem;
`;

export const LoginDivider = styled.hr`
	border: none;
	border-top: 2px solid rgba(92, 124, 137, 0.3);
	margin: 2rem 0;
`;

export const LoginRegisterLink = styled.div`
	text-align: center;
	margin-top: 1.5rem;
	font-size: 1rem;
	color: #5c7c89;

	a {
		text-decoration: none;
		transition: all 0.2s ease;
		color: #ffffff;
		font-weight: 500;

		&:hover {
			color: #b0d4dd;
			text-decoration: underline;
		}
	}
`;

// Register page styles (mirroring Login styles)
export const RegisterContainer = styled.div`
	min-height: 100vh;
	background: linear-gradient(135deg, #011425 0%, #1f4959 50%, #5c7c89 100%);
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 3rem 1rem;
`;

export const RegisterWrapper = styled.div`
	width: 100%;
	max-width: 400px;
`;

export const RegisterHeader = styled.div`
	text-align: center;
	margin-bottom: 2rem;
	animation: fade-in 0.7s;
`;

export const RegisterIcon = styled.div`
	width: 64px;
	height: 64px;
	background: linear-gradient(135deg, #1f4959, #5c7c89);
	border-radius: 16px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0 auto 1rem auto;
`;

export const RegisterTitle = styled.h1`
	font-size: 2rem;
	font-weight: bold;
	color: #ffffff;
	margin-bottom: 0.5rem;
`;

export const RegisterSubtitle = styled.p`
	font-size: 1.1rem;
	color: #5c7c89;
	margin-bottom: 1.5rem;
`;

export const RegisterDivider = styled.hr`
	border: none;
	border-top: 2px solid rgba(92, 124, 137, 0.3);
	margin: 2rem 0;
`;

export const RegisterLoginLink = styled.div`
	text-align: center;
	margin-top: 1.5rem;
	font-size: 1rem;
	color: #5c7c89;

	a {
		text-decoration: none;
		transition: all 0.2s ease;
		color: #ffffff;
		font-weight: 500;

		&:hover {
			color: #b0d4dd;
			text-decoration: underline;
		}
	}
`;