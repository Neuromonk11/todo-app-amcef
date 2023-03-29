import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import TodoFilter from './TodoFilter';

const TodoList = () => {
  const [todoLists, setTodoLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTodoLists = async () => {
      try {
        const response = await axios.get('https://mockapi.io/api/v1/todoLists');
        setTodoLists(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchTodoLists();
  }, []);

  const handleAddTodoList = (todoList) => {
    setTodoLists([...todoLists, todoList]);
  };

  const handleDeleteTodoList = (id) => {
    setTodoLists(todoLists.filter((todoList) => todoList.id !== id));
  };

  const handleEditTodoList = (id, updatedTodoList) => {
    setTodoLists(
      todoLists.map((todoList) => (todoList.id === id ? updatedTodoList : todoList))
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <TodoForm onAddTodoList={handleAddTodoList} />
      <TodoFilter />
      {todoLists.map((todoList) => (
        <TodoItem
          key={todoList.id}
          todoList={todoList}
          onDeleteTodoList={handleDeleteTodoList}
          onEditTodoList={handleEditTodoList}
        />
      ))}
    </div>
  );
};

export default TodoList;
