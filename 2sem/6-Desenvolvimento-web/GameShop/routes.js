import { Router, json } from "express";
import cors from "cors";

import { adminIndex, adminStore } from "./controllers/AdminController.js";
import { loginAdmin, loginUser } from "./controllers/LoginController.js";

import upload from "./middlewares/ImageStore.js";
import { authLogin } from "./middlewares/AuthLogin.js";
import {
  userDelete,
  userIndex,
  userCreate,
  userUpdate,
  userVerify,
  userInventory,
} from "./controllers/UserController.js";
import { itemDelete, itemIndex, itemCreate, itemUpdate } from "./controllers/ItemController.js";
import {
  addItemToShop,
  shopCreate,
  shopDelete,
  shopInventory,
  shopIndex,
  shopUpdate,
  buyItem,
  salesReport,
  getShopView,
} from "./controllers/ShopController.js";
import {
  avatarCreate,
  avatarDelete,
  avatarIndex,
  avatarUpdate,
} from "./controllers/ImageController.js";
import { iconCreate, iconDelete, iconIndex, iconUpdate } from "./controllers/IconController.js";

const router = Router();

router.use(json());
router.use(cors());

// User
router
  .get("/user", userIndex)
  .post("/user", userCreate)
  .get("/userverify/:hash", userVerify)
  .put("/user/:id", authLogin, userUpdate)
  .delete("/user/:id", authLogin, userDelete)
  .get("/user/:id", userInventory);

// Login
router.get("/loginAdmin", loginAdmin).get("/login", loginUser);

// Item
router
  .get("/item", itemIndex)
  .post("/item", itemCreate)
  .put("/item/:id", itemUpdate)
  .delete("/item/:id", itemDelete);

// Shop
router
  .get("/shop", shopIndex)
  .post("/shop", shopCreate)
  .put("/shop/:id", shopUpdate)
  .delete("/shop/:id", shopDelete)
  .get("/shop/:id", shopInventory)
  .post("/buy", buyItem)
  .get("/salesReport", salesReport)
  .get("/renderView", getShopView);

// Avatar
router
  .get("/avatar", avatarIndex)
  .post("/avatar", upload.single("image"), avatarCreate)
  .put("/avatar/:id", upload.single("image"), avatarUpdate)
  .delete("/avatar/:id", avatarDelete);

// Icon
router
  .get("/icon", iconIndex)
  .post("/icon", upload.single("image"), iconCreate)
  .put("/icon/:id", upload.single("image"), iconUpdate)
  .delete("/icon/:id", iconDelete);

// Interactions
router.post("/addItemToShop", addItemToShop);
export default router;
