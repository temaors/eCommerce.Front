import Axios from "axios";
import { useEffect, useState } from "react"
import React from 'react';
import '../styles/Cart.css'
import Header from "./TemplatePage";
// import '../styles/productInfo.css'
import {useSelector} from "react-redux";

export const CartPage = () => {

    const [cart, setCart] = useState([]);
    const [summary, setSummary] = useState(0);
    const [shipping, setShipping] = useState(0);
    const cartId = useSelector(state => state.cartId);
    const userId = useSelector(state => state.userId);

    const [quantity, setQuantity] = useState({});
    const [isFavourite, setIsFavourite] = useState({});
    const [favourites, setFavourites] = useState([]);
    const userFavouritesId = useSelector(state => state.userFav)
    const [orderSuccess, setOrderSuccess] = useState(false);

    const fetchCart = async () => {
        const response = await Axios.get(`https://localhost:7217/cart?cartId=${cartId}`);
        return response.data;
    };

    useEffect(() => {
        const fetch = async () => {
            const cart = await fetchCart();
            console.log(cart)
            console.log("CARTCART")
            setCart(cart.products);
            let shippingCoef = 0.1;
            let totalShippingCost = 0;
            let totalPrice = 0;
            const initialQuantity = {};
            const initialFavourites = {};
            cart.products.forEach(item => {
                totalPrice += item.product.price * item.count;
                totalShippingCost += item.product.volume * item.count * shippingCoef;
                console.log("volume: " + item.product.volume * shippingCoef)
                initialQuantity[item.product.id] = item.count;
                initialFavourites[item.product.id] = item.count;
            });
            setSummary(totalPrice + totalShippingCost);
            setShipping(totalShippingCost)
            setQuantity(initialQuantity);
            if(cart.length === 0)
                console.log("Cart is empty")
        };

        fetch();
    }, []);

    const AddToFavourites = async (productId) =>{
        console.log("Add product to favourites: userId(" + userId + "), productId(" + productId + ")")
        const response = await Axios.patch(`https://localhost:7217/products/add_to_favourites?userFavouritesId=${userFavouritesId}&productId=${productId}`);
        if (response.status === 200) {
            setIsFavourite(true);
        } else {
            console.error('Error adding product to cart:', response.status);
        }
    }

    const RemoveFromFavourites = async (productId) =>{
        console.log("Add product to favourites: userId(" + userId + "), productId(" + productId + ")")
        const response = await Axios.patch(`https://localhost:7217/products/remove_from_favourites?userFavouritesId=${userFavouritesId}&productId=${productId}`);
        if (response.status === 200) {
            setIsFavourite(false);
        } else {
            console.error('Error adding product to cart:', response.status);
        }
    }

    const handleRemoveFromCart = async (productId) => {
        console.log("Delete product from cart: cartId(" + cartId + "), productId(" + productId + ")")
        const response = await Axios.patch(`https://localhost:7217/cart/delete_product?cartId=${cartId}&productId=${productId}`);
        if (response.status === 200) {
            setQuantity(1)
        } else {
            console.error('Error removing product from cart:', response.status);
        }
    };

    const increaseQuantity = async (productId) => {
        const newQuantity = (quantity[productId] || 1) + 1;
        const response = await Axios.patch(`https://localhost:7217/cart/change_product_quantity?cartId=${cartId}&productId=${productId}&count=${newQuantity}`)
        if (response.status === 200) {
            setQuantity({ ...quantity, [productId]: newQuantity });
            updateSummary(productId, newQuantity);
        } else {
            console.error('Error changing product quantity in cart:', response.status);
        }
    };

    const decreaseQuantity = async (productId) => {
        const currentQuantity = quantity[productId] || 1;
        if (currentQuantity > 1) {
            const newQuantity = currentQuantity - 1;
            const response = await Axios.patch(`https://localhost:7217/cart/change_product_quantity?cartId=${cartId}&productId=${productId}&count=${newQuantity}`)
            if (response.status === 200) {
                setQuantity({ ...quantity, [productId]: newQuantity });
                updateSummary(productId, newQuantity);
            } else {
                console.error('Error changing product quantity in cart:', response.status);
            }
        }
    };

    const handleOrder = async () => {
        try {
            const cartData = {
                Id: cartId,
                UserId: userId,
                Products: cart.map((item) => ({
                    Id: item.product.id,
                    Product: item.product,
                    Count: quantity[item.product.id] || 1,
                })),
            };

            await Axios.post('https://localhost:7217/sale', cartData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            // Проверить на успешную отправку запроса и выполнить дальнейшие действия
            console.log('Заказ успешно отправлен');
            await  Axios.patch(`https://localhost:7217/cart/clear?cartId=${cartId}`);
            console.log("CLEAR CART")
            setOrderSuccess(true);
        } catch (error) {
            console.error('Ошибка при отправке заказа:', error);
            // Обработка ошибки
        }
    };

    const updateSummary = (productId, newQuantity) => {
        const updatedCart = cart.map(item => {
            if (item.product.id === productId) {
                return { ...item, count: newQuantity };
            }
            return item;
        });

        let shippingCoef = 0.1;
        let totalShippingCost = 0;
        let totalPrice = 0;

        updatedCart.forEach(item => {
            totalPrice += item.product.price * item.count;
            totalShippingCost += item.product.volume * shippingCoef;
        });

        setSummary(totalPrice + totalShippingCost);
        setShipping(totalShippingCost);
        setCart(updatedCart);
    };

    if (orderSuccess) {
        return (
            <div>
                <Header>
                    <h2>Ваш заказ №10000112 успешно оформлен!</h2>
                </Header>
            </div>
        );
    } else if (cart.length === 0) {
        return (
            <div>
                <Header>
                    <h1>Ваша корзина пуста</h1>
                </Header>
            </div>
        );
    } else {
        return (
            <div>
                <Header>
                    <div className="cart-main">
                        <h1>Ваша корзина</h1>

                        <section className="shopping-cart">
                            <ol className="ui-list shopping-cart--list" id="shopping-cart--list">
                                {cart.map(item => (
                                    <li className="_grid shopping-cart--list-item">
                                        <div className="_column product-image">
                                            <img className="product-image--img" src={item.product.reference}
                                                 alt="Item image"/>
                                        </div>
                                        <div className="_column product-info">
                                            <h4 className="product-name">{item.product.name}</h4>
                                            <p className="product-desc">{item.product.manufacturer}</p>
                                            <div className="price product-single-price">
                                                <strong>{item.product.price}</strong> BYN
                                            </div>
                                        </div>
                                        <div className="product-actions">
                                            <div className="heart-button-container">
                                                {isFavourite ? (
                                                    <button className="heart-button">
                                                        <div className="heart-button-icon"
                                                             onClick={() => RemoveFromFavourites(item.product.id)}><i
                                                            className="fa-solid fa-heart"></i></div>
                                                    </button>
                                                ) : (
                                                    <button className="heart-button">
                                                        <div className="heart-button-icon"
                                                             onClick={() => AddToFavourites(item.product.id)}><i
                                                            className="far fa-heart heart-button-icon"></i></div>
                                                    </button>
                                                )}
                                            </div>


                                            <div className="product-quantity">
                                                <label>Количество:</label>
                                                <button className="product-quantity-button"
                                                        onClick={() => decreaseQuantity(item.product.id)}><i
                                                    className="fa-solid fa-minus"></i></button>
                                                <span>{quantity[item.product.id] || 1}</span>
                                                <button className="product-quantity-button"
                                                        onClick={() => increaseQuantity(item.product.id)}><i
                                                    className="fa-solid fa-plus"></i></button>
                                            </div>
                                            <button className="remove-from-cart-btn"
                                                    onClick={() => handleRemoveFromCart(item.product.id)}>
                                                Удалить из корзины
                                            </button>

                                        </div>
                                    </li>
                                ))}

                            </ol>

                            <footer className="_grid cart-totals">
                                <div className="_column shipping" id="shippingCtr">
                                    <div className="cart-totals-key">Доставка</div>
                                    <div className="cart-totals-value">{shipping} BYN</div>
                                </div>
                                <div className="_column total" id="totalCtr">
                                    <div className="cart-totals-key">Сумма</div>
                                    <div className="cart-totals-value">{summary} BYN</div>
                                </div>
                                <div className="_column checkout">
                                    <button className="order-button" onClick={() => handleOrder()}>Заказать</button>
                                </div>
                            </footer>

                        </section>
                    </div>
                </Header>
            </div>
        );
    }
};