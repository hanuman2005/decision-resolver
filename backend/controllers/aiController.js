const Group = require("../models/Group");

/**
 * Generate AI suggestions for a decision
 * @desc Generate AI-powered suggestions based on group data and decision type
 * @route POST /api/ai/suggestions
 * @access Private
 */
exports.generateSuggestions = async (req, res) => {
  try {
    const userId = req.user._id;
    const { decisionType, groupData } = req.body;

    if (!decisionType) {
      return res.status(400).json({ message: "Decision type is required" });
    }

    // Get group preferences from database if available
    let groupPreferences = {};
    if (groupData?._id) {
      const group = await Group.findById(groupData._id).lean();
      groupPreferences = group?.preferences || {};
    }

    // Generate AI suggestions based on actual group preferences
    let suggestions = [];

    if (decisionType === "restaurant") {
      const cuisines = groupPreferences.cuisines || ["Italian", "Japanese", "American"];
      suggestions = generateRestaurantSuggestions(cuisines, groupPreferences.avgBudget || 50);
    } else if (decisionType === "movie") {
      const genres = groupPreferences.movieGenres || ["Action", "Comedy", "Thriller"];
      suggestions = generateMovieSuggestions(genres);
    } else if (decisionType === "activity") {
      const activityTypes = groupPreferences.activityTypes || ["Outdoor", "Entertainment"];
      suggestions = generateActivitySuggestions(activityTypes);
    }

    // Log for debugging
    console.log(
      `Generated ${suggestions.length} AI suggestions for ${decisionType}`
    );

    res.json({
      success: true,
      decisionType,
      suggestions,
      message: `Generated ${suggestions.length} AI suggestions based on group preferences`,
    });
  } catch (error) {
    console.error("AI suggestions error:", error);
    res.status(500).json({
      message: "Error generating AI suggestions",
      error: error.message,
    });
  }
};

/**
 * Generate restaurant suggestions based on group preferences
 */
function generateRestaurantSuggestions(cuisines, avgBudget) {
  const allRestaurants = {
    Italian: {
      name: "Italian Pasta House",
      category: "Italian",
      details: { rating: 4.8, price: "$$", distance: "0.5 miles", cuisine: "Italian" },
      reason: "Group loves Italian cuisine and this has excellent ratings",
      confidence: 92,
    },
    Japanese: {
      name: "Sushi Paradise",
      category: "Japanese",
      details: { rating: 4.7, price: "$$$", distance: "1.2 miles", cuisine: "Japanese" },
      reason: "Perfect for diverse tastes with premium options",
      confidence: 87,
    },
    American: {
      name: "Burger Barn",
      category: "American",
      details: { rating: 4.6, price: "$", distance: "0.3 miles", cuisine: "American" },
      reason: "Closest location and great budget-friendly option",
      confidence: 85,
    },
    Asian: {
      name: "Thai Spice",
      category: "Thai",
      details: { rating: 4.9, price: "$$", distance: "0.8 miles", cuisine: "Thai" },
      reason: "Highest rated option with excellent group appeal",
      confidence: 90,
    },
    Mediterranean: {
      name: "Mediterranean Grill",
      category: "Mediterranean",
      details: { rating: 4.5, price: "$$", distance: "1.5 miles", cuisine: "Mediterranean" },
      reason: "Healthy options perfect for balanced group preferences",
      confidence: 83,
    },
    French: {
      name: "Le Petit Bistro",
      category: "French",
      details: { rating: 4.7, price: "$$$", distance: "2.1 miles", cuisine: "French" },
      reason: "Elegant dining experience perfect for special occasions",
      confidence: 88,
    },
    Spanish: {
      name: "Tapas Madrid",
      category: "Spanish",
      details: { rating: 4.6, price: "$$", distance: "0.9 miles", cuisine: "Spanish" },
      reason: "Great for sharing and group dining experience",
      confidence: 86,
    },
    Greek: {
      name: "Athens Taverna",
      category: "Greek",
      details: { rating: 4.5, price: "$", distance: "1.3 miles", cuisine: "Greek" },
      reason: "Authentic flavors and friendly atmosphere",
      confidence: 84,
    },
    Indian: {
      name: "Taj Palace",
      category: "Indian",
      details: { rating: 4.7, price: "$$", distance: "0.7 miles", cuisine: "Indian" },
      reason: "Flavorful options for varied palates",
      confidence: 87,
    },
    Mexican: {
      name: "Casa del Sol",
      category: "Mexican",
      details: { rating: 4.6, price: "$", distance: "1.1 miles", cuisine: "Mexican" },
      reason: "Fun, casual atmosphere perfect for groups",
      confidence: 85,
    },
  };

  const suggestions = [];
  let id = 1;

  // Add suggestions based on group cuisines (prioritize them)
  cuisines.forEach((cuisine) => {
    if (allRestaurants[cuisine] && suggestions.length < 5) {
      suggestions.push({
        id: id++,
        ...allRestaurants[cuisine],
      });
    }
  });

  // Add fallback suggestions if needed
  Object.entries(allRestaurants).forEach(([key, value]) => {
    if (suggestions.length < 5 && !cuisines.includes(key)) {
      suggestions.push({
        id: id++,
        ...value,
      });
    }
  });

  return suggestions.slice(0, 5);
}

/**
 * Generate movie suggestions based on group preferences
 */
