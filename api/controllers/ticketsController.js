const Ticket = require("../models/ticket");
const checkAuth = require("../middleware/check-auth");
const mongoose = require("mongoose");

exports.get_all_tickets = (req, res, next) => {
  Ticket.find()
    .select("name price _id avqty train")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        tickets: docs.map((doc) => {
          return {
            name: doc.name,
            price: doc.price,
            _id: doc._id,
            avqty: doc.avqty,
            train: doc.train,
            request: {
              type: "GET",
              url: "http://localhost:3000/tickets/" + doc._id,
            },
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.post_ticket = (req, res, next) => {
  const ticket = new Ticket({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    avqty: req.body.avqty,
    train: req.body.train,
  });
  ticket
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Post Success!",
        createdTicket: {
          name: result.name,
          price: result.price,
          _id: result._id,
          avqty: result.avqty,
          train: result.train,
          request: {
            type: "GET",
            url: "http://localhost:3000/tickets/" + result._id,
          },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.get_ticketbyId = (req, res, next) => {
  const id = req.params.ticketId;

  Ticket.findById(id)
    .exec()
    .then((doc) => {
      console.log(doc);
      if (doc) {
        res.status(200).json({
          ticket: doc,
          request: {
            type: "GET",
            url: "http://localhost:3000/tickets" + doc._id,
          },
        });
      } else {
        res.status(404).json({ message: "Nothing here! :(" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.update_ticketbyId = (req, res, next) => {
  const id = req.params.ticketId;
  const updateOps = {};

  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }

  Ticket.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Product Updated",
        request: {
          type: "GET",
          url: "http://localhost:3000/tickets/" + id,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.delete_ticketbyId = (req, res, next) => {
  const id = req.params.ticketId;
  Ticket.remove({
    _id: id,
  })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
