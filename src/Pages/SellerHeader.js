import Axios from "axios";
import React from 'react';
import Header from "./TemplatePage";
import '../styles/SellerHeader.css'
import {useNavigate} from "react-router-dom";

const SellerHeader = ({ children }) =>{
    const navigate = useNavigate();

    const manageProductsHandler =() =>{
        navigate('/manage_products');
    }
    const salesHandler =() =>{
        navigate('/manage_sales');
    }
    const stocksHandler =() =>{
        navigate('/manage_stocks');
    }
    const suppliersHandler =() =>{
        navigate('/manage_suppliers');
    }
    const salesReportHandler =() =>{
        navigate('/sales_report');
    }
    const logisticsReportHandler =() =>{
        navigate('/logistics');
    }

    return(
        <Header>
            <div className="tab">
                <button className="tablinks" id="defaultOpen" onClick={manageProductsHandler}>Управление товарами</button>
                <button className="tablinks" onClick={salesHandler}>Мои продажи</button>
                <button className="tablinks" onClick={stocksHandler}>Управление складами</button>
                <button className="tablinks" onClick={suppliersHandler}>Управление поставщиками</button>
                <button className="tablinks" onClick={salesReportHandler}>Отчет по продажам</button>
                <button className="tablinks" onClick={logisticsReportHandler}>Отчет по логистическим затратам</button>

            </div>
            <div className="children-element">
                {children}
            </div>
        </Header>
    );
};

export default SellerHeader