function generateMovieSuggestions(genres) {
  const allMovies = {
    Action: {
      name: "The Action Hero",
      details: { rating: 8.2, duration: "148 min", release: "2024", genre: "Action" },
      reason: "Most group members prefer action with high entertainment value",
      confidence: 88,
    },
    Romance: {
      name: "Love in Paris",
      details: { rating: 7.9, duration: "126 min", release: "2024", genre: "Romance" },
      reason: "Good choice for balanced group preferences",
      confidence: 76,
    },
    Thriller: {
      name: "Mystery Manor",
      details: { rating: 8.5, duration: "135 min", release: "2024", genre: "Thriller" },
      reason: "Highest rated with engaging plot for group discussion",
      confidence: 91,
    },
    Comedy: {
      name: "Comedy Night Out",
      details: { rating: 8.1, duration: "110 min", release: "2024", genre: "Comedy" },
      reason: "Perfect for light-hearted group entertainment",
      confidence: 85,
    },
    "Sci-Fi": {
      name: "Sci-Fi Adventure",
      details: { rating: 8.4, duration: "157 min", release: "2024", genre: "Sci-Fi" },
      reason: "Epic scale perfect for group movie experience",
      confidence: 89,
    },
    Drama: {
      name: "The Last Goodbye",
      details: { rating: 8.3, duration: "142 min", release: "2024", genre: "Drama" },
      reason: "Emotionally engaging with meaningful storytelling",
      confidence: 84,
    },
    Animation: {
      name: "Adventure Kingdom",
      details: { rating: 8.0, duration: "95 min", release: "2024", genre: "Animation" },
      reason: "Fun and entertaining for all ages",
      confidence: 82,
    },
    Indie: {
      name: "Small Town Stories",
      details: { rating: 7.8, duration: "118 min", release: "2024", genre: "Indie" },
      reason: "Unique perspective with interesting dialogue",
      confidence: 80,
    },
    Documentary: {
      name: "Behind the Scenes",
      details: { rating: 8.2, duration: "105 min", release: "2024", genre: "Documentary" },
      reason: "Informative and thought-provoking for group discussion",
      confidence: 83,
    },
    Adventure: {
      name: "Quest for Gold",
      details: { rating: 8.1, duration: "138 min", release: "2024", genre: "Adventure" },
      reason: "Thrilling and immersive group viewing experience",
      confidence: 86,
    },
  };

  const suggestions = [];
  let id = 1;

  // Add suggestions based on group genres (prioritize them)
  genres.forEach((genre) => {
    if (allMovies[genre] && suggestions.length < 5) {
      suggestions.push({
        id: id++,
        ...allMovies[genre],
      });
    }
  });

  // Add fallback suggestions
  Object.entries(allMovies).forEach(([key, value]) => {
    if (suggestions.length < 5 && !genres.includes(key)) {
      suggestions.push({
        id: id++,
        ...value,
      });
    }
  });

  return suggestions.slice(0, 5);
}

/**
 * Generate activity suggestions based on group preferences
 */
function generateActivitySuggestions(activityTypes) {
  const allActivities = {
    Outdoor: {
      name: "Hiking Trail Adventure",
      details: { type: "Outdoor", duration: "3 hours", difficulty: "Medium", group: "3-20 people" },
      reason: "Outdoor activity great for group bonding and fitness",
      confidence: 87,
    },
    Entertainment: {
      name: "Bowling Night",
      details: { type: "Entertainment", duration: "2 hours", difficulty: "Easy", group: "4-12 people" },
      reason: "Classic group activity with guaranteed fun",
      confidence: 90,
    },
    Beach: {
      name: "Beach Day",
      details: { type: "Outdoor", duration: "Full day", difficulty: "Easy", group: "5-30 people" },
      reason: "Relaxing and suitable for various preferences",
      confidence: 84,
    },
    Food: {
      name: "Cooking Class",
      details: { type: "Entertainment", duration: "2.5 hours", difficulty: "Easy", group: "6-15 people" },
      reason: "Interactive activity perfect for food enthusiasts",
      confidence: 86,
    },
    Gaming: {
      name: "Escape Room Challenge",
      details: { type: "Entertainment", duration: "1.5 hours", difficulty: "Hard", group: "2-8 people" },
      reason: "Team-building activity that engages everyone",
      confidence: 88,
    },
    Sports: {
      name: "Basketball Tournament",
      details: { type: "Sports", duration: "2 hours", difficulty: "Medium", group: "8-20 people" },
      reason: "Competitive fun with great exercise",
      confidence: 85,
    },
    Music: {
      name: "Live Concert Night",
      details: { type: "Entertainment", duration: "3 hours", difficulty: "Easy", group: "5-50 people" },
      reason: "Entertaining group experience with live music",
      confidence: 83,
    },
    Culture: {
      name: "Museum Tour",
      details: { type: "Culture", duration: "2.5 hours", difficulty: "Easy", group: "3-15 people" },
      reason: "Educational and enriching group experience",
      confidence: 81,
    },
    Travel: {
      name: "Weekend Getaway",
      details: { type: "Travel", duration: "2 days", difficulty: "Easy", group: "4-20 people" },
      reason: "Adventure and bonding away from routine",
      confidence: 86,
    },
    Workshop: {
      name: "Creative Workshop",
      details: { type: "Entertainment", duration: "3 hours", difficulty: "Easy", group: "5-12 people" },
      reason: "Learn and create together as a group",
      confidence: 82,
    },
  };

  const suggestions = [];
  let id = 1;

  // Add suggestions based on group activity types (prioritize them)
  activityTypes.forEach((type) => {
    if (allActivities[type] && suggestions.length < 5) {
      suggestions.push({
        id: id++,
        ...allActivities[type],
      });
    }
  });

  // Add fallback suggestions
  Object.entries(allActivities).forEach(([key, value]) => {
    if (suggestions.length < 5 && !activityTypes.includes(key)) {
      suggestions.push({
        id: id++,
        ...value,
      });
    }
  });

  return suggestions.slice(0, 5);
}
