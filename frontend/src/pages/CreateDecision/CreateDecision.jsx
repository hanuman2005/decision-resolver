import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, X, Target } from 'lucide-react';
import decisionService from '../../services/decisionService';
import Card from '../../components/common/Card.jsx';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import toast from 'react-hot-toast';
import {
  CreateDecisionContainer,
  PageWrapper,
  BackButton,
  Header,
  HeaderIcon,
  Title,
  Subtitle,
  SectionTitle,
  CategoryLabel,
  CategoryRequired,
  CategorySelect,
  OptionFormBox,
  OptionTagsLabel,
  OptionTagsInput,
  OptionTagsHelp,
  OptionList,
  OptionListItem,
  OptionName,
  OptionPrice,
  OptionTag,
  OptionTagRow,
  RemoveOptionButton,
  OptionError,
  InfoBox,
  InfoTitle,
  InfoList,
  InfoListItem,
  InfoListNumber,
  ButtonRow
} from './styledComponents.jsx';

/**
 * Create Decision Page
 * Form to create a new decision session
 */

const CreateDecision = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  
  // Get template from sessionStorage (stored by DecisionTemplates page)
  const [template, setTemplate] = useState(null);
  
  useEffect(() => {
    const storedTemplate = sessionStorage.getItem('selectedTemplate');
    if (storedTemplate) {
      try {
        setTemplate(JSON.parse(storedTemplate));
        // Clear sessionStorage after retrieving
        sessionStorage.removeItem('selectedTemplate');
      } catch (error) {
        // Error parsing template - continue without it
      }
    }
  }, []);
  
  const [formData, setFormData] = useState({
    title: '',
    category: 'food',
    options: [],
  });
  
  // Update form data when template is loaded
  useEffect(() => {
    if (template) {
      setFormData({
        title: template.name || '',
        category: template.category || 'food',
        options: template.options ? template.options.map(opt => ({
          name: opt.name || '',
          price: opt.price || '',
          tags: typeof opt.tags === 'string' ? opt.tags : (Array.isArray(opt.tags) ? opt.tags.join(', ') : '')
        })) : [],
      });
    }
  }, [template]);
  
  const [currentOption, setCurrentOption] = useState({
    name: '',
    price: '',
    tags: '',
  });
  const [errors, setErrors] = useState({});

  const categories = [
    { value: 'food', label: '🍽️ Food & Dining' },
    { value: 'activity', label: '🎯 Activity' },
    { value: 'meeting', label: '📅 Meeting Time' },
    { value: 'movie', label: '🎬 Movie' },
    { value: 'travel', label: '✈️ Travel' },
    { value: 'shopping', label: '🛍️ Shopping' },
    { value: 'other', label: '📌 Other' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleOptionChange = (e) => {
    const { name, value } = e.target;
    setCurrentOption((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOption = () => {
    if (!currentOption.name.trim()) {
      toast.error('Option name is required');
      return;
    }

    const newOption = {
      name: currentOption.name.trim(),
      price: currentOption.price ? parseFloat(currentOption.price) : 0,
      tags: currentOption.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    setFormData((prev) => ({
      ...prev,
      options: [...prev.options, newOption],
    }));

    setCurrentOption({ name: '', price: '', tags: '' });
    toast.success('Option added');
  };

  const handleRemoveOption = (index) => {
    setFormData((prev) => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Decision title is required';
    }

    if (formData.options.length === 0) {
      newErrors.options = 'Add at least one option';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      // Format options with tags as array
      const formattedOptions = formData.options.map(opt => {
        const option = {
          name: opt.name.trim(),
          tags: Array.isArray(opt.tags)
            ? opt.tags
            : opt.tags 
              ? opt.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
              : []
        };
        
        // Only add price if it has a value
        if (opt.price) {
          option.price = parseFloat(opt.price);
        }
        
        return option;
      });

      const response = await decisionService.createDecision({
        groupId,
        title: formData.title.trim(),
        category: formData.category,
        options: formattedOptions,
      });

      toast.success('Decision created successfully!');
      navigate(`/decisions/${response.data.data.decision._id}`);
    } catch (error) {
      toast.error(error.message || 'Failed to create decision');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CreateDecisionContainer>
      <PageWrapper>
        {/* Back Button */}
        <BackButton onClick={() => navigate(`/groups/${groupId}`)}>
          <ArrowLeft className="w-4 h-4" />
          Back to Group
        </BackButton>
        {/* Header */}
        <Header>
          <HeaderIcon>
            <Target className="w-8 h-8 text-white" />
          </HeaderIcon>
          <Title>Create New Decision</Title>
          <Subtitle>Set up a decision and let your group members submit their preferences</Subtitle>
        </Header>
        <form onSubmit={handleSubmit}>
          {/* Basic Info */}
          <Card>
            <SectionTitle>Decision Details</SectionTitle>
            <Input
              label="Decision Title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              error={errors.title}
              placeholder="e.g., Friday Night Dinner"
              required
            />
            <CategoryLabel>
              Category<CategoryRequired>*</CategoryRequired>
            </CategoryLabel>
            <CategorySelect
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </CategorySelect>
          </Card>
          {/* Options */}
          <Card>
            <SectionTitle>
              Options
              {errors.options && (
                <OptionError>({errors.options})</OptionError>
              )}
            </SectionTitle>
            {/* Add Option Form */}
            <OptionFormBox>
              <Input
                label="Option Name"
                type="text"
                name="name"
                value={currentOption.name}
                onChange={handleOptionChange}
                placeholder="e.g., Italian Bistro, Movie Night, etc."
                $nomargin={true}
              />
              <Input
                label="Price (Optional)"
                type="number"
                name="price"
                value={currentOption.price}
                onChange={handleOptionChange}
                placeholder="e.g., 25"
                $nomargin={true}
              />
              <OptionTagsLabel>Tags (Optional)</OptionTagsLabel>
              <OptionTagsInput
                type="text"
                name="tags"
                value={currentOption.tags}
                onChange={handleOptionChange}
                placeholder="e.g., italian, outdoor-seating, romantic"
              />
              <OptionTagsHelp>Separate multiple tags with commas</OptionTagsHelp>
              <Button
                type="button"
                variant="outline"
                onClick={handleAddOption}
                fullWidth
              >
                <Plus className="w-4 h-4" />
                Add Option
              </Button>
            </OptionFormBox>
            {/* Options List */}
            {formData.options.length > 0 && (
              <OptionList>
                {formData.options.map((option, index) => (
                  <OptionListItem key={index}>
                    <OptionName>{option.name}</OptionName>
                    {option.price > 0 && <OptionPrice>Price: ${option.price}</OptionPrice>}
                    {option.tags.length > 0 && (
                      <OptionTagRow>
                        {option.tags.map((tag, i) => (
                          <OptionTag key={i}>{tag}</OptionTag>
                        ))}
                      </OptionTagRow>
                    )}
                    <RemoveOptionButton type="button" onClick={() => handleRemoveOption(index)}>
                      <X className="w-5 h-5" />
                    </RemoveOptionButton>
                  </OptionListItem>
                ))}
              </OptionList>
            )}
          </Card>
          {/* Info Box */}
          <InfoBox>
            <InfoTitle>What happens next?</InfoTitle>
            <InfoList>
              <InfoListItem>
                <InfoListNumber>1.</InfoListNumber>
                <span>All group members will be able to submit their constraints</span>
              </InfoListItem>
              <InfoListItem>
                <InfoListNumber>2.</InfoListNumber>
                <span>Once everyone submits, our algorithm automatically finds the best option</span>
              </InfoListItem>
              <InfoListItem>
                <InfoListNumber>3.</InfoListNumber>
                <span>You'll see detailed reasoning for why the decision was made</span>
              </InfoListItem>
            </InfoList>
          </InfoBox>
          {/* Submit */}
          <ButtonRow>
            <Button
              type="button"
              variant="outline"
              fullWidth
              onClick={() => navigate(`/groups/${groupId}`)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={loading}
            >
              Create Decision
            </Button>
          </ButtonRow>
        </form>
      </PageWrapper>
    </CreateDecisionContainer>
  );
};

export default CreateDecision;