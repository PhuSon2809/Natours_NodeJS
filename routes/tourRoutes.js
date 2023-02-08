const express = require('express');
const {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  checkID,
  checkBody,
} = require('../controller/tourController');

const tourRouter = express.Router(); //middleware

tourRouter.param('id', checkID);

//Create a checkBody middleware
//Check if body contrains the name and price property
//If not, send back 400 (bad request)
//Add it to the post handlee stack

//Roustes
//put: sẽ nhận lại toàn bộ các thuộc tính của obj
//patch: chỉ nhận các thuốc tính được cập nhật của obj
tourRouter.route('/').get(getAllTours).post(checkBody, createTour);
tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = tourRouter;
