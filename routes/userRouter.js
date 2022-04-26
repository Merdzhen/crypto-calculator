const userRouter = require('express').Router();
const bcrypt = require('bcrypt');
const { User, Deal } = require('../db/models');

userRouter.get('/login', (req, res) => {
  res.render('login');
});

userRouter.post('/register', async (req, res) => {
  const { inputName, inputMail, inputPass } = req.body;
  try {
    const oldUser = await User.findOne({ where: { email: inputMail } });
    if (!oldUser) {
      const hash = await bcrypt.hash(inputPass, 10);
      const newuser = await User.create({
        name: inputName, email: inputMail, password: hash,
      });
      res.send({ success: true });
    } else if (oldUser) {
      res.send({ success: false, message: 'Another user uses this email, please fill in your own email' });
    }
  } catch (err) {
    res.send({ success: false, message: err.message });
  }
});

userRouter.post('/login', async (req, res) => {
  const { inputMail, inputPass } = req.body;
  try {
    const user = await User.findOne({ where: { email: inputMail } });
    if (user) {
      const passwordCheck = await bcrypt.compare(inputPass, user.password);
      if (passwordCheck) {
        req.session.user = user.dataValues.name;
        req.session.userId = user.dataValues.id;
        res.send({ success: true });
      } else {
        res.send({ success: false, message: 'Please enter correct password' });
      }
    } else {
      res.send({ success: false, message: 'User with this email was not registered yet. Please register first' });
    }
  } catch (err) {
    res.send({ success: false, message: err.message });
  }
});

userRouter.get('/logout', async (req, res) => {
  try {
    if (req.session.user) {
      await req.session.destroy();
      res.clearCookie('MyCookieName');
      res.redirect('main');
    } else {
      res.redirect('main');
    }
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = userRouter;
