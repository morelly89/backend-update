import { Router } from "express";
import profileRoute from "./profile.route";
import groupRoute from "./group.route";
import privacyRoute from "./privacy.route";
import authRoute from "./auth.route";
import needsRoute from "./needs.route";
import stagesRoute from "./stages.route";

const router = Router();

router.use("/auth", authRoute);
router.use("/profile", profileRoute);
router.use("/profiles", profileRoute);
router.use("/group", groupRoute);
router.use("/groups", groupRoute);
router.use("/privacy", privacyRoute);
router.use("/needs", needsRoute);
router.use("/stages", stagesRoute);

export default router;
