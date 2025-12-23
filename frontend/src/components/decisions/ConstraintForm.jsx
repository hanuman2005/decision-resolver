import styled from 'styled-components';
import { useState } from 'react';
import { DollarSign, MapPin, Heart, AlertCircle } from 'lucide-react';
import Input from '../common/Input';
import Button from '../common/Button';
import Card from '../common/Card';


// Styled-components (in-file for small component)
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;
const IconBox = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.75rem;
`;
const DietaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 0.75rem;
`;
const DietaryButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 2px solid;
  transition: all 0.2s;
  cursor: pointer;
  text-align: center;
  background-color: ${({ selected }) => (selected ? '#dcfce7' : 'white')};
  border-color: ${({ selected }) => (selected ? '#16a34a' : '#d1d5db')};
  color: ${({ selected }) => (selected ? '#15803d' : '#374151')};
  font-weight: ${({ selected }) => (selected ? 500 : 400)};
`;
const TagContainer = styled.div`
  margin-top: 0.75rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;
const Tag = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  background-color: #dbeafe;
  color: #0369a1;
`;
const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #1e40af;
  cursor: pointer;
  font-size: 1.25rem;
  line-height: 1;
`;
const Flex = styled.div`
  display: flex;
  gap: 0.5rem;
`;

function ConstraintForm({ onSubmit, loading = false }) {
  const [formData, setFormData] = useState({
    budget: { min: 0, max: 100, weight: 0.8 },
    preferences: [],
    dietaryRequirements: [],
    mustHaves: [],
    dealBreakers: [],
  });
  const [tempInput, setTempInput] = useState({ preference: '', mustHave: '', dealBreaker: '' });

  const dietaryOptions = [
    'vegetarian',
    'vegan',
    'gluten-free',
    'dairy-free',
    'nut-free',
    'halal',
    'kosher',
  ];

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
    setFormData((prev) => ({ ...prev, [field]: [...prev[field], value] }));
    setTempInput((prev) => ({ ...prev, [inputField]: '' }));
  };
  const handleRemoveItem = (field, index) => {
    setFormData((prev) => ({ ...prev, [field]: prev[field].filter((_, i) => i !== index) }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* Budget */}
      <Card>
        <SectionHeader>
          <IconBox style={{ backgroundColor: '#dbeafe' }}>
            <DollarSign style={{ width: '1.25rem', height: '1.25rem', color: '#0ea5e9' }} />
          </IconBox>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Budget Range</h3>
        </SectionHeader>
        <DietaryGrid style={{ gridTemplateColumns: '1fr 1fr' }}>
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
        </DietaryGrid>
      </Card>

      {/* Dietary Requirements */}
      <Card>
        <SectionHeader>
          <IconBox style={{ backgroundColor: '#dcfce7' }}>
            <Heart style={{ width: '1.25rem', height: '1.25rem', color: '#16a34a' }} />
          </IconBox>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>
            Dietary Requirements
          </h3>
        </SectionHeader>
        <DietaryGrid>
          {dietaryOptions.map((dietary) => (
            <DietaryButton
              key={dietary}
              type="button"
              selected={formData.dietaryRequirements.includes(dietary)}
              onClick={() => handleDietaryToggle(dietary)}
            >
              {dietary}
            </DietaryButton>
          ))}
        </DietaryGrid>
      </Card>

      {/* Preferences */}
      <Card>
        <SectionHeader>
          <IconBox style={{ backgroundColor: '#dbeafe' }}>
            <MapPin style={{ width: '1.25rem', height: '1.25rem', color: '#0ea5e9' }} />
          </IconBox>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Preferences</h3>
        </SectionHeader>
        <Flex>
          <Input
            type="text"
            value={tempInput.preference}
            onChange={e => setTempInput((prev) => ({ ...prev, preference: e.target.value }))}
            placeholder="e.g., italian, outdoor-seating"
          />
          <Button type="button" onClick={() => handleAddItem('preferences', 'preference')}>
            Add
          </Button>
        </Flex>
        {formData.preferences.length > 0 && (
          <TagContainer>
            {formData.preferences.map((pref, index) => (
              <Tag key={index}>
                {pref}
                <RemoveButton type="button" onClick={() => handleRemoveItem('preferences', index)}>
                  ×
                </RemoveButton>
              </Tag>
            ))}
          </TagContainer>
        )}
      </Card>

      {/* Submit Button */}
      <Button type="submit" variant="primary" size="lg" loading={loading} fullWidth>
        Submit Constraints
      </Button>
    </Form>
  );
}

export default ConstraintForm;
