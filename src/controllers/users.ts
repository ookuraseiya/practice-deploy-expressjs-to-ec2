import express, { Router, Request, Response } from 'express';
import mysql from 'mysql2';
import * as dotenv from 'dotenv';
dotenv.config();

const router: Router = express.Router();

// 2. process.env を使って接続設定を書く
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: Number(process.env.MYSQL_PORT) || 3306, // ポートは数値型にする
});

connection.connect((err) => {
  if (err) {
    console.error('MySQL接続エラー詳細:', err);
    return;
  }
  console.log(`MySQL接続成功! (Host: ${process.env.MYSQL_HOST})`);
});

router.get('/', (_req: Request, res: Response) => {
  connection.query('SELECT * FROM todo', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    res.send(results);
  });
});

// データ追加
router.post('/', (req: Request, res: Response) => {
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
