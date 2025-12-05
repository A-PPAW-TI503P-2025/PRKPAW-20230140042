const express = require("express");
const router = express.Router();

const presensiController = require("../controllers/presensiController");
const { authenticateToken, isAdmin } = require("../middleware/permissionMiddleware");

// Semua route harus login
router.use(authenticateToken);

// User check-in / check-out
router.post("/check-in", presensiController.CheckIn);
router.post("/check-out", presensiController.CheckOut);

// Admin bisa update presensi
router.put("/:id", isAdmin, presensiController.updatePresensi);

// User hanya bisa menghapus presensinya sendiri
router.delete("/:id", presensiController.hapusPresensi);

module.exports = router;
