import { useEffect, useState } from "react";
import { FaEye, FaTrash, FaEdit } from "react-icons/fa";
import "./TaskList.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editTask, setEditTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/tasks", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) {
      return Number(a.completed) - Number(b.completed);
    }
    return new Date(a.dueDate || 0) - new Date(b.dueDate || 0);
  });

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const handleComplete = async (taskId, currentStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${taskId}/complete`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ completed: !currentStatus }),
      });
      if (response.ok) {
        fetchTasks();
      } else {
        console.error("Failed to update task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (response.ok) {
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
      } else {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${editTask._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ title: editTitle, description: editDescription }),
      });
      if (response.ok) {
        fetchTasks();
        setEditTask(null);
      } else {
        console.error("Failed to update task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="task-container">
      <h2>My Tasks</h2>
      <p>Here are all your tasks arranged in order of urgency</p>
      {totalTasks > 0 && (
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          <p>{progress.toFixed(0)}% Completed</p>
        </div>
      )}
      <ul>
        {sortedTasks.map((task) => (
          <li key={task._id} className="task-item">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleComplete(task._id, task.completed)}
            />
            <div
              className={`task-title ${task.completed ? "completed" : ""}`}
            >
              {task.title}
            </div>
            <button className="icon-btn" onClick={() => setSelectedTask(task)}>
              <FaEye />
            </button>
            <button className="icon-btn edit-btn" onClick={() => {
              setEditTask(task);
              setEditTitle(task.title);
              setEditDescription(task.description || "");
            }}>
              <FaEdit />
            </button>
            <button className="icon-btn delete-btn" onClick={() => handleDelete(task._id)}>
              <FaTrash />
            </button>
          </li>
        ))}
      </ul>
      {selectedTask && (
        <div className="task-details">
          <h3>Task Details</h3>
          <p><strong>Title:</strong> {selectedTask.title}</p>
          <p><strong>Description:</strong> {selectedTask.description || "No description"}</p>
          <p><strong>Due Date:</strong> {selectedTask.dueDate ? new Date(selectedTask.dueDate).toLocaleString() : "No due date"}</p>
          <p><strong>Created At:</strong> {new Date(selectedTask.createdAt).toLocaleString()}</p>
          <button onClick={() => setSelectedTask(null)}>Close</button>
        </div>
      )}
      {editTask && (
        <div className="task-edit-modal">
          <h3>Edit Task</h3>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Task Title"
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="Task Description"
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setEditTask(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default TaskList;