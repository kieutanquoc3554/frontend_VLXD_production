import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import "@ant-design/v5-patch-for-react-19";
import Layout from "./pages/Layout";
import Product from "./pages/Product";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import Suppliers from "./pages/Suppliers.jsx";
import Customer from "./pages/Customer.jsx";
import Inventory from "./pages/Inventory.jsx";
import Employee from "./pages/Employee.jsx";
import ProtectedRoutes from "./components/ProtectedRoutes.jsx";
import Categories from "./pages/Categories.jsx";
import Cat from "./pages/Cat.jsx";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ProtectedRoutes />}>
            <Route path="/" element={<Layout />}>
              <Route path="products" element={<Product />}></Route>
              <Route path="categories" element={<Categories />}></Route>
              <Route path="suppliers" element={<Suppliers />}></Route>
              <Route path="customer" element={<Customer />}></Route>
              <Route path="inventory" element={<Inventory />}></Route>
              <Route path="employee" element={<Employee />}></Route>
              <Route path="cat" element={<Cat />}></Route>
              <Route index element={<Navigate to="/products" />} />
            </Route>
          </Route>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
