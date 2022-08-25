// app.get("/tasks", getTasks)
// app.post("/tasks", createTask)
// app.patch("/task/:taskId", updateTask)
// app.delete("/tasks/:taskId", deleteTask)

export function getTasks(req, res) {
    res.send("Tasks")
}

export function createTask(req, res) {
    const newTask = req.body;
    res.status(201).send("Task added")
}

export function updateTask(req, res) {
    const taskUpdate = req.body;
    const {taskId} = req.params;
    res.status(202).send("Task updated")
}

export function deleteTask(req, res) {
    const {taskId} = req.params;
    res.status(203).send("Task deleted")
}