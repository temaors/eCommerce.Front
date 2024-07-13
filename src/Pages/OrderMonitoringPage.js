import React from 'react';
import {PersonalAccountPage} from "./PersonalAccountPage";
import '../styles/OrderMonitoring.css'
export const OrderMonitoringPage = () => {
    return (
        <div>
            <PersonalAccountPage>
                <h3 className="header-monitor-color">Заказ № 10000112</h3>
                <div className="order-monitor-container">
                    <div className="progress-container">
                    <div className="progress" id="progress_step_path"></div>
                    <ul className="step-progress">
                        <li className="step active_step">
                            <span className="circle2 active"></span>
                            <span className="text">Оформлен<div className="text-date">30.05 18:50</div></span>
                        </li>
                        <li className="step">
                            <span className="circle2"></span>
                            <span className="text">Отправлен на сборку</span>
                        </li>
                        <li className="step">
                            <span className="circle2"></span>
                            <span className="text">Собран</span>
                        </li>
                        <li className="step">
                            <span className="circle2"></span>
                            <span className="text">В пути</span>
                        </li>
                        <li className="step">
                            <span className="circle2"></span>
                            <span className="text">Доставлен</span>
                        </li>
                      </ul>
                  </div>
                </div>
            </PersonalAccountPage>
        </div>
    );
};