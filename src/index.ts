import express from 'express';
import usersController from './controllers/users';
import greetingController from './controllers/greetings';

const app: express.Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', usersController);
app.use('/greetings', greetingController);

app.listen(3000, () => {
  console.log('Start on PORT:3000!');
});
