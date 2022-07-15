const express = require("express");
const router = express.Router();
const {
    getAllTasks,
    createTask,
    getSingleTask,
    updataTask,
    deleteTask,
} = require("../controllers/tasks");

router.get("/", getAllTasks);
router.post("/", createTask);
router.get("/:id", getSingleTask);
router.patch("/:id", updataTask);
router.delete("/:id", deleteTask);

module.exports = router;