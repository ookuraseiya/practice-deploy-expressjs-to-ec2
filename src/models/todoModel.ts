const executeQuery = require('./runQuery');

const todoModel = {
  async getTodos() {
    const SQL = 'SELECT * FROM todo' as const;
    return await executeQuery(SQL);
  },

  async addTodo(id: string, todo: string, isCompleted: number) {
    const SQL =
      'INSERT INTO todo (id, todo, completed) VALUES (?, ?, ?)' as const;
    return await executeQuery(SQL, [id, todo, isCompleted]);
  },

  async deleteTodo(id: string) {
    const SQL = 'DELETE FROM todo WHERE id = ?' as const;
    return await executeQuery(SQL, [id]);
  },

  async updateTodo(id: string, todo: string) {
    const SQL = 'UPDATE todo SET todo = ? WHERE id = ?' as const;
    return await executeQuery(SQL, [todo, id]);
  },

  async completedTodo(id: string) {
    const SQL = 'UPDATE todo SET completed = 1 WHERE id = ?' as const;
    return await executeQuery(SQL, [id]);
  },

  async incompleteTodo(id: string) {
    const SQL = 'UPDATE todo SET completed = 0 WHERE id = ?' as const;
    return await executeQuery(SQL, [id]);
  },
};

module.exports = todoModel;
