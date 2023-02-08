const fs = require('fs');
const Tour = require('./../models/tourModel');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, value) => {
  console.log(`Tour id is: ${value}`);
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next(); //Để thoát ra khỏi middleware để thực hiện các tác vụ khác
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price',
    });
  }
  next();
};

//Route handle
exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestAt: req.requestTime,
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};

exports.getTour = (req, res) => {
  console.log(req.params);

  //Khi dữ liệu đang là số kiểu string khi nhân với 1 số sẽ tự động chuyển thành kiểu number
  const id = req.params.id * 1;
  const tour = tours.find((tour) => tour.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      tour: tour,
    },
  });
};

exports.createTour = (req, res) => {
  //   console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;
  //Object.assign cho phép tạo một obj mới bằng cách hợp nhất hai đối tượng hện có
  const newTour = Object.assign({ id: newId }, req.body);
  const newListTour = [...tours, newTour];

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(newListTour),
    (error) => {
      //201: created = được tạo ra
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

exports.updateTour = (req, res) => {
  res.status(202).json({
    status: 'success',
    data: {
      tour: '<Updates tour here...>',
    },
  });
};

exports.deleteTour = (req, res) => {
  // 204: không có nội dung (no content)
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
