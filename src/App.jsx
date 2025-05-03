import React, { useState } from 'react';

const ReminderApp = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [filter, setFilter] = useState('all');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!taskName || !dueDate) return; // Do nothing if name or date is empty

    const newTask = {
      id: Date.now(),
      taskName,
      dueDate,
      completed: false,
    };

    setTasks((prev) => [...prev, newTask]);
    setTaskName('');
    setDueDate('');
  };

  const toggleCompletion = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  return (
    <div>
      <h1>Reminder App</h1>
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Task Name"
          required
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
        <button type="submit">Add Task</button>
      </form>

      <div>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={() => setFilter('incomplete')}>Incomplete</button>
      </div>

      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <div>
              <span>{task.taskName} - {task.dueDate}</span>
              <button onClick={() => toggleCompletion(task.id)}>
                {task.completed ? 'Mark Incomplete' : 'Mark Completed'}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReminderApp;
