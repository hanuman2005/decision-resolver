import styled from 'styled-components';

export const Container = styled.div`
	min-height: 100vh;
	background: linear-gradient(135deg, #011425 0%, #1f4959 50%, #5c7c89 100%);
	padding: clamp(1.5rem, 5vw, 3rem);
`;

export const Header = styled.div`
	text-align: center;
	margin-bottom: clamp(2rem, 4vw, 3rem);
	max-width: 800px;
	margin-left: auto;
	margin-right: auto;
`;

export const Badge = styled.div`
	display: inline-flex;
	align-items: center;
	gap: 0.5rem;
	padding: clamp(0.5rem, 1vw, 0.75rem) clamp(1rem, 2vw, 1.5rem);
	background: rgba(79, 70, 229, 0.2);
	color: #4f46e5;
	border-radius: 9999px;
	font-size: 0.875rem;
	font-weight: 600;
	margin-bottom: 1rem;

	& svg {
		width: clamp(1rem, 1.5vw, 1.25rem);
		height: clamp(1rem, 1.5vw, 1.25rem);
	}
`;

export const Title = styled.h1`
	font-size: clamp(2rem, 6vw, 3rem);
	font-weight: 700;
	color: #ffffff;
	margin-bottom: 0.75rem;
	text-shadow: 0 3px 12px rgba(0, 0, 0, 0.3);
`;

export const Subtitle = styled.p`
	font-size: clamp(0.95rem, 2vw, 1.1rem);
	color: #cbd5e1;
	line-height: 1.6;
`;

export const InsightsGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	gap: clamp(1rem, 2vw, 1.5rem);
	margin-bottom: clamp(2rem, 4vw, 3rem);
	max-width: 1200px;
	margin-left: auto;
	margin-right: auto;
`;

export const InsightCard = styled.div`
	background: rgba(31, 73, 89, 0.4);
	backdrop-filter: blur(20px);
	border-radius: 1rem;
	border: 2px solid rgba(92, 124, 137, 0.5);
	padding: clamp(1.25rem, 2.5vw, 1.75rem);
	transition: all 0.3s ease;
	box-shadow: 0 8px 32px rgba(1, 20, 37, 0.2);

	&:hover {
		background: rgba(31, 73, 89, 0.6);
		border-color: rgba(92, 124, 137, 0.7);
		transform: translateY(-4px);
	}
`;

export const InsightLabel = styled.div`
	font-size: 0.75rem;
	color: #94a3b8;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.5px;
	margin-bottom: 0.5rem;
`;

export const InsightValue = styled.div`
	font-size: clamp(1.1rem, 2vw, 1.5rem);
	font-weight: 700;
	color: #ffffff;
`;

export const SelectorSection = styled.div`
	background: rgba(31, 73, 89, 0.4);
	backdrop-filter: blur(20px);
	border-radius: 1rem;
	border: 2px solid rgba(92, 124, 137, 0.5);
	padding: clamp(1.5rem, 3vw, 2rem);
	margin-bottom: clamp(2rem, 4vw, 3rem);
	max-width: 1200px;
	margin-left: auto;
	margin-right: auto;
	box-shadow: 0 8px 32px rgba(1, 20, 37, 0.2);
`;

export const SelectorTitle = styled.h3`
	font-weight: 700;
	color: #ffffff;
	margin-bottom: 1.5rem;
	font-size: clamp(1rem, 2vw, 1.25rem);
`;

export const ButtonGroup = styled.div`
	display: flex;
	gap: 1rem;
	flex-wrap: wrap;
`;

export const DecisionButton = styled.button`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	padding: clamp(0.75rem, 1.5vw, 1rem) clamp(1.25rem, 2vw, 1.75rem);
	border-radius: 0.75rem;
	font-weight: 600;
	border: 2px solid;
	transition: all 0.3s ease;
	cursor: pointer;
	font-size: clamp(0.9rem, 1.5vw, 1rem);

	& svg {
		width: clamp(1.25rem, 1.5vw, 1.5rem);
		height: clamp(1.25rem, 1.5vw, 1.5rem);
	}

	${props => props.$active ? `
		background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
		color: #ffffff;
		border-color: #7c3aed;
		box-shadow: 0 8px 16px rgba(79, 70, 229, 0.3);
	` : `
		background: rgba(92, 124, 137, 0.2);
		color: #cbd5e1;
		border-color: rgba(92, 124, 137, 0.4);

		&:hover {
			background: rgba(92, 124, 137, 0.3);
			border-color: rgba(92, 124, 137, 0.6);
		}
	`}
`;

export const GenerateButton = styled.button`
	padding: clamp(1rem, 2vw, 1.5rem) clamp(2rem, 4vw, 3rem);
	background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
	color: #ffffff;
	font-weight: 700;
	border-radius: 0.75rem;
	border: none;
	box-shadow: 0 12px 32px rgba(79, 70, 229, 0.3);
	cursor: pointer;
	font-size: clamp(0.95rem, 1.5vw, 1.1rem);
	transition: all 0.3s ease;

	&:hover:not(:disabled) {
		box-shadow: 0 16px 40px rgba(79, 70, 229, 0.4);
		transform: translateY(-2px);
	}

	&:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
