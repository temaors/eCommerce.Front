import Axios from "axios";
import React from 'react';
import '../styles/Login.css'
import Header from "./TemplatePage";
import {updateCartId, updateUserFav, updateUserId, updateSellerId, updateUserType} from "./Store";
import { useSelector } from 'react-redux';
import {useNavigate} from "react-router-dom";

const fetchLogging = async (email, password) => {
    const apiCredentials = {
        Email: email,
        Password: password,
        repeatedPassword: password
    };
    console.log("credentials")
    console.log(apiCredentials)
    try{
        const response = await Axios.post(`https://localhost:7217/sign_in`, apiCredentials, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log("sign_in")
        console.log(response)
        if (response.status === 200) {
            console.log('API credentials sent successfully!');
            updateUserId(response.data.id)
            const cartIdResponse = await Axios.get(`https://localhost:7217/cart/getId?userId=${response.data.id}`)
            console.log(cartIdResponse.data.id)
            updateCartId(cartIdResponse.data.id)
            const userFavResponse = await Axios.get(`https://localhost:7217/user_favourites?userId=${response.data.id}`)
            updateUserFav(userFavResponse.data.id)
            const isUserSellerResponse = await Axios.get(`https://localhost:7217/seller/is_seller?userId=${response.data.id}`)
            console.log(isUserSellerResponse.data)
            if(isUserSellerResponse.data !== 0){

                updateSellerId(isUserSellerResponse.data)
                updateUserType(1)
            }
        } else {
            console.error('Error sending API credentials:', response.status);
        }
    } catch (error) {
        console.error('Error sending API credentials:', error);
    }

    //return;
};

export const LoginPage = () =>{
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const userId = useSelector(state => state.userId);
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const data = await fetchLogging(email, password);
            console.log("Fetched data:", data);
            console.log(userId)
            navigate('/products')
        } catch (error) {
            console.error("Error during login:", error);
            // Handle the error, such as displaying an error message to the user
        }
    };

    const handleRegister = () =>{
        navigate('/sign_up');
    }

    return(
        <Header>
            <div className="login-page-container">
                <div className="login-container">
                    <h1>Вход</h1>
                    <form action="#" className="form-login">
                        <div className="textfield">
                            <label htmlFor="email">E-mail</label>
                            <input className="login-input" type="email" name="user" placeholder="E-mail" value={email}
                                   onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="textfield">
                            <label htmlFor="senha">Пароль</label>
                            <input className="login-input" type="password" name="pass" placeholder="Пароль" value={password}
                                   onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <button className="forgot-password" onClick={handleRegister}>Нет аккаунта?</button>
                        <button className="btn-login login-button" onClick={handleLogin}>Войти</button>
                    </form>
                </div>
            </div>
        </Header>
    );
};
