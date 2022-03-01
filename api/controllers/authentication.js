module.exports = function (passport) {
  const authenticate = passport.authenticate("local");
  console.log(authenticate);

  return {
    login(req, res, next) {
      console.log("inside login");
      authenticate((req, res, err) => {
        console.log("inside auth");
        if (err) {
          return next(err);
        }

        res.enforcer.status(200).send();
      });
    },

    logout(req, res) {
      if (req.user) {
        req.logout();
      }

      res.enforcer.status(200).send();
    },
  };
};
