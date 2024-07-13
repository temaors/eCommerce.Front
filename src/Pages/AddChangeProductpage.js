import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SellerHeader from "./SellerHeader";
import "../styles/AddChangeProduct.css";
import Axios from "axios";

export const AddChangeProductPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        subcategoryId: '',
        price: '',
        unit: '',
        rating: '',
        reference: '',
        manufacturer: '',
        volume: '',
        image: null,
    });

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: name === 'image'
                ? files[0]
                : name === 'reference'
                    ? files[0].name
                    : value,
        }));
    };

    const fetchCategoriesList = async () => {
        const response = await Axios.get("https://localhost:7217/category/all");
        return response.data;
    };

    const fetchProductData = async (productId) => {
        console.log(productId)
        const productInfoResponse = await Axios.get(`https://localhost:7217/products/view?productId=${productId}`);
        console.log("RESPONSE")
        console.log(productInfoResponse)


        return productInfoResponse.data;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (isEditMode) {
                await Axios.put(`https://localhost:7217/product/${id}`, formData);
            } else {
                await Axios.post("https://localhost:7217/product", formData);
            }
            navigate('/seller/products');
        } catch (error) {
            console.log("Error saving product:", error);
        }
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const allCategoriesResponse = await fetchCategoriesList()
                setCategories(allCategoriesResponse.categories);
            } catch (error) {
                console.log("Error fetching categories:", error);
            }
        };

        const fetchProductDetails = async () => {
            console.log("IDIDIDIDID: " + id)
            try {
                if (id) {
                    setIsEditMode(true);
                    const productData = await fetchProductData(id);
                    setFormData(productData);
                }
            } catch (error) {
                console.log("Error fetching product details:", error);
            }
        };

        fetchCategories();
        fetchProductDetails();
    }, [id]);


    return (
        <SellerHeader>
            <form id="product-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label for="name">Название:</label>
                    <input type="text" className="form-control" id="name" name="name" required value={formData.name} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label for="description">Описание:</label>
                    <textarea className="form-control" id="description" name="description" rows="3" required value={formData.description} onChange={handleChange}></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="subcategoryId">Категория:</label>
                    <select
                        className="form-control"
                        id="subcategoryId"
                        name="subcategoryId"
                        required
                        value={formData.subcategoryId}
                        onChange={handleChange}
                    >
                        <option value="">Выберите категорию</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label for="price">Цена:</label>
                    <input type="number" step="0.01" className="form-control" id="price" name="price" required value={formData.price} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label for="unit">Ед. измерения:</label>
                    <select className="form-control" id="unit" name="unit" required value={formData.unit} onChange={handleChange}>
                        <option value="">Выберите ед. измерения</option>
                        <option value="PIECE">Штука</option>
                        <option value="GRAM">Граммы</option>
                        <option value="KILOGRAM">Килограммы</option>
                        <option value="LITER">Литры</option>
                        <option value="MILLILITER">Милилитры</option>
                    </select>
                </div>


                <div className="form-group">
                    <label htmlFor="image">Изображение:</label>
                    <input
                        type="file"
                        className="form-control-file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label for="manufacturer">Изготовитель:</label>
                    <input type="text" className="form-control" id="manufacturer" name="manufacturer" required value={formData.manufacturer} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label for="volume">Объем товара:</label>
                    <input type="number" step="0.01" className="form-control" id="volume" name="volume" required value={formData.volume} onChange={handleChange} />
                </div>

                <button type="submit" className="btn btn-primary">
                    {isEditMode ? 'Сохранить' : 'Создать'}
                </button>
            </form>
        </SellerHeader>
    );
}