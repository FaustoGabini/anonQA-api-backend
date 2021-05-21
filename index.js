require("dotenv").config(); /* Importa la Libreria para usar var de entorno */
require("./mongo.js");

const express = require("express");
const cors = require("cors");
const app = express();
const Question = require("./models/Question");

app.use(cors());
app.use(express.json());

let questions = [];

app.get("/", (request, response) => {
  response.send("<h1>Hello World</h1>");
});

app.get("/api/questions", (request, response) => {
  Question.find({}).then((questions) => {
    response.json(questions);
  });
});

app.get("/api/questions/:id", (request, response) => {
  const id = request.params.id;
  Question.findById(id)
    .then((question) => {
      if (question) {
        response.json(question);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      console.log(error);
      response.status(400).send({
        error: "El formato del id no es correcto",
      }); /* Error nuesto */
    });
});

app.delete("/api/questions/:id", (request, response) => {
  const id = request.params.id;

  Question.findByIdAndRemove(id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => {
      response.status(400).send({
        error: "El formato del id no es correcto",
      });
    });

  response.status(204).end();
});

app.post("/api/questions", (request, response) => {
  const question = request.body;

  if (!question.body) {
    return response.status(400).json({
      error: "required body field is missing",
    });
  }

  const newQuestion = new Question({
    body: question.body,
    date: new Date(),
    response: "",
  });

  newQuestion.save().then((savedQuestion) => {
    response.json(savedQuestion);
  });
});
/* https://shrouded-sierra-15470.herokuapp.com/ */
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
