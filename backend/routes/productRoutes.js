import express from "express";
const router = express.Router();
import {
  addProduct,
  checkAuth,
  addFavourite,
  getFavourites,
  getMyProducts,
  getProducts,
  getProductById,
  deleteProduct,
  addToCart,
  getCartItems,
  addOrder,
} from "../controllers/productControllers.js";
import { upload } from "../middlewares/multer.js";

router.get("/auth/me", checkAuth);
router.get("/user/products", getProducts);
router.get("/user/myProducts", getMyProducts);
router.post("/user/addProduct", upload.single("image"), addProduct);
router.post("/user/favourite/:productId", addFavourite);
router.get("/productDetails/:productId", getProductById);
router.post("/user/addToCart", addToCart);
router.get("/user/cartItems", getCartItems);
router.delete("/deleteProduct/:ProductId", deleteProduct);
router.get("/user/favourite", getFavourites);
router.post("/user/addOrder" , addOrder)
export default router;
