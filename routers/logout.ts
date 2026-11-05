import express from "express";

export default function logout() {

    const router = express.Router();

    router.get("/", async (req, res) => {
        res.clearCookie("jwt");
        res.redirect("/login");
    });
    
    return router
}
