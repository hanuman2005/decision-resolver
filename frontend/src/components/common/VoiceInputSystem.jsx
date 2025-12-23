import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, AlertCircle, CheckCircle } from 'lucide-react';
import styled from 'styled-components';

/**
 * Voice Input System for Constraints
 * Uses Web Speech API (built into modern browsers)
 * No external dependencies required!
 */

const Container = styled.div`
  width: 100%;
`;

const Card = styled.div`
  background: white;
  border-radius: 1rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 1.5rem;

  @media (max-width: 640px) {
    padding: 1.5rem;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  h2 {
    font-size: 1.875rem;
    font-weight: bold;
    color: #1e293b;
    margin: 0 0 0.75rem 0;
  }

  p {
    font-size: 1.125rem;
    color: #64748b;
  }
`;

const MicButton = styled.button`
  position: relative;
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  border: none;
  cursor: pointer;
  margin: 0 auto 1.5rem;

  background: ${props => props.$isListening 
    ? 'linear-gradient(135deg, #ef4444 0%, #ec4899 100%)'
    : 'linear-gradient(135deg, #3b82f6 0%, #a855f7 100%)'
  };

  color: white;

  ${props => props.$isListening && `
    animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  `}

  &:hover:not(:disabled) {
    ${props => !props.$isListening && 'transform: scale(1.05);'}
  }

  svg {
    width: 4rem;
    height: 4rem;
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.7;
    }
  }
`;

const PingRing = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 4px solid #fca5a5;
  animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;

  @keyframes ping {
    75%, 100% {
      transform: scale(2);
      opacity: 0;
    }
  }
