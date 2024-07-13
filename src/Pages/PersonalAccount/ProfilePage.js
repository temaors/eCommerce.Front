import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PersonalAccountPage } from "../PersonalAccountPage";
import { useSelector } from 'react-redux';

export const ProfilePage = () => {
    const navigate = useNavigate();
    const userId = useSelector(state => state.userId)
    const [apiUser, setApiUser] = useState({
        id: userId,
        firstName: '',
        lastName: '',
        middleName: '',
        email: '',
        password: '',
        type: 0,
        currency: 2 ,
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                console.log("User Id to get info: " + userId)
                const response = await axios.get(`https://localhost:7217/account?userId=${userId}`);
                console.log("USERUSER")
                console.log(response)
                setApiUser(response.data);
            } catch (error) {
                console.log('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, [userId]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setApiUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const updatedUser = {
                id: userId,
                firstName: apiUser.firstName,
                lastName: apiUser.lastName,
                middleName: apiUser.middleName,
                email: apiUser.email,
                password: apiUser.password,
                type: apiUser.type,
                currency: apiUser.currency,
            };
            const response = await axios.patch(`https://localhost:7217/update_user`, updatedUser, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            navigate('/profile');
        } catch (error) {
            console.log('Error saving user profile:', error);
        }
    };

    return (
        <PersonalAccountPage>
            <form id="user-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="firstName">Имя:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        required
                        value={apiUser.firstName}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group-hidden">
                    <input
                        type="text"
                        className="form-control"
                        id="userId"
                        name="userId"
                        value={userId}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="lastName">Фамилия:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        name="lastName"
                        required
                        value={apiUser.lastName}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="middleName">Отчество:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="middleName"
                        name="middleName"
                        value={apiUser.middleName}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Электронная почта:</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        required
                        value={apiUser.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group-hidden">
                    <label htmlFor="password">Пароль:</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        required
                        value={apiUser.password}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="currency">Валюта:</label>
                    <select
                        className="form-control"
                        id="currency"
                        name="currency"
                        required
                        value={apiUser.currency}
                        onChange={handleChange}
                    >
                        <option value="0">BYN</option>
                        <option value="1">EUR</option>
                        <option value="2">RUB</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-primary" onClick={() => handleSubmit}>
                    Сохранить
                </button>
            </form>
        </PersonalAccountPage>
    );
};
