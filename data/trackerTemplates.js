const trackerTemplates = {
  smoking: {
    type: "smoking",
    title: "Quit Smoking",
    goal: "Stay smoke-free and track money saved.",
    fields: [
      {
        key: "cigarettesPerDay",
        label: "Cigarettes smoked per day",
        type: "number",
        value: 20,
        unit: "cigarettes"
      },
      {
        key: "cigarettesPerPack",
        label: "Cigarettes per pack",
        type: "number",
        value: 20,
        unit: "cigarettes"
      },
      {
        key: "costPerPack",
        label: "Cost per pack",
        type: "number",
        value: 10,
        unit: "USD"
      }
    ],
    milestones: [
      {
        label: "20 Minutes",
        description: "Heart rate and blood pressure begin to drop.",
        unlockAfterMinutes: 20
      },
      {
        label: "12 Hours",
        description: "Blood carbon monoxide levels drop toward normal.",
        unlockAfterMinutes: 720
      },
      {
        label: "24 Hours",
        description: "Risk of heart attack begins to decrease.",
        unlockAfterMinutes: 1440
      },
      {
        label: "48 Hours",
        description:
          "Nerve endings begin to regenerate, improving smell and taste.",
        unlockAfterMinutes: 2880
      },
      {
        label: "72 Hours",
        description:
          "Bronchial tubes relax, making breathing easier and energy may improve.",
        unlockAfterMinutes: 4320
      },
      {
        label: "2 Weeks",
        description: "Circulation begins improving.",
        unlockAfterMinutes: 20160
      },
      {
        label: "3 Months",
        description: "Lung function may improve noticeably.",
        unlockAfterMinutes: 129600
      },
      {
        label: "1 Year",
        description: "Risk of coronary heart disease is significantly lower.",
        unlockAfterMinutes: 525600
      }
    ]
  },

  alcohol: {
    type: "alcohol",
    title: "Quit Alcohol",
    goal: "Track sober time, money saved, and drinks avoided.",
    fields: [
      {
        key: "drinksPerWeek",
        label: "Drinks per week",
        type: "number",
        value: 12,
        unit: "drinks"
      },
      {
        key: "costPerDrink",
        label: "Average cost per drink",
        type: "number",
        value: 6,
        unit: "USD"
      }
    ],
    milestones: [
      {
        label: "24 Hours",
        description: "One full day alcohol-free.",
        unlockAfterMinutes: 1440
      },
      {
        label: "1 Week",
        description: "A full week of sober progress.",
        unlockAfterMinutes: 10080
      },
      {
        label: "1 Month",
        description: "One month of reclaimed clarity and routine.",
        unlockAfterMinutes: 43200
      },
      {
        label: "6 Months",
        description: "A major long-term sobriety milestone.",
        unlockAfterMinutes: 262800
      },
      {
        label: "1 Year",
        description: "One full year alcohol-free.",
        unlockAfterMinutes: 525600
      }
    ]
  },

  marijuana: {
    type: "marijuana",
    title: "Quit Marijuana",
    goal: "Track clean time, money saved, and usage avoided.",
    fields: [
      {
        key: "usesPerWeek",
        label: "Uses per week",
        type: "number",
        value: 7,
        unit: "uses"
      },
      {
        key: "costPerWeek",
        label: "Average cost per week",
        type: "number",
        value: 50,
        unit: "USD"
      }
    ],
    milestones: [
      {
        label: "24 Hours",
        description: "One full day without marijuana.",
        unlockAfterMinutes: 1440
      },
      {
        label: "1 Week",
        description: "A full week of momentum.",
        unlockAfterMinutes: 10080
      },
      {
        label: "1 Month",
        description: "A month of consistency and control.",
        unlockAfterMinutes: 43200
      },
      {
        label: "3 Months",
        description: "A major reset milestone.",
        unlockAfterMinutes: 129600
      }
    ]
  },

  pornography: {
    type: "pornography",
    title: "Quit Pornography",
    goal: "Track time reclaimed, streaks, and personal reset progress.",
    fields: [
      {
        key: "minutesPerDay",
        label: "Minutes usually spent per day",
        type: "number",
        value: 30,
        unit: "minutes"
      }
    ],
    milestones: [
      {
        label: "24 Hours",
        description: "One full day of progress.",
        unlockAfterMinutes: 1440
      },
      {
        label: "1 Week",
        description: "A week of discipline and reset.",
        unlockAfterMinutes: 10080
      },
      {
        label: "1 Month",
        description: "A full month of reclaimed attention.",
        unlockAfterMinutes: 43200
      },
      {
        label: "90 Days",
        description: "A major personal reset milestone.",
        unlockAfterMinutes: 129600
      }
    ]
  },

  video_games: {
    type: "video_games",
    title: "Video Game Balance",
    goal: "Track gaming time reduced and hours reclaimed.",
    fields: [
      {
        key: "hoursPerWeek",
        label: "Hours usually played per week",
        type: "number",
        value: 14,
        unit: "hours"
      },
      {
        key: "monthlySpend",
        label: "Average monthly game spending",
        type: "number",
        value: 30,
        unit: "USD"
      }
    ],
    milestones: [
      {
        label: "1 Week",
        description: "One week of healthier screen-time balance.",
        unlockAfterMinutes: 10080
      },
      {
        label: "1 Month",
        description: "One month of time reclaimed.",
        unlockAfterMinutes: 43200
      }
    ]
  },

  social_media: {
    type: "social_media",
    title: "Social Media Detox",
    goal: "Track time reclaimed from social media.",
    fields: [
      {
        key: "minutesPerDay",
        label: "Minutes usually spent per day",
        type: "number",
        value: 120,
        unit: "minutes"
      }
    ],
    milestones: [
      {
        label: "24 Hours",
        description: "One full day with less digital noise.",
        unlockAfterMinutes: 1440
      },
      {
        label: "1 Week",
        description: "One week of reclaimed attention.",
        unlockAfterMinutes: 10080
      },
      {
        label: "1 Month",
        description: "A full month of better focus.",
        unlockAfterMinutes: 43200
      }
    ]
  },

  fast_food: {
    type: "fast_food",
    title: "Fast Food Reset",
    goal: "Track meals avoided, money saved, and calories avoided.",
    fields: [
      {
        key: "mealsPerWeek",
        label: "Fast food meals per week",
        type: "number",
        value: 5,
        unit: "meals"
      },
      {
        key: "costPerMeal",
        label: "Average cost per meal",
        type: "number",
        value: 12,
        unit: "USD"
      },
      {
        key: "caloriesPerMeal",
        label: "Average calories per meal",
        type: "number",
        value: 900,
        unit: "calories"
      }
    ],
    milestones: [
      {
        label: "1 Week",
        description: "A full week of better food choices.",
        unlockAfterMinutes: 10080
      },
      {
        label: "1 Month",
        description: "One month of meaningful savings.",
        unlockAfterMinutes: 43200
      }
    ]
  },

  television: {
    type: "television",
    title: "Television Balance",
    goal: "Track TV time reduced and hours reclaimed.",
    fields: [
      {
        key: "hoursPerWeek",
        label: "Hours usually watched per week",
        type: "number",
        value: 14,
        unit: "hours"
      }
    ],
    milestones: [
      {
        label: "1 Week",
        description: "One week of time reclaimed.",
        unlockAfterMinutes: 10080
      },
      {
        label: "1 Month",
        description: "A full month of healthier media balance.",
        unlockAfterMinutes: 43200
      }
    ]
  },

  weight: {
    type: "weight",
    title: "Weight Tracker",
    goal: "Track body weight, BMI, and goal progress.",
    fields: [
      {
        key: "heightFeet",
        label: "Height feet",
        type: "number",
        value: 5,
        unit: "ft"
      },
      {
        key: "heightInches",
        label: "Height inches",
        type: "number",
        value: 10,
        unit: "in"
      },
      {
        key: "currentWeight",
        label: "Current weight",
        type: "number",
        value: 180,
        unit: "lb"
      },
      {
        key: "goalWeight",
        label: "Goal weight",
        type: "number",
        value: 170,
        unit: "lb"
      },
      {
        key: "age",
        label: "Age",
        type: "number",
        value: 30,
        unit: "years"
      },
      {
        key: "gender",
        label: "Gender",
        type: "text",
        value: "",
        unit: ""
      }
    ],
    milestones: [
      {
        label: "First Log",
        description: "You started tracking your health data.",
        unlockAfterMinutes: 1
      },
      {
        label: "1 Week",
        description: "One full week of awareness.",
        unlockAfterMinutes: 10080
      },
      {
        label: "1 Month",
        description: "One month of consistency.",
        unlockAfterMinutes: 43200
      }
    ]
  },

  workout: {
    type: "workout",
    title: "Workout Tracker",
    goal: "Track workouts, time trained, steps, and miles.",
    fields: [
      {
        key: "workoutsPerWeek",
        label: "Workouts per week",
        type: "number",
        value: 3,
        unit: "workouts"
      },
      {
        key: "minutesPerWorkout",
        label: "Minutes per workout",
        type: "number",
        value: 45,
        unit: "minutes"
      },
      {
        key: "stepsPerDay",
        label: "Steps per day",
        type: "number",
        value: 8000,
        unit: "steps"
      },
      {
        key: "milesPerWeek",
        label: "Miles per week",
        type: "number",
        value: 5,
        unit: "miles"
      },
      {
        key: "split",
        label: "Workout split",
        type: "text",
        value: "Arms / Legs / Cardio",
        unit: ""
      }
    ],
    milestones: [
      {
        label: "1 Week",
        description: "One week of training momentum.",
        unlockAfterMinutes: 10080
      },
      {
        label: "1 Month",
        description: "A full month of movement.",
        unlockAfterMinutes: 43200
      }
    ]
  },

  calories: {
    type: "calories",
    title: "Calorie Tracker",
    goal: "Track daily calorie goals and estimated progress.",
    fields: [
      {
        key: "dailyCalorieGoal",
        label: "Daily calorie goal",
        type: "number",
        value: 2200,
        unit: "calories"
      },
      {
        key: "estimatedDailyCalories",
        label: "Estimated current daily calories",
        type: "number",
        value: 2600,
        unit: "calories"
      }
    ],
    milestones: [
      {
        label: "1 Week",
        description: "One week of calorie awareness.",
        unlockAfterMinutes: 10080
      },
      {
        label: "1 Month",
        description: "One month of nutrition consistency.",
        unlockAfterMinutes: 43200
      }
    ]
  },

  finance: {
    type: "finance",
    title: "Income & Expense Tracker",
    goal: "Track monthly income, expenses, and savings.",
    fields: [
      {
        key: "monthlyIncome",
        label: "Monthly income",
        type: "number",
        value: 4000,
        unit: "USD"
      },
      {
        key: "monthlyExpenses",
        label: "Monthly expenses",
        type: "number",
        value: 3000,
        unit: "USD"
      },
      {
        key: "savingsGoal",
        label: "Monthly savings goal",
        type: "number",
        value: 500,
        unit: "USD"
      }
    ],
    milestones: [
      {
        label: "First Month",
        description: "You started tracking your money.",
        unlockAfterMinutes: 43200
      },
      {
        label: "3 Months",
        description: "Three months of financial awareness.",
        unlockAfterMinutes: 129600
      }
    ]
  },

  custom: {
    type: "custom",
    title: "Custom Tracker",
    goal: "Track anything that matters to you.",
    fields: [
      {
        key: "primaryValue",
        label: "Starting value",
        type: "number",
        value: 0,
        unit: ""
      },
      {
        key: "moneyPerWeek",
        label: "Money saved per week",
        type: "number",
        value: 0,
        unit: "USD"
      }
    ],
    milestones: [
      {
        label: "1 Day",
        description: "You started.",
        unlockAfterMinutes: 1440
      },
      {
        label: "1 Week",
        description: "One week of progress.",
        unlockAfterMinutes: 10080
      },
      {
        label: "1 Month",
        description: "One month of consistency.",
        unlockAfterMinutes: 43200
      }
    ]
  }
};

function getTrackerTemplate(type) {
  return trackerTemplates[type] || trackerTemplates.custom;
}

function getAllTrackerTemplates() {
  return Object.values(trackerTemplates);
}

module.exports = {
  trackerTemplates,
  getTrackerTemplate,
  getAllTrackerTemplates
};