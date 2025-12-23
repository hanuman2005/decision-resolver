# API Testing Guide

## Quick Start Testing Flow

Follow this sequence to test the complete application flow:

---

## 1. User Registration & Authentication

### Register User 1 (Alice)
```http
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "password": "SecurePass123!"
}
```

**Save the token from response!**

### Register User 2 (Bob)
```http
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Bob Smith",
  "email": "bob@example.com",
  "password": "SecurePass123!"
}
```

### Login
```http
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "alice@example.com",
  "password": "SecurePass123!"
}
```

---

## 2. Group Management

### Create Group (as Alice)
```http
POST http://localhost:5000/api/groups
Authorization: Bearer <ALICE_TOKEN>
Content-Type: application/json

{
  "name": "Weekend Squad",
  "description": "Making weekend plans together"
}
```

**Save the inviteCode from response!**

### Join Group (as Bob)
```http
POST http://localhost:5000/api/groups/join
Authorization: Bearer <BOB_TOKEN>
Content-Type: application/json

{
  "inviteCode": "ABC12XYZ"
}
```

### Get My Groups
```http
GET http://localhost:5000/api/groups
Authorization: Bearer <ALICE_TOKEN>
```

---

## 3. Decision Making Flow

### Create Decision Session (as Alice)
```http
POST http://localhost:5000/api/decisions
Authorization: Bearer <ALICE_TOKEN>
Content-Type: application/json

{
  "groupId": "<GROUP_ID>",
  "title": "Friday Dinner Plans",
  "category": "food",
  "options": [
    {
      "name": "Italian Bistro",
      "category": "italian",
      "price": 35,
      "location": {
        "address": "123 Main St",
        "latitude": 40.7128,
        "longitude": -74.0060
      },
      "tags": ["italian", "fine-dining", "romantic", "vegetarian-options"],
      "rating": 4.5,
      "imageUrl": "https://example.com/bistro.jpg"
    },
    {
      "name": "Burger Joint",
      "category": "american",
      "price": 15,
      "location": {
        "address": "456 Oak Ave",
        "latitude": 40.7150,
        "longitude": -74.0080
      },
      "tags": ["casual", "fast-food", "family-friendly"],
      "rating": 4.0
    },
    {
      "name": "Sushi Palace",
      "category": "japanese",
      "price": 45,
      "location": {
        "address": "789 Pine Rd",
        "latitude": 40.7100,
        "longitude": -74.0020
      },
      "tags": ["japanese", "fine-dining", "seafood"],
      "rating": 4.7
    },
    {
      "name": "Vegan Delight",
      "category": "vegan",
      "price": 25,
      "location": {
        "address": "321 Elm St",
        "latitude": 40.7140,
        "longitude": -74.0050
      },
      "tags": ["vegan", "healthy", "casual", "outdoor-seating"],
      "rating": 4.3
    }
  ]
}
```

**Save the decision ID!**

### Submit Constraints - Alice
```http
POST http://localhost:5000/api/decisions/<DECISION_ID>/constraints
Authorization: Bearer <ALICE_TOKEN>
Content-Type: application/json

{
  "budget": {
    "min": 20,
    "max": 40,
    "weight": 0.8
  },
  "location": {
    "latitude": 40.7128,
    "longitude": -74.0060,
    "maxDistance": 3,
    "weight": 0.7
  },
  "preferences": ["italian", "romantic", "outdoor-seating"],
  "dietaryRequirements": ["vegetarian"],
  "mustHaves": ["vegetarian-options"],
  "dealBreakers": ["fast-food"]
}
```

### Submit Constraints - Bob
```http
POST http://localhost:5000/api/decisions/<DECISION_ID>/constraints
Authorization: Bearer <BOB_TOKEN>
Content-Type: application/json

{
  "budget": {
    "min": 10,
    "max": 50,
    "weight": 0.6
  },
  "location": {
    "latitude": 40.7150,
    "longitude": -74.0080,
    "maxDistance": 5,
    "weight": 0.5
  },
  "preferences": ["casual", "family-friendly"],
  "dietaryRequirements": [],
  "mustHaves": [],
  "dealBreakers": ["vegan"]
}
```

