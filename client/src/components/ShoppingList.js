import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShoppingList = () => {
    const [shoppingList, setShoppingList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchShoppingList = async () => {
            try {
                const response = await axios.get('/api/shopping-list');
                setShoppingList(response.data);
            } catch (err) {
                setError('Failed to fetch shopping list');
            } finally {
                setLoading(false);
            }
        };
        fetchShoppingList();
    }, []);

    const handleRemoveItem = async (itemId) => {
        try {
            await axios.delete(`/api/shopping-list/${itemId}`);
            setShoppingList(shoppingList.filter(item => item._id !== itemId));
        } catch (err) {
            setError('Failed to remove item');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Shopping List</h2>
            <ul>
                {shoppingList.map(item => (
                    <li key={item._id}>
                        {item.name} - {item.quantity}
                        <button onClick={() => handleRemoveItem(item._id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ShoppingList;