import Axios from "axios";
import React from 'react';
import '../styles/Login.css'
import Header from "./TemplatePage";
import {updateUserFav, updateUserId} from "./Store";
import {updateCartId} from "./Store";
import { useSelector } from 'react-redux';
import {useNavigate} from "react-router-dom";

const fetchRegister = async (name, email, password, repeatedPassword) => {
    const SignUpCredentials = {
        FirstName: name,
        Email: email,
        Password: password,
        RepeatedPassword: repeatedPassword
    };

    try{
        console.log("try to register")
        console.log(SignUpCredentials)
        const response = await Axios.post(`https://localhost:7217/sign_up`, SignUpCredentials, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200) {
            updateUserId(response.data.id)
            const cartIdResponse = await Axios.get(`https://localhost:7217/cart/getId?userId=${response.data.id}`)
            console.log("Cart Id response")
            console.log(cartIdResponse.data.id)
            updateCartId(cartIdResponse.data.id)
            const userFavResponse = await Axios.get(`https://localhost:7217/user_favourites?userId=${response.data.id}`)
            updateUserFav(userFavResponse.data.id)
        } else {
            console.error('Error sending API credentials:', response.status);
        }
    } catch (error) {
        console.error('Error sending API credentials:', error);
    }

    //return;
};

export const RegisterPage = () =>{
    const [name, setName] = React.useState("")
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [repeatedPassword, setRepeatedPassword] = React.useState("");
    const userId = useSelector(state => state.userId);
    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            const data = await fetchRegister(name, email, password, repeatedPassword);
            console.log("Fetched data:", data);
            console.log(userId)
            navigate('/products')
        } catch (error) {
            console.error("Error during login:", error);
            // Handle the error, such as displaying an error message to the user
        }
    };

    const handleLogIn = () =>{
        navigate('/sign_in');
    }

    return(
        <Header>
            <div className="login-page-container">
                <div className="login-container">
                    <h1>Регистрация</h1>
                    <form action="#" className="form-login">
                        <div className="textfield">
                            <label htmlFor="name">Ваше имя</label>
                            <input className="login-input" name="name" placeholder="Имя" value={name}
                                   onChange={(e) => setName(e.target.value)}/>
                        </div>
                        <div className="textfield">
                            <label htmlFor="email">E-mail</label>
                            <input className="login-input" type="email" name="user" placeholder="E-mail" value={email}
                                   onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="textfield">
                            <label htmlFor="password">Пароль</label>
                            <input className="login-input" type="password" name="pass" placeholder="Пароль" value={password}
                                   onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <div className="textfield">
                            <label htmlFor="repeatedPass">Повторите пароль</label>
                            <input className="login-input" type="password" name="repeatedPass" placeholder="Пароль" value={repeatedPassword}
                                   onChange={(e) => setRepeatedPassword(e.target.value)}/>
                        </div>
                        <button className="forgot-password" onClick={handleLogIn}>Уже есть аккаунт?</button>
                        <button className="btn-login login-button" onClick={handleRegister}>Зарегистрироваться</button>
                    </form>
                </div>
            </div>
        </Header>
    );
};
