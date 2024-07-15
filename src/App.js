import './App.css';
import './styles/header.css'
import './styles/productsList.css'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { ProductListPage } from "./Pages/ProductListPage"
import { ProductInfoPage } from "./Pages/ProductInfoPage"
import { LoginPage } from "./Pages/LoginPage";
import { MonitoringOfLogisticsCostsPage } from "./Pages/MonitoringOfLogisticsCostsPage";
import { OrderMonitoringPage } from "./Pages/OrderMonitoringPage";
import { PersonalAccountPage } from "./Pages/PersonalAccountPage";
import { RegisterSellerPage } from "./Pages/RegisterSellerPage";
import { RegisterPage } from "./Pages/RegisterPage";
import { CartPage } from "./Pages/CartPage";
import { SellerPage } from "./Pages/SellerPage";
import { ManageProductsPage } from "./Pages/ManageProductsPage";
import { AddChangeProductPage } from "./Pages/AddChangeProductpage";
import { ProfilePage } from "./Pages/PersonalAccount/ProfilePage";
import { FavouritesPage } from "./Pages/PersonalAccount/FavouritesPage";
import { SalesPage } from "./Pages/SalesPage";

function App() {

  return (
        <div className="App">
          <Router>
            <Routes>
                <Route path="/products" element={<ProductListPage />} />
                <Route path="/products/view/:productId" element={<ProductInfoPage />} />
                <Route path="/sign_in" element={<LoginPage />} />
                <Route path="/sign_up" element={<RegisterPage/>} />
                <Route path="/logistics_costs_monitor" element={<MonitoringOfLogisticsCostsPage />} />
                <Route path="/order_monitor" element={<OrderMonitoringPage />} />
                <Route path="/personal_account" element={<PersonalAccountPage />} />
                <Route path="/register_seller" element={<RegisterSellerPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/seller" element={<SellerPage />} />
                <Route path="/manage_products" element={<ManageProductsPage />} />
                <Route path="/manage_prod/:id" element={<AddChangeProductPage/>} />
                <Route path="/logistics" element={<MonitoringOfLogisticsCostsPage/>} />
                <Route path="/order_monitoring" element={<OrderMonitoringPage/>} />
                <Route path="/profile" element={<ProfilePage/>} />
                <Route path="/products/favourites" element={<FavouritesPage/>} />
                <Route path="/sales_report" element={<SalesPage/>} />
            </Routes>
          </Router>
        </div>
  );
}

export default App;
