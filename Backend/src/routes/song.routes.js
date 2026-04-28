const express = require("express")
const upload = require("../middlewares/upload.middleware")
const songContoller = require("../controllers/song.controller")


const router = express.Router()


/**
 * POST /api/songs/
 */
router.post("/", upload.single("song"), songContoller.uploadSong)

module.exports = router