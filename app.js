require('dotenv').config();
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const hbs = require('hbs');
const { sequelize } = require('./db/models');
const dealsRouter = require('./routes/dealsRouter');
const indexRouter = require('./routes/indexRouter');
// const tagsRouter = require('./routes/tagsRouter');

const app = express();
const PORT = process.env.PORT ?? 3000;

app.set('view engine', 'hbs'); // задать движок для генерации шаблонов
app.set('views', path.join(__dirname, 'views')); // задать папку с шаблонами
hbs.registerPartials(path.join(__dirname, 'views', 'partials')); // задать папку с частичными шаблонами (partials)

// app.use — подключить промежуточные функции
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // для чтения тела запросов в формате urlencoded
app.use(morgan('dev')); // для логирования входящих запросов и ответов на них
// app.use(testMiddleware); // срабатывает на всех входящих запросах
app.use(express.static(path.join(__dirname, 'public')));

// Подключить роутеры
app.use('/', dealsRouter);
// app.use('/tags', tagsRouter);
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