`;

export const ButtonContent = styled.div`
	display: flex;
	align-items: center;
	gap: 0.75rem;

	& svg {
		width: clamp(1.25rem, 2vw, 1.5rem);
		height: clamp(1.25rem, 2vw, 1.5rem);
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
`;

export const SuggestionsContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: clamp(1rem, 2vw, 1.5rem);
	margin-bottom: 6rem;
	max-width: 1200px;
	margin-left: auto;
	margin-right: auto;
`;

export const SuggestionCard = styled.div`
	background: rgba(31, 73, 89, 0.4);
	backdrop-filter: blur(20px);
	border-radius: 1rem;
	border: 2px solid rgba(92, 124, 137, 0.5);
	overflow: hidden;
	box-shadow: 0 8px 32px rgba(1, 20, 37, 0.2);
	transition: all 0.3s ease;

	${props => props.$selected ? `
		border-color: #4f46e5;
		box-shadow: 0 12px 40px rgba(79, 70, 229, 0.3);
	` : `
		&:hover {
			background: rgba(31, 73, 89, 0.6);
			border-color: rgba(92, 124, 137, 0.7);
		}
	`}
`;

export const ConfidenceBar = styled.div`
	height: 0.5rem;
	background: linear-gradient(90deg, #4f46e5 0%, #7c3aed 100%);
	width: ${props => props.$confidence}%;
	transition: width 0.3s ease;
`;

export const SuggestionContent = styled.div`
	padding: clamp(1.5rem, 3vw, 2rem);
`;

export const SuggestionHeader = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	gap: 1rem;
	margin-bottom: 1.5rem;
`;

export const SuggestionName = styled.h3`
	font-size: clamp(1.25rem, 2.5vw, 1.75rem);
	font-weight: 700;
	color: #ffffff;
`;

export const ConfidenceBadge = styled.span`
	display: inline-block;
	padding: clamp(0.375rem, 0.75vw, 0.5rem) clamp(0.75rem, 1.5vw, 1rem);
	background: rgba(79, 70, 229, 0.2);
	color: #4f46e5;
	font-size: 0.875rem;
	font-weight: 600;
	border-radius: 9999px;
	white-space: nowrap;
`;

export const SuggestionReason = styled.p`
	color: #cbd5e1;
	font-size: clamp(0.875rem, 1.5vw, 1rem);
	line-height: 1.5;
`;

export const DetailsGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
	gap: 1rem;
	margin-bottom: 1.5rem;
`;

export const DetailBox = styled.div`
	background: rgba(1, 20, 37, 0.5);
	border-radius: 0.75rem;
	padding: 1rem;
	border: 1px solid rgba(92, 124, 137, 0.3);
`;

export const DetailLabel = styled.div`
	font-size: 0.75rem;
	color: #94a3b8;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.5px;
	margin-bottom: 0.5rem;
`;

export const DetailValue = styled.div`
	font-size: clamp(0.95rem, 1.5vw, 1.1rem);
	font-weight: 600;
	color: #ffffff;
`;

export const FeaturesContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 0.75rem;
	margin-bottom: 1.5rem;
`;

export const FeatureBadge = styled.span`
	display: inline-flex;
	align-items: center;
	gap: 0.5rem;
	padding: 0.5rem 1rem;
	background: rgba(16, 185, 129, 0.2);
	color: #10b981;
	font-size: 0.875rem;
	border-radius: 9999px;
	border: 1px solid rgba(16, 185, 129, 0.5);

	& svg {
		width: 1rem;
		height: 1rem;
	}
`;

export const ReasoningBox = styled.div`
	background: linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%);
	border-radius: 0.75rem;
	padding: 1rem;
	border: 1px solid rgba(79, 70, 229, 0.3);
`;

export const ReasoningTitle = styled.div`
	font-weight: 600;
	color: #4f46e5;
	margin-bottom: 0.5rem;
`;

export const ReasoningText = styled.p`
	font-size: clamp(0.875rem, 1.5vw, 1rem);
	color: #cbd5e1;
	line-height: 1.6;
`;

export const ToggleButton = styled.button`
	flex-shrink: 0;
	padding: 0.75rem;
	border-radius: 0.75rem;
	border: none;
	cursor: pointer;
	transition: all 0.3s ease;
	background: rgba(92, 124, 137, 0.2);
	color: #cbd5e1;

	& svg {
		width: 1.5rem;
		height: 1.5rem;
	}

	${props => props.$selected ? `
		background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
		color: #ffffff;
		box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
	` : `
		&:hover {
			background: rgba(92, 124, 137, 0.4);
		}
	`}
`;

export const AcceptButtonContainer = styled.div`
	position: fixed;
	bottom: clamp(1.5rem, 3vw, 2rem);
	left: 50%;
	transform: translateX(-50%);
	z-index: 50;
`;

export const AcceptButton = styled.button`
	display: flex;
	align-items: center;
	gap: 0.75rem;
	padding: clamp(1rem, 2vw, 1.5rem) clamp(2rem, 4vw, 3rem);
	background: linear-gradient(135deg, #10b981 0%, #059669 100%);
	color: #ffffff;
	font-weight: 700;
	border-radius: 0.75rem;
	border: none;
	box-shadow: 0 20px 40px rgba(16, 185, 129, 0.3);
	cursor: pointer;
	font-size: clamp(0.95rem, 1.5vw, 1.1rem);
	transition: all 0.3s ease;

	& svg {
		width: clamp(1.25rem, 2vw, 1.5rem);
		height: clamp(1.25rem, 2vw, 1.5rem);
	}

	&:hover {
		box-shadow: 0 24px 48px rgba(16, 185, 129, 0.4);
		transform: translateY(-2px);
	}
`;

export const GuideSection = styled.div`
	margin-top: clamp(2rem, 4vw, 3rem);
	background: linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%);
	border: 2px solid rgba(79, 70, 229, 0.3);
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
	color: #4f46e5;
	margin-bottom: 1rem;
	font-size: clamp(1.1rem, 2vw, 1.5rem);

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

export const GuideCode = styled.code`
	background: rgba(1, 20, 37, 0.8);
	color: #4f46e5;
	padding: 0.25rem 0.5rem;
	border-radius: 0.375rem;
	font-family: 'Monaco', 'Courier New', monospace;
	font-size: 0.85em;
`;
