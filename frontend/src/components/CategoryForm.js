import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategoryForm = () => {
    const [categories, setCategories] = useState([]); // Store available categories
    const [selectedCategories, setSelectedCategories] = useState([]); // Store selected category IDs
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        thumbnail: null,
    });
    const [message, setMessage] = useState('');

    // Fetch categories from the backend
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8080/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleThumbnailChange = (e) => {
        setFormData((prevData) => ({ ...prevData, thumbnail: e.target.files[0] }));
    };

    const handleCategoryChange = (e) => {
        const { value, checked } = e.target;
        setSelectedCategories((prevSelected) =>
            checked
                ? [...prevSelected, value] // Add category if checked
                : prevSelected.filter((id) => id !== value) // Remove category if unchecked
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('thumbnail', formData.thumbnail);
        selectedCategories.forEach((id) => data.append('categories', id)); // Append selected category IDs

        try {
            const response = await axios.post('http://localhost:8080/categories', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage('Category created successfully!');
        } catch (error) {
            setMessage('Failed to create category.');
        }
    };

    return (
        <div className="category-form-container">
            <h2>Create Category</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                    ></textarea>
                </div>
                <div>
                    <label>Thumbnail:</label>
                    <input
                        type="file"
                        name="thumbnail"
                        onChange={handleThumbnailChange}
                        accept="image/*"
                    />
                </div>
                <div>
                    <label>Categories:</label>
                    <div className="categories-checkboxes">
                        {categories.map((category) => (
                            <div key={category._id}>
                                <input
                                    type="checkbox"
                                    value={category._id}
                                    onChange={handleCategoryChange}
                                />
                                <label>{category.name}</label>
                            </div>
                        ))}
                    </div>
                </div>
                <button type="submit">Create Category</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default CategoryForm;
