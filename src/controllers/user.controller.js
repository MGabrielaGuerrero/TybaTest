const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { logTransaction } = require("./transaction.controller");

const userAdd = async (req, res) => {
  console.log("🚀 ~ userAdd ~ req:", req.body.data)
  const { userName, mail, password } = req.body.data;
  try {
    const user = new User({ userName, mail, password });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    // Registrar la transacción
    await logTransaction(
      userName,
      'SIGNUP'
    );
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const singIn = async (req, res) => {
  console.log("🚀 ~ singIn ~ req.body.data:", req.body.data)
  const { userName, password } = req.body.data;
  try {
    const user = await User.findOne({ userName });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    // Registrar la transacción
    await logTransaction(
      userName,
      'SIGNIN'
    );
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};

const signOut = async (req, res) => {
  console.log("🚀 ~ signOut ~ req:", req.body.data)
  const { userName } = req.body.data;
  // invalidar el token
  // Registrar la transacción
  await logTransaction(
    userName,
    'SIGNOUT'
  );
  res.json({ msg:  'Logged out successfully' });
};



module.exports = {
  userAdd,
  singIn,
  signOut
};
