const { Presensi, User } = require("../models");
const { Op } = require("sequelize");

// CHECK IN
exports.CheckIn = async (req, res) => {
  try {
    const userId = req.user.id;

    // Cek apakah sudah check-in hari ini
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const sudahCheckin = await Presensi.findOne({
      where: {
        userId,
        checkIn: {
          [Op.gte]: today
        }
      }
    });

    if (sudahCheckin) {
      return res.status(400).json({
        message: "Anda sudah melakukan check-in hari ini!"
      });
    }

    const presensi = await Presensi.create({
      userId,
      checkIn: new Date(),
      latitude: req.body.latitude || null,
      longitude: req.body.longitude || null
    });

    res.json({
      message: "Check-in berhasil",
      data: presensi
    });

  } catch (error) {
    console.error(error); // penting supaya tahu error sebenarnya
    res.status(500).json({ message: "Gagal check-in", error });
  }
};

// CHECK OUT
exports.CheckOut = async (req, res) => {
  try {
    const userId = req.user.id;

    const presensi = await Presensi.findOne({
      where: { userId },
      order: [["createdAt", "DESC"]]
    });

    if (!presensi || presensi.checkOut) {
      return res.status(400).json({ message: "Belum check-in atau sudah check-out!" });
    }

    presensi.checkOut = new Date();
    await presensi.save();

    res.json({
      message: "Check-out berhasil",
      data: presensi
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal check-out", error });
  }
};

// UPDATE (ADMIN SAJA)
exports.updatePresensi = async (req, res) => {
  try {
    const id = req.params.id;

    const presensi = await Presensi.findByPk(id);
    if (!presensi) return res.status(404).json({ message: "Data presensi tidak ditemukan" });

    await presensi.update(req.body);

    res.json({ message: "Presensi diperbarui", data: presensi });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal update presensi", error });
  }
};

// HAPUS (HANYA PEMILIK)
exports.hapusPresensi = async (req, res) => {
  try {
    const id = req.params.id;

    const presensi = await Presensi.findByPk(id);
    if (!presensi) return res.status(404).json({ message: "Data tidak ditemukan" });

    // Cek kepemilikan
    if (presensi.userId !== req.user.id) {
      return res.status(403).json({ message: "Tidak boleh menghapus presensi orang lain!" });
    }

    await presensi.destroy();
    res.json({ message: "Presensi berhasil dihapus" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal menghapus presensi", error });
  }
};
