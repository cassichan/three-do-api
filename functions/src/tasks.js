import dbConnect from "./dbConnect/fsConnect.js";

// app.get("/tasks", getTasks)
// app.post("/tasks", createTask)
// app.patch("/task/:taskId", updateTask)
// app.delete("/tasks/:taskId", deleteTask)

export async function getTasks(req, res) {
  const db = dbConnect();
  const collection = await db
    .collection("tasks")
    .get()
    .catch((err) => res.status(500).send(err));
  const tasks = collection.docs.map((doc) => {
    let task = doc.data();
    task.id = doc.id;
    return task;
    //return {...doc.data(), id: doc.id}
  });
  res.send(tasks);
}

export async function createTask(req, res) {
  const newTask = req.body;
  if (!newTask || !newTask.task) {
    //make task required
    res.status(400).send({ success: false, message: "Invalid request" });
  }
  const db = dbConnect();
  await db
    .collection("tasks")
    .add(newTask)
    .catch((err) => res.status(500).send(err));
  res.status(201);
  getTasks(req, res); //let this function handle the response. send back the full list of tasks after this one is added
  //.send({success: true, message:"Task added"});
}

export function updateTask(req, res) {
  const taskUpdate = req.body;
  const { taskId } = req.params;
  res.status(202).send("Task updated");
}

export function deleteTask(req, res) {
  const { taskId } = req.params;
  res.status(203).send("Task deleted");
}
