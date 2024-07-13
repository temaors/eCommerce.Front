import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PersonalAccountPage } from "../PersonalAccountPage";
import { useSelector } from 'react-redux';
import Axios from "axios";
import Header from "../TemplatePage";

export const FavouritesPage = () => {
    const navigate = useNavigate();
    const userId = useSelector(state => state.userId)
    const [products, setProducts] = useState([]);
    const userFavouritesId = useSelector(state => state.userFav)

    useEffect(() => {
        const fetchFavs = async () => {
            try {
                const response = await axios.get(`https://localhost:7217/products/favourites?userId=${userId}`);
                console.log("favourites")
                console.log(response.data)
                setProducts(response.data.products)
            } catch (error) {
                console.log('Error fetching user data:', error);
            }
        };
        fetchFavs();
    }, [userId, userFavouritesId]);

    const RemoveFromFavourites = async (productId) => {
        console.log("Remove product to favourites: userId(" + userId + "), productId(" + productId + ")")
        try {
            const response = await Axios.patch(`https://localhost:7217/products/remove_from_favourites?userFavouritesId=${userFavouritesId}&productId=${productId}`);
            if (response.status === 200) {
                const fetchFavs = async () => {
                    try {
                        const response = await axios.get(`https://localhost:7217/products/favourites?userId=${userId}`);
                        console.log("favourites")
                        console.log(response.data)
                        setProducts(response.data.products)
                    } catch (error) {
                        console.log('Error fetching user data:', error);
                    }
                };
                fetchFavs();
                navigate("/products/favourites")
            } else {
                console.error('Error removing product from fav:', response.status);
            }
        } catch (error) {
            console.error('Error removing product from fav:', error);
        }
    }
    if(products.length === 0)
        return (
            <div>
                <PersonalAccountPage>
                    <h2>У вас нет избранных товаров</h2>
                </PersonalAccountPage>
            </div>
        );
    else
        return (
            <PersonalAccountPage>
                <h2>Избранные товары</h2>
                <ol className="ui-list shopping-cart--list" id="shopping-cart--list">
                    {products.map(item => (
                        <li className="_grid shopping-cart--list-item">
                            <div className="_column product-image">
                                <img className="product-image--img" src={item.reference} alt="Item image" />
                            </div>
                            <div className="_column product-info">
                                <h4 className="product-name">{item.name}</h4>
                                <p className="product-desc">{item.manufacturer}</p>
                                <div className="price product-single-price"><strong>{item.price}</strong> BYN</div>
                            </div>
                            <div className="product-actions">
                                <div className="heart-button-container">
                                    <button className="heart-button">
                                        <div className="heart-button-icon" onClick={() => RemoveFromFavourites(item.id)}><i className="fa-solid fa-trash"></i></div>
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ol>
            </PersonalAccountPage>
        );
};