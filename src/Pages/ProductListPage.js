import Axios from "axios";
import { useEffect, useState } from "react"
import React from 'react';
import Header from "./TemplatePage";
import {Link} from "react-router-dom";

export const ProductListPage = () => {

    const [productList, setProductList] = useState([]);

    const fetchProductsList = async () => {
        const response = await Axios.get("https://localhost:7217/products");
        return response.data.products;
    };

    useEffect(() => {
        const fetchProducts = async () => {
            const products = await fetchProductsList();
            setProductList(products);
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <Header>
                <div className="products-table">
                    { productList.map(item => (
                        <div className="column">
                             <Link to={`/products/view/${item.id}`} className="content container">
                                <img src={item.reference} className="image" alt="Mountains" style={{width:'100%'}}/>
                                <h4>{item.name}</h4>
                                <h3>{item.manufacturer}</h3>
                                <h3>{item.price} BYN</h3>
                                 <p id="productId" className="hidden">{item.id}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            </Header>
        </div>
    );
};