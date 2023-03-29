import React, { useState } from 'react';

const TodoForm = ({ onSave }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
  
    const handleTitleChange = (event) => {
      setTitle(event.target.value);
    };
  
    const handleDescriptionChange = (event) => {
      setDescription(event.target.value);
    };
  
    const handleDeadlineChange = (event) => {
      setDeadline(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      onSave({ title, description, deadline });
      setTitle('');
      setDescription('');
      setDeadline('');
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" value={title} onChange={handleTitleChange} />
  
        <label htmlFor="description">Description:</label>
        <input type="text" id="description" value={description} onChange={handleDescriptionChange} />
  
        <label htmlFor="deadline">Deadline:</label>
        <input type="datetime-local" id="deadline" value={deadline} onChange={handleDeadlineChange} />
  
        <button type="submit">Add Todo</button>
      </form>
    );
  };

export default TodoForm;