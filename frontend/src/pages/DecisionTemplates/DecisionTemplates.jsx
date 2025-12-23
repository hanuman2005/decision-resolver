import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Utensils, Film, MapPin, Calendar, Coffee, Briefcase, PartyPopper, Plus, Search, 
  Star, Clock, Users, Grid3x3, List, Filter, ArrowUpDown, Zap, TrendingUp, ChevronDown,
  Download, Share2, Heart, MessageSquare
} from 'lucide-react';
import {
  TemplatesContainer,
  MainContent,
  Header,
  Title,
  Subtitle,
  SearchContainer,
  SearchInput,
  CategoryButtons,
  CategoryButton,
  SectionHeader,
  TemplateGrid,
  TemplateCard,
  CardGradientBar,
  CardContent,
  IconBadge,
  CardHeader,
  CardTitle,
  PopularBadge,
  CardDescription,
  TagsContainer,
  Tag,
  CardFooter,
  InfoRow,
  UseButton,
  EmptyState,
  CTASection,
  ButtonGroup
} from './styledComponents.js';
import toast from 'react-hot-toast';

/**
 * Decision Templates System
 * Pre-built templates for common group decisions
 */

const templates = [
  {
    id: 'friday-dinner',
    name: 'Friday Night Dinner',
    description: 'Weekly dinner plans with friends',
    category: 'restaurant',
    icon: Utensils,
    color: 'from-orange-500 to-red-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    popular: true,
    estimatedTime: '5 mins',
    options: [
      { name: 'Italian Restaurant', metadata: { cuisine: 'Italian', priceRange: '$20-40' } },
      { name: 'Japanese Sushi', metadata: { cuisine: 'Japanese', priceRange: '$25-50' } },
      { name: 'American Diner', metadata: { cuisine: 'American', priceRange: '$15-30' } },
      { name: 'Mexican Cantina', metadata: { cuisine: 'Mexican', priceRange: '$18-35' } }
    ],
    defaultConstraints: {
      budgetMin: 20,
      budgetMax: 50,
      mustHaves: ['Good reviews', 'Parking available'],
      timePreference: 'evening'
    }
  },
  {
    id: 'movie-night',
    name: 'Movie Night',
    description: 'Weekend movie selection',
    category: 'entertainment',
    icon: Film,
    color: 'from-purple-500 to-pink-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    popular: true,
    estimatedTime: '3 mins',
    options: [
      { name: 'Action Thriller', metadata: { genre: 'Action', duration: '2h 20m' } },
      { name: 'Comedy', metadata: { genre: 'Comedy', duration: '1h 45m' } },
      { name: 'Sci-Fi Epic', metadata: { genre: 'Sci-Fi', duration: '2h 45m' } },
      { name: 'Romance', metadata: { genre: 'Romance', duration: '2h' } }
    ],
    defaultConstraints: {
      mustHaves: ['Good ratings', 'Available streaming'],
      preferences: ['Not too long', 'Family-friendly']
    }
  },
  {
    id: 'weekend-activity',
    name: 'Weekend Activity',
    description: 'Fun outdoor or indoor activities',
    category: 'activity',
    icon: MapPin,
    color: 'from-green-500 to-teal-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    popular: true,
    estimatedTime: '4 mins',
    options: [
      { name: 'Hiking Trail', metadata: { type: 'Outdoor', duration: '3-4 hours' } },
      { name: 'Museum Visit', metadata: { type: 'Indoor', duration: '2-3 hours' } },
      { name: 'Beach Day', metadata: { type: 'Outdoor', duration: 'Full day' } },
      { name: 'Bowling Alley', metadata: { type: 'Indoor', duration: '2 hours' } }
    ],
    defaultConstraints: {
      budgetMin: 0,
      budgetMax: 50,
      mustHaves: ['Weather appropriate', 'Accessible location']
    }
  },
  {
    id: 'team-lunch',
    name: 'Team Lunch',
    description: 'Office lunch coordination',
    category: 'restaurant',
    icon: Briefcase,
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    popular: false,
    estimatedTime: '3 mins',
    options: [
      { name: 'Fast Casual', metadata: { cuisine: 'Mixed', priceRange: '$10-15' } },
      { name: 'Salad Bar', metadata: { cuisine: 'Healthy', priceRange: '$12-18' } },
      { name: 'Pizza Place', metadata: { cuisine: 'Italian', priceRange: '$8-15' } },
      { name: 'Asian Fusion', metadata: { cuisine: 'Asian', priceRange: '$12-20' } }
    ],
    defaultConstraints: {
      budgetMin: 10,
      budgetMax: 20,
      mustHaves: ['Quick service', 'Near office', 'Under 30 minutes']
    }
  },
  {
    id: 'coffee-meetup',
    name: 'Coffee Meetup',
    description: 'Casual coffee shop meeting',
    category: 'cafe',
    icon: Coffee,
    color: 'from-amber-500 to-yellow-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    popular: false,
    estimatedTime: '2 mins',
    options: [
      { name: 'Local Cafe', metadata: { type: 'Independent', vibe: 'Cozy' } },
      { name: 'Starbucks', metadata: { type: 'Chain', vibe: 'Consistent' } },
      { name: 'Specialty Coffee', metadata: { type: 'Artisan', vibe: 'Hipster' } },
      { name: 'Tea House', metadata: { type: 'Alternative', vibe: 'Calm' } }
    ],
    defaultConstraints: {
      budgetMin: 5,
      budgetMax: 15,
      mustHaves: ['WiFi', 'Good seating', 'Quiet enough to talk']
    }
  },
  {
    id: 'meeting-time',
    name: 'Meeting Time',
    description: 'Schedule team meeting time',
    category: 'scheduling',
    icon: Calendar,
    color: 'from-cyan-500 to-blue-600',
    bgColor: 'bg-cyan-50',
    borderColor: 'border-cyan-200',
    popular: false,
    estimatedTime: '3 mins',
    options: [
      { name: 'Monday 9 AM', metadata: { day: 'Monday', time: '09:00' } },
      { name: 'Tuesday 2 PM', metadata: { day: 'Tuesday', time: '14:00' } },
      { name: 'Wednesday 10 AM', metadata: { day: 'Wednesday', time: '10:00' } },
      { name: 'Thursday 3 PM', metadata: { day: 'Thursday', time: '15:00' } }
    ],
    defaultConstraints: {
      mustHaves: ['No conflicts', 'At least 1 hour duration'],
      preferences: ['Morning preferred', 'Avoid Mondays']
    }
  },
  {
    id: 'birthday-venue',
    name: 'Birthday Party Venue',
    description: 'Celebration venue selection',
    category: 'event',
    icon: PartyPopper,
    color: 'from-pink-500 to-rose-600',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-200',
    popular: false,
    estimatedTime: '5 mins',
    options: [
      { name: 'Restaurant Private Room', metadata: { capacity: '20-30', type: 'Dining' } },
      { name: 'Event Space', metadata: { capacity: '50+', type: 'Rental' } },
      { name: 'Park Pavilion', metadata: { capacity: '30-40', type: 'Outdoor' } },
      { name: 'Home Party', metadata: { capacity: '15-25', type: 'Personal' } }
    ],
    defaultConstraints: {
      budgetMin: 100,
      budgetMax: 500,
      mustHaves: ['Good capacity', 'Available parking', 'Photography friendly']
    }
  }
];

