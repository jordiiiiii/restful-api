// LOGOUT
const logout_get = async (req, res, next) => {
  // res.cookie("jwt", "", { maxAge: 1 });
  res.send("We are in GET logout");
};

module.exports = {
  logout_get,
};
