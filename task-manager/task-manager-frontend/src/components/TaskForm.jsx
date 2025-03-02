import { useState } from "react";
import "./TaskForm.css";

const TaskForm = ({ refreshTasks }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(""); // State for due date/time

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return;
  
    const token = localStorage.getItem("token"); // Retrieve token
  
    if (!token) {
      alert("Access Denied: No Token Provided");
      return;
    }
  
    const formattedDueDate = new Date(dueDate).toISOString();
  
    const response = await fetch("http://localhost:5000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Attach token
      },
      body: JSON.stringify({ title, description, dueDate: formattedDueDate }),
    });
  
    if (response.ok) {
      setTitle("");
      setDescription("");
      setDueDate(""); // Reset due date field
      refreshTasks();
      alert("✅ Task added successfully!"); // ✅ Success alert
    } else {
      const errorData = await response.json();
      alert("❌ Error: " + errorData.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Enter a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <label className="due-date" htmlFor="due-date"> Due Date</label>
<input
  id="due-date"
  type="datetime-local"
  value={dueDate}
  onChange={(e) => setDueDate(e.target.value)}
/>

      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;