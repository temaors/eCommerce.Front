import React from 'react';
import Header from "./TemplatePage";
import '../styles/PersonalAccountPage.css'
import {useNavigate} from "react-router-dom";
import {updateCartId, updateSellerId, updateUserFav, updateUserId, updateUserType} from "./Store";
export const PersonalAccountPage = ({ children }) => {
    const navigate = useNavigate();
    const LogOut = () => {
        updateUserId(0);
        updateCartId(0);
        updateUserFav(0);
        updateSellerId(0);
        updateUserType(0);
        navigate('/products');
    };

    const HandleOrder = () => {
        navigate('/order_monitoring');
    };

    const profileHandler = () => {
        navigate('/profile');
    };

    const FavouritesHandler = () => {
        navigate('/products/favourites');
    };

    const BuysHandler = () => {
        navigate('/profile');
    };

    const AddressesHandler = () => {
        navigate('/profile');
    };

    return (
        <div>
            <Header>

                <div className="tab">
                    <button className="tablinks" id="defaultOpen" onClick={profileHandler}>Профиль</button>
                    <button className="tablinks" onClick={HandleOrder}>Доставки</button>
                    <button className="tablinks" onClick={BuysHandler}>Покупки</button>
                    <button className="tablinks" onClick={FavouritesHandler}>Избранное</button>
                    <button className="tablinks" onClick={AddressesHandler}>Мои адреса</button>
                    <button className="tablinks" onClick={LogOut}>Выйти из аккаунта</button>
                </div>
                <div className="children-element">{children}</div>
            </Header>
        </div>
    );
};