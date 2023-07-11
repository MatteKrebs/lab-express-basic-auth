const router = require("express").Router();
const bcrypt = require('bcrypt');
const saltRounds = 10

const User = require('../models/User.model');

router.get("/signup", (req, res, next) => {
    res.render('auth/signup')
});

router.post("/signup", (req, res, next) => {

    console.log('req.body', req.body);
    const { username, password } = req.body;

    bcrypt
    .genSalt(saltRounds)
    .then(salt => bcrypt.hash(password, salt))
    .then(hashedPassword => {
        return User.create({
          username,    
          passwordHash: hashedPassword
        });
      })
      .then(userFromDB => {
        console.log('Newly created user is: ', userFromDB);
        res.redirect('/auth/profile')
      })
      .catch(error => next(error));
  });

router.get("/profile", (req, res, next) => {
    res.render('auth/profile');
});


module.exports = router;