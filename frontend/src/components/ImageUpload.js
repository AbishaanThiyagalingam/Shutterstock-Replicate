import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImageUpload = () => {
    const [image, setImage] = useState(null); // Store the selected image file
    const [categories, setCategories] = useState([]); // Available categories
    const [selectedCategories, setSelectedCategories] = useState([]); // Selected categories
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
    });
    const [message, setMessage] = useState(''); // Success/error messages
    const [error, setError] = useState(''); // Authentication errors

    // Fetch categories from the backend
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8080/categories');
                setCategories(response.data);
                console.log(response.data);
            } catch (err) {
                console.error('Failed to fetch categories:', err);
            }
        };

        fetchCategories();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleCategoryChange = (e) => {
        const { value, checked } = e.target;
        setSelectedCategories((prevSelected) =>
            checked
                ? [...prevSelected, value] // Add category if checked
                : prevSelected.filter((id) => id !== value) // Remove category if unchecked
        );
    };

    const handleUpload = async (e) => {
        e.preventDefault();

        // Ensure all fields are filled
        if (!image || !formData.title || !formData.description || !formData.price || selectedCategories.length === 0) {
            setMessage('Please fill all fields and select at least one category.');
            return;
        }

        const data = new FormData();
        data.append('image', image);
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('price', formData.price);
        selectedCategories.forEach((id) => data.append('categories', id));

        try {
            const token = localStorage.getItem('token'); // Get token from localStorage
            if (!token) {
                setMessage('Unauthorized: No token provided');
                return;
            }

            const response = await axios.post('http://localhost:8080/images/upload', data, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token for authentication
                    'Content-Type': 'multipart/form-data',
                },
            });

            setMessage(response.data.message || 'Image uploaded successfully!');
        } catch (err) {
            setMessage(err.response?.data?.message || 'An error occurred during upload.');
        }
    };

    return (
        <div className="image-upload-container">
            <h2>Upload Image</h2>
            <form onSubmit={handleUpload}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
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
                    <label>Price:</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Select Categories:</label>
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
                <div>
                    <label>Image:</label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                    />
                </div>
                <button type="submit">Upload</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ImageUpload;
