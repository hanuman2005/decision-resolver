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

    // Mock AI suggestions - can be enhanced with actual AI service
    const mockSuggestions = {
      restaurant: [
        {
          id: 1,
          name: "Italian Pasta House",
          category: "Italian",
          rating: 4.8,
          price: "$$",
          distance: "0.5 miles",
        },
        {
          id: 2,
          name: "Sushi Paradise",
          category: "Japanese",
          rating: 4.7,
          price: "$$$",
          distance: "1.2 miles",
        },
        {
          id: 3,
          name: "Burger Barn",
          category: "American",
          rating: 4.6,
          price: "$",
          distance: "0.3 miles",
        },
        {
          id: 4,
          name: "Thai Spice",
          category: "Thai",
          rating: 4.9,
          price: "$$",
          distance: "0.8 miles",
        },
        {
          id: 5,
          name: "Mediterranean Grill",
          category: "Mediterranean",
          rating: 4.5,
          price: "$$",
          distance: "1.5 miles",
        },
      ],
      movie: [
        {
          id: 1,
          name: "The Action Hero",
          genre: "Action",
          rating: 8.2,
          duration: "148 min",
          release: "2024",
        },
        {
          id: 2,
          name: "Love in Paris",
          genre: "Romance",
          rating: 7.9,
          duration: "126 min",
          release: "2024",
        },
        {
          id: 3,
          name: "Mystery Manor",
          genre: "Thriller",
          rating: 8.5,
          duration: "135 min",
          release: "2024",
        },
        {
          id: 4,
          name: "Comedy Night Out",
          genre: "Comedy",
          rating: 8.1,
          duration: "110 min",
          release: "2024",
        },
        {
          id: 5,
          name: "Sci-Fi Adventure",
          genre: "Sci-Fi",
          rating: 8.4,
          duration: "157 min",
          release: "2024",
        },
      ],
      activity: [
        {
          id: 1,
          name: "Hiking Trail Expedition",
          type: "Outdoor",
          duration: "3 hours",
          difficulty: "Medium",
          group: "8-15 people",
        },
        {
          id: 2,
          name: "Bowling Night",
          type: "Entertainment",
          duration: "2 hours",
          difficulty: "Easy",
          group: "4-12 people",
        },
        {
          id: 3,
          name: "Cooking Class",
          type: "Educational",
          duration: "2.5 hours",
          difficulty: "Medium",
          group: "6-10 people",
        },
        {
          id: 4,
          name: "Beach Volleyball",
          type: "Sports",
          duration: "2 hours",
          difficulty: "Medium",
          group: "6-16 people",
        },
        {
          id: 5,
          name: "Movie Marathon",
          type: "Entertainment",
          duration: "4 hours",
          difficulty: "Easy",
          group: "3-20 people",
        },
      ],
    };

    const suggestions = mockSuggestions[decisionType] || [];

    // Log for debugging
    console.log(
      `Generated ${suggestions.length} AI suggestions for ${decisionType}`
    );

    res.json({
      success: true,
      decisionType,
      suggestions,
      message: `Generated ${suggestions.length} AI suggestions`,
    });
  } catch (error) {
    console.error("AI suggestions error:", error);
    res.status(500).json({
      message: "Error generating AI suggestions",
      error: error.message,
    });
  }
};
