import { useState, useEffect } from 'react';
import anecdoteService from '../services/anecdotes';

export const useAnecdotes = () => {
  const [anecdotes, setAnecdotes] = useState([]);

  useEffect(() => {
    anecdoteService.getAll().then((anecdotes) => setAnecdotes(anecdotes));
  }, []);

  const addAnecdote = async (anecdote) => {
    const created = await anecdoteService.createNew({ ...anecdote, vote: 0 });
    setAnecdotes((current) => current.concat(created));
  };

  const deleteAnecdote = async (id) => {
    await anecdoteService.remove(id);
    setAnecdotes((current) => current.filter((item) => item.id !== id));
  };

  return { anecdotes, addAnecdote, deleteAnecdote };
};


