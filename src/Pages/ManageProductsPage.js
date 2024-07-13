import Axios from "axios";
import React, {useEffect} from 'react';
import '../styles/Login.css'
import '../styles/ManageProducts.css'
import Header from "./TemplatePage";
import {updateUserFav, updateUserId} from "./Store";
import {updateCartId} from "./Store";
import { useSelector } from 'react-redux';
import {useNavigate} from "react-router-dom";
import SellerHeader from "./SellerHeader";

export const ManageProductsPage = () =>{
    const [name, setName] = React.useState("")
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [repeatedPassword, setRepeatedPassword] = React.useState("");
    const userId = useSelector(state => state.userId);
    const navigate = useNavigate();
    const [products, setProducts] = React.useState([])
    const sellerId = useSelector(state => state.sellerId)
    const fetchProducts = async () => {
        console.log("FETCH PRODUCTS")
        const response = await Axios.get(`https://localhost:7217/seller/products?sellerId=${sellerId}`);
        return response.data.elements;
    };

    useEffect(() => {
        const fetch = async () => {
            const prods = await fetchProducts();
            console.log("PRODUCTS")
            console.log(prods)
            setProducts(prods)
        };

        fetch();
    }, []);

    const AddProductHandler = (id) => {
        navigate(`/manage_prod/${id}`);
    }


    return(
        <SellerHeader>
            <div className="manage-products-header">
                <h2>Ваши товары</h2>
                <button className="manage-add-product-btn" onClick={AddProductHandler}>Добавить товары</button>
            </div>
            <ol className="ui-list shopping-cart--list" id="shopping-cart--list">
                { products.map(item => (
                    <li className="_grid shopping-cart--list-item">
                        <div className="_column product-image">
                            <img className="product-image--img" src={item.product.reference} alt="Item image" />
                        </div>
                        <div className="_column product-info">
                            <h4 className="product-name">{item.product.name}</h4>
                            <p className="product-desc">{item.product.description}</p>
                            <div className="price product-single-price"><strong>На складе:</strong> {item.count}</div>
                            <div className="price product-single-price"><strong>Цена хранения в месяц:</strong> {Math.round(item.product.price * 0.07 * item.product.volume)} BYN</div>
                            <div className="price product-single-price"><strong>Стоимость: </strong>{item.product.price} BYN</div>
                        </div>
                        <div className="product-actions-group">
                            <button className="product-action-btn" onClick={() => AddProductHandler(item.product.id)}>
                                Изменить
                            </button>
                            <button className="product-action-btn">
                                Заказать поставку
                            </button>
                            <button className="product-action-btn">
                                Отключить от продажи
                            </button>
                        </div>
                    </li>
                ))}

            </ol>
        </SellerHeader>
    );
};