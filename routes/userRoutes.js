const express = require('express');
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controller/userController');

const userRouter = express.Router(); //middleware

//Roustes
//put: sẽ nhận lại toàn bộ các thuộc tính của obj
//patch: chỉ nhận các thuốc tính được cập nhật của obj
userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = userRouter;