// Styled Components


const DecisionTemplates = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [sortBy, setSortBy] = useState('popular'); // popular, newest, fastest
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('favoriteTemplates') || '[]');
    } catch {
      return [];
    }
  });

  const categories = [
    { id: 'all', name: 'All Templates', icon: Star },
    { id: 'restaurant', name: 'Restaurants', icon: Utensils },
    { id: 'entertainment', name: 'Entertainment', icon: Film },
    { id: 'activity', name: 'Activities', icon: MapPin },
    { id: 'cafe', name: 'Cafes', icon: Coffee },
    { id: 'scheduling', name: 'Scheduling', icon: Calendar },
    { id: 'event', name: 'Events', icon: PartyPopper }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort templates based on selected sort option
  const sortedTemplates = [...filteredTemplates].sort((a, b) => {
    if (sortBy === 'popular') {
      return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
    } else if (sortBy === 'fastest') {
      // Extract time in minutes
      const getMinutes = (timeStr) => {
        const num = parseInt(timeStr);
        return num;
      };
      return getMinutes(a.estimatedTime) - getMinutes(b.estimatedTime);
    }
    // newest - can be based on order in array
    return 0;
  });

  const popularTemplates = templates.filter(t => t.popular);

  const toggleFavorite = (templateId) => {
    try {
      const newFavorites = favorites.includes(templateId)
        ? favorites.filter(id => id !== templateId)
        : [...favorites, templateId];
      setFavorites(newFavorites);
      localStorage.setItem('favoriteTemplates', JSON.stringify(newFavorites));
      toast.success(newFavorites.includes(templateId) ? 'Added to favorites!' : 'Removed from favorites');
    } catch (error) {
      if (error.name === 'QuotaExceededError') {
        toast.error('Storage limit exceeded. Please clear some data.');
      } else {
        toast.error('Failed to save favorite. Please try again.');
      }
      console.error('Favorite toggle error:', error);
    }
  };

  const handleUseTemplate = (template) => {
    // Store template in sessionStorage for later use
    sessionStorage.setItem('selectedTemplate', JSON.stringify({
      name: template.name,
      description: template.description,
      category: template.category,
      options: template.options,
      color: template.color
    }));
    
    // Navigate to groups to select which group to create decision in
    navigate('/groups', { state: { message: 'Select a group to create a decision' } });
  };

  const TemplateCardComponent = ({ template }) => {
    const Icon = template.icon;
    const isFavorite = favorites.includes(template.id);
    const [gradStart, gradEnd] = template.color.replace('from-', '').replace('to-', '').split(' ');
    
    return (
      <TemplateCard 
        onClick={() => handleUseTemplate(template)}
        style={{ '--gradient': template.color, position: 'relative' }}
      >
        <div className="gradient-line" />
        
        {/* Card Action Buttons */}
        <div style={{
          position: 'absolute',
          top: '0.75rem',
          right: '0.75rem',
          display: 'flex',
          gap: '0.5rem',
          opacity: 0,
          transition: 'opacity 0.2s ease',
          pointerEvents: 'none'
        }}
        className="card-actions"
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(template.id);
            }}
            title="Add to favorites"
            style={{
              padding: '0.5rem',
              background: isFavorite ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              color: isFavorite ? '#ef4444' : '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.3)'}
            onMouseLeave={(e) => e.currentTarget.style.background = isFavorite ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.1)'}
          >
            <Heart className="w-4 h-4" style={{ fill: isFavorite ? '#ef4444' : 'none' }} />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              toast.info('Share feature coming soon!');
            }}
            title="Share template"
            style={{
              padding: '0.5rem',
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
          >
            <MessageSquare className="w-4 h-4" />
          </button>
        </div>
        
        <div className="content">
          <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <IconBadge>
              <Icon />
            </IconBadge>
            {template.popular && (
              <PopularBadge>
                <Star size={12} style={{ fill: '#fcd34d' }} />
                Popular
              </PopularBadge>
            )}
          </div>

          <Title>{template.name}</Title>
          <CardDescription>{template.description}</CardDescription>

          <TagsContainer>
            {template.options.slice(0, 3).map((option, idx) => (
              <Tag key={idx}>{option.name}</Tag>
            ))}
            {template.options.length > 3 && (
              <Tag>+{template.options.length - 3} more</Tag>
            )}
          </TagsContainer>

          <CardFooter>
            <InfoRow>
              <Clock className="w-4 h-4" />
              {template.estimatedTime}
            </InfoRow>
            <UseButton onClick={() => handleUseTemplate(template)}>
              Use Template
            </UseButton>
          </CardFooter>
        </div>
        
        <style>{`
          .template-card:hover .card-actions {
            opacity: 1;
            pointerEvents: auto;
          }
        `}</style>
      </TemplateCard>
    );
  };

  return (
    <TemplatesContainer>
      <MainContent>
        {/* Enhanced Header with Controls */}
        <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1>📋 Decision Templates</h1>
            <p>Start with a template and customize it to your needs</p>
          </div>
          
          {/* Header Action Icons */}
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              title={`Switch to ${viewMode === 'grid' ? 'list' : 'grid'} view`}
              style={{
                padding: '0.75rem',
                background: 'rgba(59, 130, 246, 0.1)',
                border: '2px solid rgba(59, 130, 246, 0.2)',
                borderRadius: '0.75rem',
                cursor: 'pointer',
                color: '#3b82f6',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s ease',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(59, 130, 246, 0.2)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid3x3 className="w-4 h-4" />}
              {viewMode === 'grid' ? 'List' : 'Grid'}
            </button>
            
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowFilters(!showFilters)}
                title="Filter and sort"
                style={{
                  padding: '0.75rem',
                  background: showFilters ? 'rgba(34, 197, 94, 0.2)' : 'rgba(107, 114, 128, 0.1)',
                  border: showFilters ? '2px solid rgba(34, 197, 94, 0.3)' : '2px solid rgba(107, 114, 128, 0.2)',
                  borderRadius: '0.75rem',
                  cursor: 'pointer',
                  color: showFilters ? '#22c55e' : '#6b7280',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s ease',
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }}
                onMouseEnter={(e) => {
                  if (!showFilters) {
                    e.currentTarget.style.background = 'rgba(107, 114, 128, 0.2)';
                  }
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  if (!showFilters) {
                    e.currentTarget.style.background = 'rgba(107, 114, 128, 0.1)';
                  }
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <Filter className="w-4 h-4" />
                Filters
                <ChevronDown className="w-4 h-4" style={{ transition: 'transform 0.2s', transform: showFilters ? 'rotate(180deg)' : 'rotate(0deg)' }} />
              </button>
              
              {/* Dropdown Menu */}
              {showFilters && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: '0',
                  marginTop: '0.5rem',
                  background: 'white',
                  border: '2px solid #e5e7eb',
                  borderRadius: '0.75rem',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                  zIndex: 10,
                  minWidth: '200px',
                  overflow: 'hidden'
                }}>
                  <div style={{ padding: '0.75rem', borderBottom: '1px solid #f3f4f6' }}>
                    <p style={{ fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', margin: '0 0 0.5rem 0' }}>SORT BY</p>
                    {['popular', 'fastest', 'newest'].map(option => (
                      <button
                        key={option}
                        onClick={() => {
                          setSortBy(option);
                          setShowFilters(false);
                        }}
                        style={{
                          display: 'block',
                          width: '100%',
                          padding: '0.5rem 0.75rem',
                          background: sortBy === option ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                          border: 'none',
                          textAlign: 'left',
                          cursor: 'pointer',
                          color: sortBy === option ? '#3b82f6' : '#374151',
                          fontSize: '0.875rem',
                          borderRadius: '0.5rem',
                          margin: '0.25rem 0',
                          transition: 'all 0.2s ease',
                          fontWeight: sortBy === option ? '600' : '400'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)'}
                        onMouseLeave={(e) => {
                          if (sortBy !== option) e.currentTarget.style.background = 'transparent';
                        }}
                      >
                        {option === 'popular' && <TrendingUp className="w-4 h-4" style={{ display: 'inline', marginRight: '0.5rem' }} />}
                        {option === 'fastest' && <Zap className="w-4 h-4" style={{ display: 'inline', marginRight: '0.5rem' }} />}
                        {option === 'newest' && <Clock className="w-4 h-4" style={{ display: 'inline', marginRight: '0.5rem' }} />}
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <button
              title="Share template"
              style={{
                padding: '0.75rem',
                background: 'rgba(168, 85, 247, 0.1)',
                border: '2px solid rgba(168, 85, 247, 0.2)',
                borderRadius: '0.75rem',
                cursor: 'pointer',
                color: '#a855f7',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(168, 85, 247, 0.2)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(168, 85, 247, 0.1)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <Share2 className="w-4 h-4" />
            </button>
            
            <button
              title="Download templates"
              style={{
                padding: '0.75rem',
                background: 'rgba(14, 165, 233, 0.1)',
                border: '2px solid rgba(14, 165, 233, 0.2)',
                borderRadius: '0.75rem',
                cursor: 'pointer',
                color: '#0ea5e9',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(14, 165, 233, 0.2)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(14, 165, 233, 0.1)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </Header>

        {/* Enhanced Search Bar */}
        <SearchContainer style={{ marginBottom: '1.5rem' }}>
          <div style={{ position: 'relative', display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: '1' }}>
              <Search 
                style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '1.25rem',
                  height: '1.25rem',
                  color: '#94a3b8'
                }}
              />
              <SearchInput
                type="text"
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </SearchContainer>

        {/* Category Filters */}
        <CategoryButtons style={{ marginBottom: '2rem' }}>
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <CategoryButton
                key={category.id}
                $active={selectedCategory === category.id}
                onClick={() => setSelectedCategory(category.id)}
              >
                <Icon className="w-4 h-4" />
                {category.name}
              </CategoryButton>
            );
          })}
        </CategoryButtons>

        {/* Popular Templates */}
        {selectedCategory === 'all' && searchQuery === '' && (
          <SectionHeader>
            <h2>
              <Star size={24} style={{ fill: '#eab308', color: '#eab308' }} />
              Popular Templates
            </h2>
            <TemplateGrid>
              {popularTemplates.map((template) => (
                <TemplateCardComponent key={template.id} template={template} />
              ))}
            </TemplateGrid>
          </SectionHeader>
        )}

        {/* All Templates Grid */}
        <SectionHeader>
          <h2>{searchQuery ? 'Search Results' : 'All Templates'}</h2>
          
          {filteredTemplates.length === 0 ? (
            <EmptyState>
              <Search />
              <h3>No templates found</h3>
              <p>Try adjusting your search or category filter</p>
            </EmptyState>
          ) : (
            <div style={{
              display: viewMode === 'grid' ? 'grid' : 'flex',
              gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(300px, 1fr))' : 'unset',
              flexDirection: viewMode === 'list' ? 'column' : 'row',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              {sortedTemplates.map((template) => (
                <div
                  key={template.id}
                  style={{
                    minWidth: viewMode === 'list' ? '100%' : 'auto',
                    opacity: 1,
                    animation: 'fadeIn 0.3s ease'
                  }}
                  className="template-card"
                >
                  {viewMode === 'grid' ? (
                    <TemplateCardComponent template={template} />
                  ) : (
                    // List view variant
                    <div style={{
                      display: 'flex',
                      gap: '1.5rem',
                      padding: '1.5rem',
                      background: 'white',
                      borderRadius: '0.75rem',
                      border: '1px solid #e5e7eb',
                      transition: 'all 0.2s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#f9fafb';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'white';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                    >
                      {/* Icon */}
                      <div style={{
                        width: '4rem',
                        height: '4rem',
                        borderRadius: '0.75rem',
                        background: `linear-gradient(135deg, #3b82f6, #1f2937)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        flexShrink: 0
                      }}>
                        {React.createElement(template.icon, { size: 24 })}
                      </div>
                      
                      {/* Content */}
                      <div style={{ flex: '1', minWidth: '0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                          <h3 style={{ margin: '0', fontSize: '1rem', fontWeight: '600', color: '#1f2937' }}>
                            {template.name}
                          </h3>
                          {template.popular && (
                            <div style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.25rem',
                              padding: '0.25rem 0.75rem',
                              background: '#fef3c7',
                              color: '#92400e',
                              borderRadius: '9999px',
                              fontSize: '0.75rem',
                              fontWeight: '600'
                            }}>
                              <Star size={12} style={{ fill: '#f59e0b' }} />
                              Popular
                            </div>
                          )}
                        </div>
                        <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.875rem', color: '#6b7280' }}>
                          {template.description}
                        </p>
                        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                          {template.options.slice(0, 2).map((option, idx) => (
                            <span key={idx} style={{
                              fontSize: '0.75rem',
                              padding: '0.25rem 0.75rem',
                              background: '#f3f4f6',
                              borderRadius: '0.5rem',
                              color: '#4b5563'
                            }}>
                              {option.name}
                            </span>
                          ))}
                          {template.options.length > 2 && (
                            <span style={{
                              fontSize: '0.75rem',
                              padding: '0.25rem 0.75rem',
                              background: '#f3f4f6',
                              borderRadius: '0.5rem',
                              color: '#4b5563'
                            }}>
                              +{template.options.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Right Side Actions */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.75rem' }}>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(template.id);
                            }}
                            style={{
                              padding: '0.5rem',
                              background: favorites.includes(template.id) ? 'rgba(239, 68, 68, 0.1)' : 'transparent',
                              border: '1px solid #e5e7eb',
                              borderRadius: '0.5rem',
                              cursor: 'pointer',
                              color: favorites.includes(template.id) ? '#ef4444' : '#6b7280',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
                            onMouseLeave={(e) => e.currentTarget.style.background = favorites.includes(template.id) ? 'rgba(239, 68, 68, 0.1)' : 'transparent'}
                          >
                            <Heart className="w-4 h-4" style={{ fill: favorites.includes(template.id) ? '#ef4444' : 'none' }} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toast.info('Share feature coming soon!');
                            }}
                            style={{
                              padding: '0.5rem',
                              background: 'transparent',
                              border: '1px solid #e5e7eb',
                              borderRadius: '0.5rem',
                              cursor: 'pointer',
                              color: '#6b7280',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = '#f3f4f6'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                          >
                            <Share2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
                          <Clock className="w-4 h-4" />
                          {template.estimatedTime}
                        </div>
                        <button
                          onClick={() => handleUseTemplate(template)}
                          style={{
                            padding: '0.5rem 1rem',
                            background: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.5rem',
                            cursor: 'pointer',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#2563eb';
                            e.currentTarget.style.transform = 'scale(1.05)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = '#3b82f6';
                            e.currentTarget.style.transform = 'scale(1)';
                          }}
                        >
                          Use
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </SectionHeader>

        {/* Create Custom Decision CTA */}
        <CTASection>
          <h3>Don't see what you need?</h3>
          <p>Create a custom decision from scratch or save your own template</p>
          <ButtonGroup>
            <button onClick={() => navigate('/groups')}>
              <Plus size={20} />
              Create Custom Decision
            </button>
            <button disabled style={{ opacity: 0.7, cursor: 'not-allowed' }}>
              Save as Template
            </button>
          </ButtonGroup>
        </CTASection>
      </MainContent>
      
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .template-card:hover .card-actions {
          opacity: 1;
          pointer-events: auto;
        }
      `}</style>
    </TemplatesContainer>
  );
};

export default DecisionTemplates;
