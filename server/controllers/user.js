const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./../models/user');
const SECRET_KEY = process.env.SECRET_KEY || 'default';

const generateRandomPassword = (length = 8) => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};

const sanitizeUser = (user) => {
  const { password, ...sanitizedUser } = user.toObject();
  return sanitizedUser;
};

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user)
    return res
      .status(409)
      .send({ error: '409', message: 'User already exists' });
    
  try {
    if (password.length < 6) throw new Error('password is too short');

    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({
      ...req.body,
      contactInfo : email,
      password: hash,
    });

    const { _id } = await newUser.save();
    // const accessToken = jwt.sign({ _id }, SECRET_KEY);
    res.status(201).send({ message: 'user register successfully' });
  } catch (error) {
    res.status(400).send({ error, message:error.message});
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    const validatedPass = await bcrypt.compare(password, user.password);
    if (!validatedPass) throw new Error();
    const accessToken = jwt.sign({ _id: user._id }, SECRET_KEY);
    res.status(200).send({ accessToken });
  } catch (error) {
    res
      .status(401)
      .send({ error: '401', message: 'Username or password is incorrect' });
  }
};

const profile = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).send(user);
  } catch {
    res.status(404).send({ error, message: 'Resource not found' });
  }
};

// Logout from clientside

const updateProfile = async (req, res) => {
  try {
    const user = req.user;
    const updates = req.body;

    if (updates.password) {
      if (updates.password.length < 6) throw new Error('Password is too short');
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(user._id, updates, { new: true });
    res.status(200).send(sanitizeUser(updatedUser));
  } catch (error) {
    res.status(400).send({ error, message: error.message });
  }
};

const forgetpassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send({ message: 'User not found' });

    const newPassword = generateRandomPassword();
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    //TODO send email new password
    res.status(200).send({ message: 'Password reset successfully. Check your email for the new password.' });
  } catch (error) {
    res.status(500).send({ message: 'Error resetting password', error });
  }
};

const getUsers = async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const pageNumber = parseInt(page, 10);
    const limitNumber = 10;

    const users = await User.find()
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    const totalUsers = await User.countDocuments();
    const totalPages = Math.ceil(totalUsers / limitNumber);

    res.status(200).send({
      currentPage: pageNumber,
      totalPages,
      totalUsers,
      users: sanitizeUser(users),
    });
  } catch (error) {
    res.status(500).send({ message: 'Error fetching users', error });
  }
};

const addUser = async (req, res) => {
  try {
    const { email, password, isAdmin } = req.body;

    if (password.length < 6) throw new Error('Password is too short');

    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hash,
      isAdmin: isAdmin || false,
    });

    await newUser.save();
    res.status(201).send({ message: 'User added successfully', user: sanitizeUser(newUser) });
  } catch (error) {
    res.status(400).send({ message: 'Error adding user', error });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'User updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'User deleted successfully',
      user: deletedUser,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};

module.exports = { register, login, profile, updateProfile ,forgetpassword, getUsers, addUser, updateUser, deleteUser };