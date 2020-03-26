const express = require("express");
const router = express.Router();
const Task = require("../../models/Task");

// POST route to add a task (Create)
router.post("/add-task", (req, res) => {
    Task.create(req.body)
        .then(newlyCreatedTask => {
            res.status(200).json(newlyCreatedTask);
        })
        .catch(err => res.status(400).json(err));
});

// GET route to get all the tasks (Read)
router.get("/get-tasks", (req, res) => {
    Task.find()
        .then(allTasksFromDB => {
            console.log({ allTasksFromDB });
            res.status(200).json(allTasksFromDB);
        })
        .catch(err => res.status(400).json(err));
});

// GET route to get one task (Read)
router.get("/task/:taskId", (req, res) => {
    Task.findById(req.params.taskId)
        .then(taskFromDB => {
            res.status(200).json(taskFromDB);
        })
        .catch(err => res.status(400).json(err));
});

// POST(PUT) route to update a task (Update)  - PUT and PATCH work the same as a POST, PUT and PATCH are used to update.
router.put("/task/update/:taskId", (req, res) => {
    Task.findByIdAndUpdate(req.params.taskId, req.body, { new: true })
        .then(updatedTask => {
            res.status(200).json(updatedTask);
        })
        .catch(err => res.status(400).json(err));
});

// DELETE route to delete the task (Delete)
router.delete("/task/delete/:taskId", (req, res) => {
    Task.findByIdAndRemove(req.params.taskId)
        .then(() => {
            res.status(200).json({ message: "Task has been deleted" });
        })
        .catch(err => res.status(400).json(err));
});

module.exports = router;
