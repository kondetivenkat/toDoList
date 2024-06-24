import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await fetch('http://localhost:5000/todos');
    const data = await response.json();
    setTodos(data);
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (newTodo.trim() === '') {
      alert('Please enter todo');
      return;
    }
    const response = await fetch('http://localhost:5000/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ task: newTodo }),
    });
    const data = await response.json();
    setTodos([...todos, data]);
    setNewTodo('');
  };

  const deleteTodo = async (id) => {
    await fetch(`http://localhost:5000/todos/${id}`, {
      method: 'DELETE',
    });
    setTodos(todos.filter(todo => todo._id !== id));
  };

  return (
    <div className="App">
      <div className="todo-container">
        <h1>You have {todos.length} Todos</h1>
        
        <ol>
          {todos.map(todo => (
            <li key={todo._id}>
              {todo.task}
              <span className="delete-btn" onClick={() => deleteTodo(todo._id)}>✖</span>
            </li>
          ))}
        </ol>
         
        <form onSubmit={addTodo}>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Enter Item"
          />
          <button type="submit">Submit</button>
        </form>
        </div>
    </div>
  );
}

export default App;
