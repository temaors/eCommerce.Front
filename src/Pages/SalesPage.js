import React from 'react';
import Header from "./TemplatePage";
import '../styles/SalesPage.css'
import SellerHeader from "./SellerHeader";

export const SalesPage = () => {
    return (
        <div>
            <SellerHeader>
                    <div className="key-metrics">
                        <div className="key-metric">
                            <h3>Объем продаж</h3>
                            <p>5378 BYN</p>
                        </div>
                        <div className="key-metric">
                            <h3>Новые клиенты</h3>
                            <p>12</p>
                        </div>
                        <div className="key-metric">
                            <h3>Средний заказ</h3>
                            <p>98 BYN</p>
                        </div>
                        <div className="key-metric">
                            <h3>Возврат клиентов</h3>
                            <p>50%</p>
                        </div>
                    </div>

                    <h2>Анализ продаж по категориям</h2>
                    <table>
                        <thead>
                        <tr>
                            <th>Категория</th>
                            <th>Объем продаж</th>
                            <th>Доля от общих продаж</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Мебель</td>
                            <td>3541 BYN</td>
                            <td>65%</td>
                        </tr>
                        <tr>
                            <td>Женщинам</td>
                            <td>987 BYN</td>
                            <td>18%</td>
                        </tr>
                        <tr>
                            <td>Мужчинам</td>
                            <td>715 BYN</td>
                            <td>13%</td>
                        </tr>
                        <tr>
                            <td>Прочее</td>
                            <td>135 BYN</td>
                            <td>4%</td>
                        </tr>
                        </tbody>
                    </table>

                    <h2>Ключевые инсайты и рекомендации</h2>
                    <ul>
                        <li>Категория <strong>Мебель</strong> является основным драйвером роста, поэтому стоит сосредоточиться на ее продвижении.</li>
                        <li>Рекомендуется увеличить количество торговых представителей для расширения охвата оффлайн-продаж.</li>
                    </ul>
            </SellerHeader>
        </div>
    );
};