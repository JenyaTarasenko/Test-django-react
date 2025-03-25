import React, { useState } from 'react';
import axios from 'axios';

const AddComment = ({ onCommentAdded }) => {
    const [formData, setFormData] = useState({
        user_name: '',
        email: '',
        home_page: '',
        text: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8001/api/comments/', formData);
            alert("Комментарий добавлен");
            setFormData({ user_name: '', email: '', home_page: '', text: '' });
            onCommentAdded(response.data);
        } catch (error) {
            console.error('Ошибка при отправке:', error.response ? error.response.data : error.message);
            alert('Ошибка при добавлении комментария');
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <form onSubmit={handleSubmit} style={{ margin: '20px 0' }}>
            <h3>Добавить комментарий</h3>

            <div style={{ marginBottom: '10px' }}>
                <input
                    type="text"
                    name="user_name"
                    placeholder="Ваше имя"
                    value={formData.user_name}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '8px' }}
                />
            </div>

            <div style={{ marginBottom: '10px' }}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '8px' }}
                />
            </div>

            <div style={{ marginBottom: '10px' }}>
                <input
                    type="url"
                    name="home_page"
                    placeholder="Сайт (необязательно)"
                    value={formData.home_page}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '8px' }}
                />
            </div>

            <div style={{ marginBottom: '10px' }}>
                <textarea
                    name="text"
                    placeholder="Текст комментария"
                    value={formData.text}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '8px', minHeight: '100px' }}
                />
            </div>

            <button type="submit" style={{ padding: '8px 15px', background: '#4CAF50', color: 'white', border: 'none' }}>
                Отправить
            </button>
        </form>
    );
};

export default AddComment;
