import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [user, setUser] = useState(null); 


  const fetchTasks = async () => {
    try {
      const res = await API.get("api/tasks");
      setTasks(res.data.tasks);
    } catch (err) {
      alert("Error fetching tasks");
    }
  };

  const fetchUser = async () => {
  try {
    const res = await API.get("/api/me");
    setUser(res.data);
  } catch (err) {
    console.log(err);
  }
};

  useEffect(() => {
    fetchTasks();
    fetchUser();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();

    try {
      await API.post("api/tasks", {
        title,
        description,
      });

      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (err) {
      alert("Error adding task");
    }
  };

  const toggleTask = async (id, currentStatus) => {
    try {
      await API.put(`api/tasks/${id}`, {
        status: currentStatus === "completed" ? "pending" : "completed",
      });

      fetchTasks();
    } catch (err) {
      alert("Error updating task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`api/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      alert("Error deleting task");
    }
  };

  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
navigate("/login");  }

return (
  <div className="min-h-screen flex bg-gradient-to-br from-gray-100 to-gray-200">

    {/* ================= SIDEBAR ================= */}
    <div className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white p-5 flex flex-col justify-between shadow-xl">

      <div>
        <h2 className="text-2xl font-bold mb-10 tracking-wide">
          TaskSaaS 🚀
        </h2>

        <ul className="space-y-4 text-gray-300">
          <li className="hover:text-white cursor-pointer transition">🏠 Dashboard</li>
          <li className="hover:text-white cursor-pointer transition">📋 My Tasks</li>
          <li className="hover:text-white cursor-pointer transition">👤 Profile</li>
        </ul>
      </div>

      <button
        onClick={logout}
        className="bg-red-500 hover:bg-red-600 transition p-2 rounded font-semibold"
      >
        Logout
      </button>
    </div>

    {/* ================= MAIN AREA ================= */}
    <div className="flex-1 p-6 h-screen overflow-hidden flex flex-col">

      {/* HEADER */}
      <div className="mb-6 bg-white p-6 rounded-2xl shadow-md border border-gray-100">
        <h1 className="text-3xl font-bold">
          Welcome back, {user?.name || "User"} 👋
        </h1>

        <p className="text-gray-500 mt-1">
          You’re doing great — keep your tasks under control
        </p>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

        <div className="bg-white p-4 rounded-xl shadow border">
          <h3 className="text-gray-500">Total Tasks</h3>
          <p className="text-2xl font-bold">{tasks.length}</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow border">
          <h3 className="text-gray-500">Completed</h3>
          <p className="text-2xl font-bold text-green-600">
            {tasks.filter(t => t.status === "completed").length}
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow border">
          <h3 className="text-gray-500">Pending</h3>
          <p className="text-2xl font-bold text-yellow-600">
            {tasks.filter(t => t.status !== "completed").length}
          </p>
        </div>

      </div>

      
      {/* CONTENT GRID */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 min-h-0 overflow-hidden">

  {/* ================= ADD TASK ================= */}
  <div className="bg-white p-6 rounded-2xl shadow-md border flex flex-col">
    <h2 className="text-xl font-semibold mb-4">➕ Create Task</h2>

    <form onSubmit={addTask} className="flex flex-col gap-3">
      <input
        className="border p-3 rounded"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        className="border p-3 rounded"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button className="bg-blue-600 text-white p-3 rounded font-semibold">
        Add Task
      </button>
    </form>
  </div>

  {/* ================= TASK LIST ================= */}
  <div className="bg-white p-6 rounded-2xl shadow-md border flex flex-col min-h-0">

    <h2 className="text-xl font-semibold mb-4">📋 Your Tasks</h2>

    {/* 👇 THIS IS THE KEY FIX */}
    <div className="flex-1 overflow-y-auto pr-2 space-y-3">

      {tasks.length === 0 ? (
        <p className="text-gray-400 text-center mt-10">
          No tasks yet 🚀
        </p>
      ) : (
        tasks.map((t) => (
          <div
            key={t.id}
            className={`p-4 border rounded-xl flex justify-between items-center ${
              t.status === "completed"
                ? "bg-green-100 line-through opacity-70"
                : "hover:bg-gray-50"
            }`}
          >
            <div>
              <h3 className="font-semibold">{t.title}</h3>
              <p className="text-sm text-gray-600">{t.description}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => toggleTask(t.id, t.status)}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                ✔
              </button>

              <button
                onClick={() => deleteTask(t.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                ✖
              </button>
            </div>
          </div>
        ))
      )}

    </div>
  </div>

</div>
    </div>
  </div>
);
}