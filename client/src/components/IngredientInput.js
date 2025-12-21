import React, { useState } from 'react';

const IngredientInput = () => {
    const [ingredient, setIngredient] = useState('');
    const [dietaryPreference, setDietaryPreference] = useState('');
    const [ingredientsList, setIngredientsList] = useState([]);
    const [error, setError] = useState('');

    const handleIngredientChange = (e) => {
        setIngredient(e.target.value);
    };

    const handleDietaryPreferenceChange = (e) => {
        setDietaryPreference(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!ingredient || !dietaryPreference) {
            setError('Both fields are required.');
            return;
        }
        setIngredientsList([...ingredientsList, { ingredient, dietaryPreference }]);
        setIngredient('');
        setDietaryPreference('');
        setError('');
    };

    return (
        <div>
            <h2>Input Ingredients</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Ingredient:
                        <input
                            type="text"
                            value={ingredient}
                            onChange={handleIngredientChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Dietary Preference:
                        <select
                            value={dietaryPreference}
                            onChange={handleDietaryPreferenceChange}
                            required
                        >
                            <option value="">Select...</option>
                            <option value="vegan">Vegan</option>
                            <option value="vegetarian">Vegetarian</option>
                            <option value="gluten-free">Gluten-Free</option>
                            <option value="none">None</option>
                        </select>
                    </label>
                </div>
                <button type="submit">Add Ingredient</button>
            </form>
            <h3>Ingredients List</h3>
            <ul>
                {ingredientsList.map((item, index) => (
                    <li key={index}>
                        {item.ingredient} - {item.dietaryPreference}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default IngredientInput;