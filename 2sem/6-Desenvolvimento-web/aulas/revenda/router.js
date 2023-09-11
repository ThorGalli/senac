import { Router, json } from "express";
import { feedPost, feedIndex, feedUpdate, feedDelete, feedShow } from "./pages/feed.js";
import { homeIndex } from "./pages/home.js";
import { linksIndex } from "./pages/links.js";
import { loginIndex } from "./pages/login.js";
const router = Router();
router.use(json());

router.get("/", homeIndex);
router
  .get("/feed", feedIndex)
  .post("/feed", feedPost)
  .put("/feed/:id", feedUpdate)
  .delete("/feed/:id", feedDelete)
  .get("/feed/:id", feedShow);
router.get("/login", loginIndex);
router.get("/links", linksIndex);

export default router;
