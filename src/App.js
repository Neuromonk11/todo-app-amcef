import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList.js';
import TodoForm from './components/TodoForm.js';
import TodoFilter from './components/TodoFilter';
import './css/App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Fetch todos from API
    const fetchTodos = async () => {
      try {
        const response = await fetch('https://6424a7277ac292e3cfef0791.mockapi.io/:endpoint');
        /*Na mockapi.io nemôžete vytvoriť schému aplikácie v databáze zadarmo, takže tu pridám svoju pre mockapi.io:
            {
            "title": "Todo",
            "type": "object",
            "properties": {
                "id": {
                "type": "string",
                "faker": "random.uuid"
                },
                "title": {
                "type": "string",
                "faker": "lorem.words"
                },
                "description": {
                "type": "string",
                "faker": "lorem.sentence"
                },
                "deadline": {
                "type": "string",
                "faker": "date.future"
                },
                "completed": {
                "type": "boolean",
                "default": false
                }
            },
            "required": ["title"]
            }
        */
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTodos();
  }, []);

  const addTodo = (title, text, deadline) => {
    const newTodo = {
      title,
      text,
      deadline,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const toggleCompleted = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const filterTodos = () => {
    switch (filter) {
      case 'active': return todos.filter((todo) => !todo.completed);
      case 'completed': return todos.filter((todo) => todo.completed);
      default: return todos;
    }
  };

  const searchTodos = (searchTerm) => {
    return todos.filter((todo) =>
      todo.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <TodoForm addTodo={addTodo} />
      <TodoFilter filter={filter} setFilter={setFilter} />
      <TodoList
        todos={filterTodos()}
        deleteTodo={deleteTodo}
        toggleCompleted={toggleCompleted}
        searchTodos={searchTodos}
      />
    </div>
  );
}

export default App;