import React from 'react';

const TodoItem = ({ todo, onToggleTodo, onDeleteTodo }) => {
  const handleToggle = () => {
    onToggleTodo(todo.id);
  };

  const handleDelete = () => {
    onDeleteTodo(todo.id);
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <h3>{todo.title}</h3>
      <p>{todo.description}</p>
      <p>{todo.deadline}</p>
      <button onClick={handleToggle}>{todo.completed ? 'Mark as incomplete' : 'Mark as complete'}</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default TodoItem;
