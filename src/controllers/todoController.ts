import { Request, Response } from 'express';
import { uid } from 'uid';

const todoModel = require('../models/todoModel');

const todoController = {
  async getAllTodos(_req: Request, res: Response) {
    try {
      const todos = await todoModel.getTodos();
      res.status(200).json({ todos });
    } catch (error) {
      res.status(500).json({ error: 'Failed to get todo' });
    }
  },

  async addTodo(req: Request, res: Response) {
    const { todo } = req.body;
    const id = uid();
    const isCompleted = 0;
    const createdAt = new Date();
    try {
      await todoModel.addTodo(id, todo, isCompleted);
      res.status(200).json({ id, todo, isCompleted: false, createdAt });
    } catch (error) {
      res.status(500).json({ error: 'Failed to add todo' });
    }
  },

  async deleteTodo(req: Request, res: Response) {
    const { id } = req.body;
    try {
      await todoModel.deleteTodo(id);
      res.status(200).json({ message: 'Success' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete todo' });
    }
  },

  async updateTodo(req: Request, res: Response) {
    const { id, todo, isCompleted, createdAt } = req.body;
    try {
      await todoModel.updateTodo(id, todo);
      res.status(200).json({ id, todo, isCompleted, createdAt });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update todo' });
    }
  },

  async completedTodo(req: Request, res: Response) {
    const { id } = req.body;
    try {
      await todoModel.completedTodo(id);
      res.status(200).json({ message: 'Success' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to completed todo' });
    }
  },

  async incompleteTodo(req: Request, res: Response) {
    const { id } = req.body;
    try {
      await todoModel.incompleteTodo(id);
      res.status(200).json({ message: 'Success' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to incomplete todo' });
    }
  },
};

module.exports = todoController;
