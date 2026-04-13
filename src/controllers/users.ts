import express, { Router, Request, Response } from 'express';
import mysql from 'mysql2';
import * as dotenv from 'dotenv';
dotenv.config();

const router: Router = express.Router();

const dbConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: Number(process.env.MYSQL_PORT) || 3306,
};

router.get('/', (_req: Request, res: Response) => {
  const connection = mysql.createConnection(dbConfig);
  connection.connect((err) => {
    if (err) {
      console.error('MySQL接続エラー詳細:', err);
      return res.status(500).json({
        message:
          'データベース接続に失敗しました。/users 以外のルートは生きています。',
        error: err.message,
      });
    }

    connection.query('SELECT * FROM todo', (queryErr, results) => {
      connection.end();
      if (queryErr) {
        console.error(queryErr);
        return res.status(500).send(queryErr);
      }
      res.send(results);
    });
  });
});

// データ追加
router.post('/', (req: Request, res: Response) => {
  const connection = mysql.createConnection(dbConfig);
  const { id, todo } = req.body;

  connection.query(
    'INSERT INTO todo (id, todo) VALUES (?, ?)',
    [id, todo],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
      res.send({ message: '追加成功', results });
    }
  );
});

export default router;
