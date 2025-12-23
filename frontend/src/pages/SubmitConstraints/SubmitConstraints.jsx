import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, DollarSign, MapPin, Heart, AlertCircle } from 'lucide-react';
import decisionService from '../../services/decisionService';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Loading from '../../components/common/Loading';
import VoiceInputSystem from '../../components/common/VoiceInputSystem';
import toast from 'react-hot-toast';
import {
  SubmitConstraintsContainer,
  BackButton,
  Header,
  Section,
  FormBox,
  InfoText,
  BudgetCard,
  DietaryCard,
  PreferencesCard,
  MustHavesCard,
  DealBreakersCard,
  InfoBox,
  CardHeader,
  CardInputs,
  CardOptions,
  CardInputGroup,
  CardTags,
  CardTag,
  CardTagRemove,
  CardInfo,
  ActionsRow,
  Title,
  SubTitle,
  CardTitle,
  CardSubText
} from './styledComponents.jsx';

/**
 * Submit Constraints Page
 * Form for users to submit their preferences and constraints
 */

const SubmitConstraints = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [decision, setDecision] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    budget: { min: 0, max: 100, weight: 0.8 },
    preferences: [],
    dietaryRequirements: [],
    mustHaves: [],
    dealBreakers: [],
  });
  const [tempInput, setTempInput] = useState({
    preference: '',
    mustHave: '',
    dealBreaker: '',
  });

  const dietaryOptions = [
    'vegetarian',
    'vegan',
    'gluten-free',
    'dairy-free',
    'nut-free',
    'halal',
    'kosher',
  ];

  useEffect(() => {
    loadDecision();
  }, [id]);

  const loadDecision = async () => {
    try {
      const response = await decisionService.getDecisionById(id);
      setDecision(response.data.decision);
    } catch (error) {
      toast.error('Failed to load decision');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleVoiceConstraints = (voiceData) => {
    const { parsedConstraints } = voiceData;
    
    // Update budget if captured
    if (parsedConstraints.budgetMin && parsedConstraints.budgetMax) {
      setFormData((prev) => ({
        ...prev,
        budget: {
          ...prev.budget,
          min: parsedConstraints.budgetMin,
          max: parsedConstraints.budgetMax,
        },
      }));
      toast.success('Budget updated from voice');
    }

    // Update preferences if captured
    if (parsedConstraints.preferences && parsedConstraints.preferences.length > 0) {
      setFormData((prev) => ({
        ...prev,
        preferences: [
          ...new Set([...prev.preferences, ...parsedConstraints.preferences]),
        ],
      }));
      toast.success('Preferences updated from voice');
    }

    // Update dietary requirements if captured
    if (parsedConstraints.dietaryRestrictions && parsedConstraints.dietaryRestrictions.length > 0) {
      setFormData((prev) => ({
        ...prev,
        dietaryRequirements: [
          ...new Set([...prev.dietaryRequirements, ...parsedConstraints.dietaryRestrictions]),
        ],
      }));
      toast.success('Dietary requirements updated from voice');
    }
  };

  const handleBudgetChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      budget: {
        ...prev.budget,
        [name]: parseFloat(value) || 0,
      },
    }));
  };

  const handleDietaryToggle = (dietary) => {
    setFormData((prev) => ({
      ...prev,
      dietaryRequirements: prev.dietaryRequirements.includes(dietary)
        ? prev.dietaryRequirements.filter((d) => d !== dietary)
        : [...prev.dietaryRequirements, dietary],
    }));
  };

  const handleAddItem = (field, inputField) => {
    const value = tempInput[inputField].trim();
    if (!value) return;

    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], value],
    }));
    setTempInput((prev) => ({ ...prev, [inputField]: '' }));
  };

  const handleRemoveItem = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate budget
    if (formData.budget.min > formData.budget.max) {
      toast.error('Minimum budget cannot exceed maximum budget');
      return;
    }

    setSubmitting(true);
    try {
      await decisionService.submitConstraints(id, formData);
      toast.success('Constraints submitted successfully!');
      navigate(`/decisions/${id}`);
    } catch (error) {
      toast.error(error.message || 'Failed to submit constraints');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <Loading text="Loading..." />;
  }

  if (!decision) {
    return null;
  }

  return (
    <SubmitConstraintsContainer>
      {/* Back Button */}
      <BackButton
        onClick={() => navigate(`/decisions/${id}`)}
      >
        <ArrowLeft />
        Back to Decision
      </BackButton>

      {/* Header */}
      <Header>
        <Title>Submit Your Constraints</Title>
        <SubTitle>For: <strong>{decision.title}</strong></SubTitle>
        <SubTitle>Tell us your preferences and our algorithm will find the best option</SubTitle>
      </Header>

      {/* Voice Input System */}
      <Section>
        <VoiceInputSystem onConstraintsCaptured={handleVoiceConstraints} />
      </Section>

      <FormBox onSubmit={handleSubmit}>
        {/* Budget */}
        <BudgetCard>
          <CardHeader>
            <DollarSign />
            <CardTitle>Budget Range</CardTitle>
          </CardHeader>
          <CardInputs>
            <Input
              label="Minimum ($)"
              type="number"
              name="min"
              value={formData.budget.min}
              onChange={handleBudgetChange}
              min={0}
              step={1}
            />
            <Input
              label="Maximum ($)"
              type="number"
              name="max"
              value={formData.budget.max}
              onChange={handleBudgetChange}
              min={0}
              step={1}
            />
          </CardInputs>
          <CardInfo>
            Your budget: <strong>${formData.budget.min}</strong> - <strong>${formData.budget.max}</strong>
          </CardInfo>
        </BudgetCard>

        {/* Dietary Requirements */}
        <DietaryCard>
          <CardHeader>
            <Heart />
            <CardTitle>Dietary Requirements</CardTitle>
          </CardHeader>
          <CardOptions>
            {dietaryOptions.map((dietary) => (
              <Button
                key={dietary}
                type="button"
                variant={formData.dietaryRequirements.includes(dietary) ? "primary" : "outline"}
                onClick={() => handleDietaryToggle(dietary)}
                size="sm"
              >
                {dietary}
              </Button>
            ))}
          </CardOptions>
        </DietaryCard>

        {/* Preferences */}
        <PreferencesCard>
          <CardHeader>
            <MapPin />
            <CardTitle>Preferences</CardTitle>
          </CardHeader>
          <CardInputGroup>
            <Input
              type="text"
              value={tempInput.preference}
              onChange={(e) =>
                setTempInput((prev) => ({ ...prev, preference: e.target.value }))
              }
              placeholder="e.g., italian, outdoor-seating, quiet"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddItem('preferences', 'preference');
                }
              }}
            />
            <Button
              type="button"
              onClick={() => handleAddItem('preferences', 'preference')}
            >
              Add
            </Button>
          </CardInputGroup>
          {formData.preferences.length > 0 && (
            <CardTags>
              {formData.preferences.map((pref, index) => (
                <CardTag key={index}>
                  {pref}
                  <CardTagRemove
                    type="button"
                    onClick={() => handleRemoveItem('preferences', index)}
                  >
                    ×
                  </CardTagRemove>
                </CardTag>
              ))}
            </CardTags>
          )}
        </PreferencesCard>

        {/* Must-Haves */}
        <MustHavesCard>
          <CardHeader>
            <AlertCircle />
            <div>
              <CardTitle>Must-Haves</CardTitle>
              <CardSubText>Non-negotiable requirements</CardSubText>
            </div>
          </CardHeader>
          <CardInputGroup>
            <Input
              type="text"
              value={tempInput.mustHave}
              onChange={(e) =>
                setTempInput((prev) => ({ ...prev, mustHave: e.target.value }))
              }
              placeholder="e.g., parking, wifi, air-conditioning"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddItem('mustHaves', 'mustHave');
                }
              }}
            />
            <Button
              type="button"
              onClick={() => handleAddItem('mustHaves', 'mustHave')}
            >
              Add
            </Button>
          </CardInputGroup>
          {formData.mustHaves.length > 0 && (
            <CardTags>
              {formData.mustHaves.map((item, index) => (
                <CardTag key={index}>
                  ✓ {item}
                  <CardTagRemove
                    type="button"
                    onClick={() => handleRemoveItem('mustHaves', index)}
                  >
                    ×
                  </CardTagRemove>
                </CardTag>
              ))}
            </CardTags>
          )}
        </MustHavesCard>

        {/* Deal-Breakers */}
        <DealBreakersCard>
          <CardHeader>
            <AlertCircle />
            <div>
              <CardTitle>Deal-Breakers</CardTitle>
              <CardSubText>Absolute exclusions</CardSubText>
            </div>
          </CardHeader>
          <CardInputGroup>
            <Input
              type="text"
              value={tempInput.dealBreaker}
              onChange={(e) =>
                setTempInput((prev) => ({
                  ...prev,
                  dealBreaker: e.target.value,
                }))
              }
              placeholder="e.g., loud-music, smoking, no-parking"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddItem('dealBreakers', 'dealBreaker');
                }
              }}
            />
            <Button
              type="button"
              onClick={() => handleAddItem('dealBreakers', 'dealBreaker')}
            >
              Add
            </Button>
          </CardInputGroup>
          {formData.dealBreakers.length > 0 && (
            <CardTags>
              {formData.dealBreakers.map((item, index) => (
                <CardTag key={index}>
                  ✗ {item}
                  <CardTagRemove
                    type="button"
                    onClick={() => handleRemoveItem('dealBreakers', index)}
                  >
                    ×
                  </CardTagRemove>
                </CardTag>
              ))}
            </CardTags>
          )}
        </DealBreakersCard>

        {/* Info Box */}
        <InfoBox>
          <CardTitle>How it works</CardTitle>
          <CardSubText>
            Our algorithm considers all constraints from every group member and finds
            the option that best satisfies everyone. Your fairness score ensures you
            won't be consistently outvoted.
          </CardSubText>
        </InfoBox>
        {/* Submit */}
        <ActionsRow>
          <Button
            type="button"
            variant="outline"
            fullWidth
            onClick={() => navigate(`/decisions/${id}`)}
            disabled={submitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={submitting}
          >
            Submit Constraints
          </Button>
        </ActionsRow>
      </FormBox>
    </SubmitConstraintsContainer>
  );
};

export default SubmitConstraints;