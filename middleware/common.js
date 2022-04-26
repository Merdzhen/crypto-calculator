const userName = (req, res, next) => {
  res.locals.user = req.session?.user;
  res.locals.userId = req.session?.userId;
  // res.locals.user (название "user" из header.hbs), req.session?.user (название "user" из indexRoutes.js)
  next();
};

const sessionLogger = (req, res, next) => {
  console.log('session logger', req.session);
  next();
};
module.exports = {
  userName, sessionLogger,
};