**After both submit, algorithm runs automatically!**

### Get Decision Results
```http
GET http://localhost:5000/api/decisions/<DECISION_ID>
Authorization: Bearer <ALICE_TOKEN>
```

**Response will include:**
- Selected option with reasoning
- Satisfaction scores per user
- Alternative options
- Detailed scoring breakdown

---

## 4. Fairness Tracking

### Get Fairness Insight
```http
GET http://localhost:5000/api/decisions/fairness/<GROUP_ID>
Authorization: Bearer <ALICE_TOKEN>
```

**Shows:**
- Total decisions participated
- Fairness score (0-1)
- Influence multiplier for next decision
- Recent performance trend

---

## 5. Additional Endpoints

### Get Group Decisions
```http
GET http://localhost:5000/api/decisions/group/<GROUP_ID>
Authorization: Bearer <ALICE_TOKEN>
```

### Get User Profile
```http
GET http://localhost:5000/api/auth/me
Authorization: Bearer <ALICE_TOKEN>
```

### Update Profile
```http
PUT http://localhost:5000/api/auth/profile
Authorization: Bearer <ALICE_TOKEN>
Content-Type: application/json

{
  "name": "Alice M. Johnson",
  "preferences": {
    "defaultBudget": {
      "min": 20,
      "max": 50
    },
    "dietaryRestrictions": ["vegetarian"],
    "favoriteCategories": ["food", "activity"]
  }
}
```

### Manually Trigger Processing (Admin only)
```http
POST http://localhost:5000/api/decisions/<DECISION_ID>/process
Authorization: Bearer <ALICE_TOKEN>
```

### Cancel Decision
```http
DELETE http://localhost:5000/api/decisions/<DECISION_ID>
Authorization: Bearer <ALICE_TOKEN>
```

---

## Testing Scenarios

### Scenario 1: Simple Dinner Decision
1. Create group with 2 members
2. Create decision with 3-4 restaurant options
3. Both submit constraints
4. Check results - should auto-process

### Scenario 2: Conflicting Preferences
1. User 1: Budget $10-20, wants fast food
2. User 2: Budget $40-60, wants fine dining
3. Algorithm should find middle-ground option

### Scenario 3: Fairness Testing
1. Make 3-4 decisions in same group
2. Ensure User 1 always gets their preferences
3. On next decision, User 2 should have higher influence

### Scenario 4: Deal-breakers
1. User has deal-breaker: "vegan"
2. All vegan restaurants should be filtered out
3. Final decision should not violate deal-breakers

---

## Expected Response Formats

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Email is required"
    }
  ]
}
```

### Decision Result
```json
{
  "success": true,
  "data": {
    "decision": {
      "status": "completed",
      "finalDecision": {
        "selectedOption": {
          "name": "Italian Bistro",
          "price": 35,
          ...
        },
        "algorithmScore": 0.85,
        "satisfactionRate": 0.90,
        "reasoning": [
          "This option scores 85% overall satisfaction across all members",
          "Within budget for 2/2 members",
          "Convenient location for 2 members",
          "Matches preferences of 2 members",
          "Highly rated option (4.5/5.0 stars)"
        ]
      },
      "scoringDetails": [...]
    }
  }
}
```

---

## Tips for Testing

1. **Use Environment Variables**: Save tokens and IDs as variables in your API client
2. **Test Error Cases**: Try invalid data, missing auth, non-existent IDs
3. **Check Fairness**: Make multiple decisions to see fairness adjustments
4. **Test Constraints**: Try impossible constraints (no feasible options)
5. **Concurrent Users**: Test multiple users submitting simultaneously

---

## Postman Collection

Import this collection for quick testing:

1. Create new Postman collection
2. Add environment variables:
   - `BASE_URL`: http://localhost:5000
   - `ALICE_TOKEN`: (from login response)
   - `BOB_TOKEN`: (from login response)
   - `GROUP_ID`: (from create group response)
   - `DECISION_ID`: (from create decision response)

3. Use `{{BASE_URL}}/api/auth/login` format in requests

---

## Health Check

Always test health endpoint first:
```http
GET http://localhost:5000/health
```

Expected response:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "environment": "development"
}
```

---

Happy Testing! 🚀