`;

const StatusText = styled.p`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  text-align: center;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  span {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    svg {
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
  }
`;

const ConfidenceText = styled.p`
  font-size: 0.875rem;
  color: #64748b;
  text-align: center;
  margin-top: 0.5rem;
`;

const TranscriptBox = styled.div`
  background: #f1f5f9;
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  min-height: 120px;

  h3 {
    font-weight: 600;
    color: #475569;
    margin: 0 0 0.5rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    svg {
      width: 1.25rem;
      height: 1.25rem;
    }
  }

  p {
    font-size: 1.125rem;
    color: #1e293b;
    margin: 0;

    span {
      color: #94a3b8;
      font-style: italic;
    }
  }
`;

const ConstraintsBox = styled.div`
  background: linear-gradient(135deg, #dcfce7 0%, #d1fae5 100%);
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 2px solid #86efac;

  h3 {
    font-weight: 600;
    color: #166534;
    margin: 0 0 1rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    svg {
      width: 1.25rem;
      height: 1.25rem;
    }
  }
`;

const ConstraintsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const ConstraintItem = styled.div`
  background: white;
  border-radius: 0.5rem;
  padding: 0.75rem;

  .label {
    font-size: 0.875rem;
    color: #64748b;
    font-weight: 500;
  }

  .value {
    font-size: 1.125rem;
    font-weight: 600;
    color: #1e293b;
    margin-top: 0.25rem;
  }
`;

const ErrorBox = styled.div`
  text-align: center;
  padding: 3rem 1.5rem;

  svg {
    width: 4rem;
    height: 4rem;
    color: #ef4444;
    margin: 0 auto 1rem;
  }

  h3 {
    font-size: 1.25rem;
    font-weight: bold;
    color: #1e293b;
    margin: 0 0 0.5rem 0;
  }

  p {
    color: #64748b;
    margin: 0;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: center;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.95rem;

  ${props => {
    if (props.primary) {
      return `
        background: linear-gradient(135deg, #3b82f6 0%, #a855f7 100%);
        color: white;
        
        &:hover:not(:disabled) {
          box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);
        }
      `;
    }
    if (props.secondary) {
      return `
        background: #e2e8f0;
        color: #475569;
        
        &:hover:not(:disabled) {
          background: #cbd5e1;
        }
      `;
    }
  }}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ExamplesBox = styled.div`
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  padding: 1.5rem;

  h3 {
    font-weight: bold;
    color: #1e293b;
    margin: 0 0 1rem 0;
  }

  @media (max-width: 640px) {
    padding: 1rem;
  }
`;

const ExamplesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 0.75rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const ExampleItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 0.75rem;
  background: #eff6ff;
  border-radius: 0.5rem;

  svg {
    width: 1.25rem;
    height: 1.25rem;
    color: #2563eb;
    flex-shrink: 0;
    margin-top: 0.125rem;
  }

  span {
    font-size: 0.875rem;
    color: #334155;
  }
`;

const VoiceInputSystem = ({ onConstraintsCaptured }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const [error, setError] = useState('');
  const [parsedConstraints, setParsedConstraints] = useState({});
  const [confidence, setConfidence] = useState(0);

  const recognitionRef = useRef(null);

  useEffect(() => {
    // Check if browser supports Web Speech API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      setIsSupported(true);

      // Initialize speech recognition
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        let interim = '';
        let final = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const resultTranscript = event.results[i][0].transcript;
          const resultConfidence = event.results[i][0].confidence;

          if (event.results[i].isFinal) {
            final += resultTranscript + ' ';
            setConfidence(resultConfidence);
          } else {
            interim += resultTranscript;
          }
        }

        if (final) {
          setTranscript((prev) => prev + final);
          parseConstraints(final);
        }
        setInterimTranscript(interim);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setError(`Error: ${event.error}`);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
        setInterimTranscript('');
      };

      recognitionRef.current = recognition;
    } else {
      setIsSupported(false);
      setError('Speech recognition is not supported in this browser. Try Chrome or Edge.');
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const parseConstraints = (text) => {
    const lowerText = text.toLowerCase();
    const constraints = {};

    // Parse budget
    const budgetMatch = lowerText.match(
      /budget.*?(\$?\d+).*?(?:to|and|\-).*?(\$?\d+)/i
    );
    if (budgetMatch) {
      constraints.budgetMin = parseInt(budgetMatch[1].replace('$', ''));
      constraints.budgetMax = parseInt(budgetMatch[2].replace('$', ''));
    }

    // Parse preferences
    const prefKeywords = ['prefer', 'like', 'want', 'love'];
    prefKeywords.forEach((keyword) => {
      if (lowerText.includes(keyword)) {
        const words = lowerText
          .split(keyword)[1]
          ?.split(/[,.\s]+/)
          .slice(0, 5);
        if (words) {
          constraints.preferences = words.filter((w) => w.length > 2);
        }
      }
    });

    // Parse dietary restrictions
    const dietaryKeywords = [
      'vegetarian',
      'vegan',
      'gluten-free',
      'gluten free',
      'dairy-free',
      'dairy free',
      'kosher',
      'halal',
      'allergic',
    ];
    const foundDietary = dietaryKeywords.filter((kw) => lowerText.includes(kw));
    if (foundDietary.length > 0) {
      constraints.dietaryRestrictions = foundDietary;
    }

    // Parse location preferences
    if (
      lowerText.includes('near') ||
      lowerText.includes('close') ||
      lowerText.includes('within')
    ) {
      const distanceMatch = lowerText.match(/(\d+)\s*(mile|km|block)/i);
      if (distanceMatch) {
        constraints.maxDistance = `${distanceMatch[1]} ${distanceMatch[2]}`;
      }
    }

    // Parse time constraints
    if (lowerText.includes('minute') || lowerText.includes('hour')) {
      const timeMatch = lowerText.match(/(\d+)\s*(minute|hour)/i);
      if (timeMatch) {
        constraints.maxTime = `${timeMatch[1]} ${timeMatch[2]}`;
      }
    }

    setParsedConstraints((prev) => ({ ...prev, ...constraints }));
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setError('');
      setTranscript('');
      setInterimTranscript('');
      setParsedConstraints({});
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const clearTranscript = () => {
    setTranscript('');
    setInterimTranscript('');
    setParsedConstraints({});
    setConfidence(0);
  };

  const handleUseConstraints = () => {
    if (onConstraintsCaptured) {
      onConstraintsCaptured({
        transcript,
        parsedConstraints,
      });
    }
  };

  const examplePhrases = [
    'My budget is $20 to $50',
    'I prefer Italian food',
    "I'm vegetarian",
    'I want something within 2 miles',
    'I prefer quick service under 30 minutes',
    'I love sushi and Japanese cuisine',
  ];

  return (
    <Container>
      <Card>
        {!isSupported ? (
          <ErrorBox>
            <AlertCircle />
            <h3>Voice Input Not Supported</h3>
            <p>
              {error ||
                'Your browser does not support voice input. Please use Chrome, Edge, or Safari.'}
            </p>
          </ErrorBox>
        ) : (
          <>
            <Header>
              <h2>🎤 Voice Input</h2>
              <p>Speak your constraints - we'll parse them automatically</p>
            </Header>

            {/* Microphone Button */}
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <MicButton
                $isListening={isListening}
                onClick={isListening ? stopListening : startListening}
              >
                {isListening ? (
                  <>
                    <MicOff />
                    {isListening && <PingRing />}
                  </>
                ) : (
                  <Mic />
                )}
              </MicButton>
            </div>

            {/* Status */}
            <StatusText>
              {isListening ? (
                <span>
                  <Volume2 /> Listening... Speak now
                </span>
              ) : transcript ? (
                <span>
                  <CheckCircle style={{ color: '#10b981' }} /> Captured your input
                </span>
              ) : (
                'Click the microphone to start'
              )}
            </StatusText>
            {confidence > 0 && (
              <ConfidenceText>Confidence: {(confidence * 100).toFixed(0)}%</ConfidenceText>
            )}

            {/* Transcript Display */}
            {(transcript || interimTranscript) && (
              <TranscriptBox>
                <h3>
                  <Volume2 /> What you said:
                </h3>
                <p>
                  {transcript}
                  {interimTranscript && <span>{interimTranscript}</span>}
                </p>
              </TranscriptBox>
            )}

            {/* Parsed Constraints */}
            {Object.keys(parsedConstraints).length > 0 && (
              <ConstraintsBox>
                <h3>
                  <CheckCircle /> Parsed Constraints:
                </h3>
                <ConstraintsGrid>
                  {parsedConstraints.budgetMin && parsedConstraints.budgetMax && (
                    <ConstraintItem>
                      <div className="label">Budget Range</div>
                      <div className="value">
                        ${parsedConstraints.budgetMin} - ${parsedConstraints.budgetMax}
                      </div>
                    </ConstraintItem>
                  )}

                  {parsedConstraints.preferences && (
                    <ConstraintItem>
                      <div className="label">Preferences</div>
                      <div className="value">
                        {parsedConstraints.preferences.join(', ')}
                      </div>
                    </ConstraintItem>
                  )}

                  {parsedConstraints.dietaryRestrictions && (
                    <ConstraintItem>
                      <div className="label">Dietary</div>
                      <div className="value">
                        {parsedConstraints.dietaryRestrictions.join(', ')}
                      </div>
                    </ConstraintItem>
                  )}

                  {parsedConstraints.maxDistance && (
                    <ConstraintItem>
                      <div className="label">Max Distance</div>
                      <div className="value">{parsedConstraints.maxDistance}</div>
                    </ConstraintItem>
                  )}

                  {parsedConstraints.maxTime && (
                    <ConstraintItem>
                      <div className="label">Max Time</div>
                      <div className="value">{parsedConstraints.maxTime}</div>
                    </ConstraintItem>
                  )}
                </ConstraintsGrid>
              </ConstraintsBox>
            )}

            {/* Action Buttons */}
            {transcript && (
              <ActionButtons>
                <Button secondary onClick={clearTranscript}>
                  Clear
                </Button>
                <Button primary onClick={handleUseConstraints}>
                  Use These Constraints
                </Button>
              </ActionButtons>
            )}
          </>
        )}
      </Card>

      {/* Example Phrases */}
      <ExamplesBox>
        <h3>💡 Try saying phrases like:</h3>
        <ExamplesGrid>
          {examplePhrases.map((phrase, index) => (
            <ExampleItem key={index}>
              <Volume2 />
              <span>"{phrase}"</span>
            </ExampleItem>
          ))}
        </ExamplesGrid>
      </ExamplesBox>
    </Container>
  );
};

export default VoiceInputSystem;
