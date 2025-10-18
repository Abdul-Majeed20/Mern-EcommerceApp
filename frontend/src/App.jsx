import "./App.css";
import Login from "./app/Login";
import Register from "./app/Register";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoutes";
import Search from "./components/Search";
import SellProduct from "./app/sellProduct";
import UserDashboard from "./app/userDashboard";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./app/Home";
import Product from "./app/Product";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/product/:id" element={<Product />}></Route>
          <Route
            path="/sellProduct"
            element={
              <ProtectedRoute>
                <SellProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
