import styled from 'styled-components';

export const ProfileContainer = styled.div`
	max-width: 600px;
	margin: 1rem auto;
	background: rgba(31, 73, 89, 0.4);
	backdrop-filter: blur(20px);
	border-radius: 1.5rem;
	box-shadow: 0 8px 32px rgba(1, 20, 37, 0.3);
	border: 2px solid rgba(92, 124, 137, 0.5);
	padding: 2.5rem 2rem 2rem 2rem;
	display: flex;
	flex-direction: column;
	align-items: stretch;
	width: 100%;
	box-sizing: border-box;

	@media (max-width: 768px) {
		margin: 0.75rem;
		padding: 1.5rem 1.25rem 1.25rem 1.25rem;
		border-radius: 1rem;
	}

	@media (max-width: 640px) {
		margin: 0.5rem;
		padding: 1.25rem 1rem 1rem 1rem;
		border-radius: 0.875rem;
	}
`;

export const Header = styled.div`
	text-align: center;
	margin-bottom: 2rem;
`;

export const Title = styled.h2`
	font-size: clamp(1.5rem, 5vw, 2rem);
	font-weight: 700;
	color: #fff;
	margin-bottom: 0.25rem;
	word-wrap: break-word;
`;

export const Subtitle = styled.p`
	font-size: clamp(0.9rem, 3vw, 1.1rem);
	color: #d1d5db;
	margin-bottom: 0.5rem;
	word-wrap: break-word;
	overflow-wrap: break-word;
`;

export const InfoBox = styled.div`
	background: #f0fdf4;
	border: 1px solid #bbf7d0;
	border-radius: 0.75rem;
	padding: 1rem 1.25rem;
	margin-bottom: 1.25rem;
`;

export const ProfileCard = styled.div`
	background: #f9fafb;
	border: 1px solid #e5e7eb;
	border-radius: 0.75rem;
	padding: 1.5rem 1.25rem;
	margin-bottom: 1.5rem;
	overflow: hidden;
	box-sizing: border-box;

	@media (max-width: 768px) {
		padding: 1.25rem 1rem;
		margin-bottom: 1.25rem;
	}

	@media (max-width: 640px) {
		padding: 1rem 0.875rem;
		margin-bottom: 1rem;
	}
`;

export const ProfileRow = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
	margin-bottom: 1rem;
	flex-wrap: wrap;

	@media (max-width: 640px) {
		flex-direction: column;
		text-align: center;
		gap: 0.75rem;
	}
`;

export const ProfileAvatar = styled.img`
	width: 64px;
	height: 64px;
	border-radius: 50%;
	object-fit: cover;
	flex-shrink: 0;

	@media (max-width: 640px) {
		width: 56px;
		height: 56px;
	}
`;

export const ProfileName = styled.span`
	font-weight: 600;
	font-size: clamp(1rem, 3vw, 1.25rem);
	color: #222;
	display: block;
	word-break: break-word;
	word-wrap: break-word;
	overflow-wrap: break-word;
`;

export const ProfileEmail = styled.span`
	color: #888;
	font-size: clamp(0.85rem, 2.5vw, 1rem);
	display: block;
	word-break: break-word;
	word-wrap: break-word;
	overflow-wrap: break-word;
	margin-top: 0.25rem;
`;

export const ProfileSection = styled.section`
	margin-bottom: 2rem;
	display: flex;
	flex-direction: column;
	gap: 1rem;

	@media (max-width: 768px) {
		gap: 0.875rem;
	}

	@media (max-width: 640px) {
		gap: 0.75rem;
	}
`;

export const ProfileLabel = styled.span`
	font-weight: 500;
	color: #444;
	font-size: clamp(0.875rem, 2vw, 1rem);
	display: block;
	margin-bottom: 0.25rem;
	word-break: break-word;
`;

export const ProfileValue = styled.span`
	color: #009688;
	font-size: clamp(0.9rem, 2.5vw, 1rem);
	display: block;
	word-break: break-word;
	word-wrap: break-word;
	overflow-wrap: break-word;
`;

export const ProfileStatsGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 1rem;
	margin-top: 1.5rem;

	@media (max-width: 768px) {
		grid-template-columns: repeat(3, 1fr);
		gap: 0.875rem;
	}

	@media (max-width: 640px) {
		grid-template-columns: repeat(2, 1fr);
		gap: 0.75rem;

		& > :nth-child(3) {
			grid-column: 1 / -1;
		}
	}
`;

export const ProfileStatCard = styled.div`
	background: #e0f2f1;
	border-radius: 0.75rem;
	padding: 1rem;
	text-align: center;
	min-width: 0;

	@media (max-width: 768px) {
		padding: 0.875rem;
	}

	@media (max-width: 640px) {
		padding: 0.75rem;
	}
`;

export const ProfileStatTitle = styled.div`
	font-size: clamp(0.8rem, 2vw, 1rem);
	color: #009688;
	margin-bottom: 0.25rem;
	word-break: break-word;
	overflow-wrap: break-word;
`;

export const ProfileStatValue = styled.div`
	font-size: clamp(1.2rem, 4vw, 1.5rem);
	font-weight: 700;
	color: #222;
`;

export const ProfileEditActions = styled.div`
	display: flex;
	gap: 1rem;
	margin-top: 1.5rem;

	@media (max-width: 768px) {
		gap: 0.75rem;
	}

	@media (max-width: 640px) {
		flex-direction: column;
		gap: 0.75rem;
	}
`;

export const ProfileEditNote = styled.div`
	color: #e57373;
	background: #fff3e0;
	border-radius: 0.5rem;
	padding: 0.5rem 1rem;
	font-size: clamp(0.8rem, 2vw, 0.95rem);
	margin-bottom: 1rem;
	word-break: break-word;
	overflow-wrap: break-word;

	@media (max-width: 640px) {
		padding: 0.5rem 0.75rem;
	}
`;

