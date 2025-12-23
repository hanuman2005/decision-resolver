import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, ArrowLeft } from 'lucide-react';
import groupService from '../../services/groupService';
import Card from '../../components/common/Card.jsx';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import toast from 'react-hot-toast';
import {
  CreateGroupContainer,
  BackButton,
  Header,
  HeaderIcon,
  Title,
  Subtitle,
  FormInfoBox,
  InfoTitle,
  InfoList,
  InfoListItem,
  HelpText,
  DescriptionField,
  DescriptionLabel,
  DescriptionOptional,
  DescriptionTextarea,
  DescriptionError,
  DescriptionCharCount
} from './styledComponents.jsx';

const CreateGroup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) {
      newErrors.name = 'Group name is required';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Group name must be at least 3 characters';
    } else if (formData.name.length > 50) {
      newErrors.name = 'Group name cannot exceed 50 characters';
    }
    if (formData.description && formData.description.length > 200) {
      newErrors.description = 'Description cannot exceed 200 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const response = await groupService.createGroup(formData);
      toast.success('Group created successfully!');
      navigate(`/groups/${response.data.group._id}`);
    } catch (error) {
      toast.error(error.message || 'Failed to create group');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CreateGroupContainer>
      <BackButton onClick={() => navigate('/groups')}>
        <ArrowLeft />
        Back to Groups
      </BackButton>
      <Header>
        <HeaderIcon>
          <Users />
        </HeaderIcon>
        <Title>Create New Group</Title>
        <Subtitle>Start making decisions together with your friends and family</Subtitle>
      </Header>
      <Card>
        <form onSubmit={handleSubmit}>
          <Input
            label="Group Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            placeholder="e.g., Weekend Squad, Family Chat, Work Team"
            required
            Icon={Users}
          />
          <DescriptionField>
            <DescriptionLabel>
              Description <DescriptionOptional>(Optional)</DescriptionOptional>
            </DescriptionLabel>
            <DescriptionTextarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="What's this group about? (e.g., Planning weekend activities together)"
              rows={4}
              maxLength={200}
            />
            {errors.description && (
              <DescriptionError>{errors.description}</DescriptionError>
            )}
            <DescriptionCharCount>
              {formData.description.length}/200 characters
            </DescriptionCharCount>
          </DescriptionField>
          <FormInfoBox>
            <InfoTitle>What happens next?</InfoTitle>
            <InfoList>
              <InfoListItem>✓ You'll receive a unique invite code</InfoListItem>
              <InfoListItem>✓ Share the code with people you want to add</InfoListItem>
              <InfoListItem>✓ Start creating decisions together</InfoListItem>
            </InfoList>
          </FormInfoBox>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/groups')}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            loading={loading}
          >
            Create Group
          </Button>
        </form>
      </Card>
      <HelpText>
        Groups are free and unlimited. You can create as many as you need.
      </HelpText>
    </CreateGroupContainer>
  );
};

export default CreateGroup;