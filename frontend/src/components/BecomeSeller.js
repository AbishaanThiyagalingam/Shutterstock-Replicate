import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BecomeSeller = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        bankName: '',
        accountNumber: '',
        ifscCode: '',
    });
    const [message, setMessage] = useState('');

    // Fetch user profile on component mount
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token'); // Get the token from localStorage

                if (!token) {
                    setError('Unauthorized: No token provided');
                    return;
                }

                const response = await axios.get('http://localhost:8080/auth/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                    },
                });
                setUser(response.data);
            } catch (err) {
                setError(err.response?.data?.message || 'An error occurred');
            }
        };

        fetchUserProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token'); // Get the token from localStorage

            if (!token) {
                setMessage('Unauthorized: No token provided');
                return;
            }

            const response = await axios.post(
                'http://localhost:8080/auth/become-seller',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                    },
                }
            );

            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data?.message || 'An error occurred.');
        }
    };

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h2>Become a Seller</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Bank Name:</label>
                    <input
                        type="text"
                        name="bankName"
                        value={formData.bankName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Account Number:</label>
                    <input
                        type="text"
                        name="accountNumber"
                        value={formData.accountNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>IFSC Code:</label>
                    <input
                        type="text"
                        name="ifscCode"
                        value={formData.ifscCode}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default BecomeSeller;
