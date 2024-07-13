import Axios from "axios";
import React from 'react';
import '../styles/RegisterSeller.css'
import Header from "./TemplatePage";
import { useSelector } from 'react-redux';
import {useNavigate} from "react-router-dom";
import {updateCartId, updateSellerId, updateUserFav, updateUserId, updateUserType} from "./Store";

export const RegisterSellerPage = () =>{
    const userId = useSelector(state => state.userId);
    const sellerId = useSelector(state => state.sellerId);
    const navigate = useNavigate();
    const registerSeller = async () => {
        const response = await Axios.post(`https://localhost:7217/seller/register?userId=${userId}`)

        if (response.status === 200) {
            console.log('Seller registered successfully!');
            updateSellerId(response.data.id);
            updateUserType(1)
            navigate("/seller")
        } else {
            console.error('Error registering seller:', response.status);
        }

    };

    return(
        <Header>
            <div className="register-seller-block">
                <h3>Вы хотите начать продавать свои товары?</h3>
                <button onClick={registerSeller} className="register-seller-btn">Стать продавцом</button>
            </div>
        </Header>
    );
};
