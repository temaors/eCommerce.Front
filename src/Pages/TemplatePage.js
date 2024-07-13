import React, { useEffect, useState } from "react"
import Axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const Header = ({ children }) => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const userId = useSelector(state => state.userId);
    const cartId = useSelector(state => state.cartId);
    const userType = useSelector(state => state.userType);
    const dispatch = useDispatch();

    const handlerAccountClick = () =>{
        console.log('userId')
        console.log(userId)
        if (userId === 0)
            navigate('/sign_in')
        else
            navigate('/profile')
    }
    const mainPageHandlerClick =() =>{
        navigate('/products');
    }
    const handleSellerClick = () => {
        navigate('/register_seller');
    };

    const handleSellerProfileClick = () => {
        navigate('/seller');
    };

    const handleCartClick = () => {
        if(userId === 0 || cartId === 0)
            navigate('/sign_in')
        else
            navigate('/cart');
    };


    const fetchCategoriesList = async () => {
        const response = await Axios.get("https://localhost:7217/category/all");

        return response.data;
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const allCategoriesResponse = await fetchCategoriesList()
                console.log(allCategoriesResponse.categories)
                setCategories(allCategoriesResponse.categories);
            } catch (error) {
                console.log("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div>
            <div className="topnav">
                <button className="right-split" onClick={mainPageHandlerClick}>eCommerce</button>
                <div className="dropdown">
                    <button className="dropbtn">
                        <i className="fa-solid fa-bars"></i>
                    </button>
                    <div className="dropdown-content">
                        {categories.map((category) => (
                        <a key={category.id} href="">
                            {category.name}
                        </a>))}
                    </div>
                </div>


                <div className="search-container">
                    <form action="/">
                        <input type="text" placeholder="Поиск.." name="search"/>
                        <button type="submit"><i className="fa fa-search"></i></button>
                    </form>
                </div>

                <button className="split" onClick={handlerAccountClick}><div className="template-icon"><i className="fa-solid fa-user"></i></div></button>
                <button className="split" onClick={handleCartClick}><div className="template-icon"><i className="fa-solid fa-cart-shopping"></i></div></button>
                {userType === 0 ? (
                    <button className="right-split" onClick={handleSellerClick}>Стать продавцом</button>
                ) : (
                    <button className="right-split" onClick={handleSellerProfileClick}>Профиль продавца</button>
                )}

            </div>
            {children}
        </div>
    );
};

export default Header;