import Axios from "axios";
import React from 'react';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react"
import '../styles/productInfo.css'
import Header from "./TemplatePage";
import {useSelector} from "react-redux";
import {updateCartId, updateUserId} from "./Store";

export const ProductInfoPage = () =>{
    const { productId } = useParams();
    const [productInfo, setProductInfo] = useState(null);
    const userId = useSelector(state => state.userId);
    const cartId = useSelector(state => state.cartId);
    const userFavouritesId = useSelector(state => state.userFav)
    const [quantity, setQuantity] = useState(1);
    const [isFavourite, setIsFavourite] = useState(false);
    const [isInCart, setIsInCart] = useState(false);
    const [showQuantityFields, setShowQuantityFields] = useState(false);


    const fetchProductInfo = async (productId) => {
        const productInfoResponse = await Axios.get(`https://localhost:7217/products/view?productId=${productId}`);
        if (productInfoResponse.status === 200) {
            const isInCartResponse = await Axios.get(`https://localhost:7217/cart/is_in_cart?cartId=${cartId}&productId=${productId}`)
            const isInFav = await Axios.get(`https://localhost:7217/products/is_in_favourites?userFavouritesId=${userFavouritesId}&productId=${productId}`)
            console.log(productInfoResponse)
            console.log("Is in cart response:")
            console.log(isInCartResponse)
            console.log("Is favourite:")
            console.log(isInFav.data)
            setIsFavourite(isInFav.data)
            if (isInCartResponse.data === 0){
                setIsInCart(false)
                setShowQuantityFields(false)
            }
            else{
                setIsInCart(true)
                setShowQuantityFields(true)
                setQuantity(isInCartResponse.data)
            }

            return productInfoResponse.data;
        } else {
            console.error('Error getting info about product:', productInfoResponse.status);
        }
    };

    useEffect(() => {
        const fetchProduct = async () => {
            const productInfo = await fetchProductInfo(productId);
            setProductInfo(productInfo);
        };

        fetchProduct();
    }, []);

    const AddToFavourites = async () =>{
        console.log("Add product to favourites: userId(" + userId + "), productId(" + productId + ")")
        const response = await Axios.patch(`https://localhost:7217/products/add_to_favourites?userFavouritesId=${userFavouritesId}&productId=${productId}`);
        if (response.status === 200) {
            setIsFavourite(true);
        } else {
            console.error('Error adding product to cart:', response.status);
        }
    }

    const RemoveFromFavourites = async () =>{
        console.log("Add product to favourites: userId(" + userId + "), productId(" + productId + ")")
        const response = await Axios.patch(`https://localhost:7217/products/remove_from_favourites?userFavouritesId=${userFavouritesId}&productId=${productId}`);
        if (response.status === 200) {
            setIsFavourite(false);
        } else {
            console.error('Error adding product to cart:', response.status);
        }
    }

    const handleAddToCart = async (productId) =>{
        console.log("Add product response: cartId(" + cartId + "), productId(" + productId + ")")
        const response = await Axios.patch(`https://localhost:7217/cart/add_product?cartId=${cartId}&productId=${productId}`);
        if (response.status === 200) {
            setIsInCart(true);
            setShowQuantityFields(true); // Show quantity fields when added to cart
        } else {
            console.error('Error adding product to cart:', response.status);
        }
    }

    const handleRemoveFromCart = async (productId) => {
        console.log("Delete product from cart: cartId(" + cartId + "), productId(" + productId + ")")
        const response = await Axios.patch(`https://localhost:7217/cart/delete_product?cartId=${cartId}&productId=${productId}`);
        if (response.status === 200) {
            setIsInCart(false);
            setShowQuantityFields(false);
            setQuantity(1)// Hide quantity fields when removed from cart
        } else {
            console.error('Error removing product from cart:', response.status);
        }
    };

    const increaseQuantity = async () => {
        const newQuantity = quantity + 1;
        const response = await Axios.patch(`https://localhost:7217/cart/change_product_quantity?cartId=${cartId}&productId=${productId}&count=${newQuantity}`)
        if (response.status === 200) {
            setQuantity(newQuantity);
        } else {
            console.error('Error changing product quantity in cart:', response.status);
        }
    };

    const decreaseQuantity = async () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            const response = await Axios.patch(`https://localhost:7217/cart/change_product_quantity?cartId=${cartId}&productId=${productId}&count=${newQuantity}`)
            if (response.status === 200) {
                setQuantity(newQuantity);
            } else {
                console.error('Error changing product quantity in cart:', response.status);
            }
        }
    };

    return(
        <Header>
            <div>
            {productInfo &&
                <div className="product">
                    <div className="product-image">
                        <img src={productInfo.reference} alt="Product Image"/>
                    </div>

                    <div className="product-details">
                        <h2 className="product-name">{productInfo.name}</h2><hr/>
                        <p className="product-description"><strong>Описание товара:</strong> {productInfo.description} </p><hr/>
                        <p className="product-manufacturer"><strong>Производитель:</strong> {productInfo.manufacturer} </p><hr/>
                        <p className="product-price"><strong>Цена:</strong> {productInfo.price} BYN</p><hr/>
                        <div className="product-rating">
                            <span className="star">★</span>
                            <span className="star">★</span>
                            <span className="star">★</span>
                            <span className="star">★</span>
                            <span className="star">★</span>
                        </div>
                    </div>
                    <div className="product-actions">
                        <div className="heart-button-container">
                            {isFavourite ? (
                                <button className="heart-button">
                                    <div className="heart-button-icon" onClick={RemoveFromFavourites}><i className="fa-solid fa-heart"></i></div>
                                </button>
                            ) : (
                                <button className="heart-button">
                                    <div className="heart-button-icon" onClick={AddToFavourites}><i className="far fa-heart heart-button-icon"></i></div>
                                </button>
                            )}
                        </div>

                        {showQuantityFields && (
                            <div className="product-quantity">
                                <label>Количество:</label>
                                <button className="product-quantity-button" onClick={decreaseQuantity}><i className="fa-solid fa-minus"></i></button>
                                <span>{quantity}</span>
                                <button className="product-quantity-button" onClick={increaseQuantity}><i className="fa-solid fa-plus"></i></button>
                            </div>
                        )}

                        {isInCart ? (
                            <button className="remove-from-cart-btn" onClick={() => handleRemoveFromCart(productInfo.id)}>
                                Удалить из корзины
                            </button>
                        ) : (
                            <button className="add-to-cart-btn" onClick={() => handleAddToCart(productInfo.id)}>
                                Добавить в корзину
                            </button>
                        )}
                    </div>

                </div>

            }
                <section className="product-comments">
                    <h2>Комментарии</h2>

                    <div className="comment">
                        <div className="comment-header">
                            <div className="comment-author">Иван Иванов</div>
                            <div className="comment-date">2023-05-15</div>
                        </div>
                        <div className="comment-body">
                            Отличный товар, полностью соответствует описанию. Доставка быстрая, упаковка надежная. Рекомендую!
                        </div>
                    </div>

                    <div className="comment">
                        <div className="comment-header">
                            <div className="comment-author">Мария Петрова</div>
                            <div className="comment-date">2023-04-20</div>
                        </div>
                        <div className="comment-body">
                            Товар хороший, но доставка слишком долгая. Пришлось ждать больше недели.
                        </div>
                    </div>

                    <form className="comment-form">
                        <h3>Оставить отзыв</h3>
                        <div className="form-group">
                            <label htmlFor="comment-text">Текст комментария:</label>
                            <textarea id="comment-text" name="comment-text" rows="4" required></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="comment-author">Ваше имя:</label>
                            <input type="text" id="comment-author" name="comment-author" required/>
                        </div>
                        <button type="submit" className="btn">Отправить</button>
                    </form>
                </section>
            </div>
        </Header>
    );
};