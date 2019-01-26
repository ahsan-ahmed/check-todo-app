const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//"mongodb://localhost:27017/TodoApp"
//"mongodb://ahsan-ahmed:sunny198765@ds113375.mlab.com:13375/todo-app"

mongoose.connect("mongodb://ahsan-ahmed:sunny198765@ds113375.mlab.com:13375/todo-app");

var app = express();
app.use(bodyParser.json());

var newTodo = mongoose.model("newTodo", {
  text: {
    type: String,
    required: true,
    minlength: 1
  }
});

app.get("/newTodo", (req, res) => {
  newTodo
    .find()
    .then(todos => {
      res.send({ todos });
    })
    .catch(err => {
      res.status(400).send();
    });
});

app.post("/newTodo", (req, res) => {
  var todo_x = new newTodo({
    text: req.body.text
  });
  todo_x.save().then(
    docs => {
      res.send(docs);
    },
    err => {
      res.status(400).send();
    }
  );
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`server run on 3000`);
});
