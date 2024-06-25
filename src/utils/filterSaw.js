export const highProtein = {
    calories: 0.3,
    protein: 0.4,
    carbs: 0.2,
    fat: 0.1,
  }
export const highFat = {
    calories: 0.3,
    protein: 0.2,
    carbs: 0.1,
    fat: 0.4,
  }
export const highCalories = {
    calories: 0.4,
    protein: 0.2,
    carbs: 0.1,
    fat: 0.3,
  }
export const highCarbs = {
    calories: 0.2,
    protein: 0.3,
    carbs: 0.4,
    fat: 0.1,
  }

export const calculateSAW = (foods, weights) => {
    // console.log(weights);
    const parseIntData = foods.map((food) => {
      const caloriesValue = food.calories ? food.calories.value : "0";
      const proteinValue = food.protein ? food.protein.value : "0";
      const carbsValue = food.carbs ? food.carbs.value : "0";
      const fatValue = food.fat ? food.fat.value : "0";

      const parseValue = (value) => {
        const parsedValue = parseFloat(value);
        return Number.isInteger(parsedValue) ? parseInt(value) : parsedValue;
      };

      return {
        ...food,
        calories: parseValue(caloriesValue),
        protein: parseValue(proteinValue),
        carbs: parseValue(carbsValue),
        fat: parseValue(fatValue),
      };
    });
    // Normalize the data
    let normalizedFoods = parseIntData.map((food) => {
      return {
        ...food,
        calories: food.calories / 100,
        protein: food.protein / 100,
        carbs: food.carbs / 100,
        fat: food.fat / 100,
      };
    });

    // // Calculate the weighted sum for each food
    let scoredFoods = normalizedFoods.map((food) => {
      return {
        ...food,
        score:
          food.calories * weights.calories +
          food.protein * weights.protein +
          food.carbs * weights.carbs +
          food.fat * weights.fat,
      };
    });

    // // Sort the foods based on their scores
    scoredFoods.sort((a, b) => b.score - a.score);

    return scoredFoods;
  };
