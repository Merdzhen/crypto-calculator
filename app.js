require('dotenv').config();
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const hbs = require('hbs');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const { sequelize } = require('./db/models');
const dealsRouter = require('./routes/dealsRouter');
const indexRouter = require('./routes/indexRouter');
const userRouter = require('./routes/userRouter');
const { userName, sessionLogger } = require('./middleware/common');

const app = express();
const PORT = process.env.PORT ?? 3000;

const sessionConfig = {
  store: new FileStore(),
  name: 'MyCookieName',
  secret: process.env.SESSION_SECRET ?? 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 30, // 30 дней - секунда минута час сутки мес
    httpOnly: true,
  },
};

app.set('view engine', 'hbs'); // задать движок для генерации шаблонов
app.set('views', path.join(__dirname, 'views')); // задать папку с шаблонами
hbs.registerPartials(path.join(__dirname, 'views', 'partials')); // задать папку с частичными шаблонами (partials)

// app.use — подключить промежуточные функции
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // для чтения тела запросов в формате urlencoded
app.use(morgan('dev')); // для логирования входящих запросов и ответов на них
// app.use(testMiddleware); // срабатывает на всех входящих запросах
app.use(express.static(path.join(__dirname, 'public')));

app.use(session(sessionConfig));
// app.use(sessionLogger);
app.use(userName);

// Подключить роутеры
app.use('/', dealsRouter);
app.use('/', userRouter);
app.use('/', indexRouter);

app.get('*', (req, res) => {
  res.redirect('/');
});

// Запустить сервер — начать прослушивание порта
app.listen(PORT, async () => {
  /* eslint-disable no-console */
  console.log('Сервер слушает порт', PORT);

  try {
    await sequelize.authenticate({ logging: false });
    console.log('Подключение к БД успешно');
  } catch (error) {
    console.log('Не удалось подключиться к БД', error.message);
  }
  /* eslint-enable */
});
