import React from 'react';
import Header from "./TemplatePage";
import '../styles/MonitoringOfLogisticsCostsPage.css'
import SellerHeader from "./SellerHeader";

export const MonitoringOfLogisticsCostsPage = () => {
    return (
        <div>
            <SellerHeader>
                <div className="table-container">
                    <table className="monitor-table">
                        <tr className="monitor-tr">
                            <th></th>
                            <th>1-ый квартал (BYN)</th>
                            <th>2-ый квартал (BYN)</th>
                            <th>3-ый квартал (BYN)</th>
                            <th>4-ый квартал (BYN)</th>
                        </tr>
                        <tr className="monitor-tr">
                            <td>Хранение на складах</td>
                            <td>62</td>
                            <td>115</td>
                            <td>50</td>
                            <td>50</td>
                        </tr>
                        <tr className="monitor-tr">
                            <td>Затраты на перевозку</td>
                            <td>66</td>
                            <td>51</td>
                            <td>123</td>
                            <td>94</td>
                        </tr>
                        <tr className="monitor-tr">
                            <td>ИТОГО:</td>
                            <td>128</td>
                            <td>166</td>
                            <td>173</td>
                            <td>144</td>
                        </tr>
                    </table>
                </div>
            </SellerHeader>
        </div>
    );
};