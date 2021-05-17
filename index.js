const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let questions = [
  { id: 1, body: "Esta es una pregunta" },
  { id: 2, body: "Esta es otra pregunta" },
  { id: 3, body: "Ya no se que mas poner" },
  { id: 4, body: "Vo si que sos crack" },
  {
    id: 5,
    body: "Te vas amor si asi lo quieras que puedo hacer",
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello World</h1>");
});

app.get("/api/questions", (request, response) => {
  response.json(questions);
});

app.get("/api/questions/:id", (request, response) => {
  const id = Number(request.params.id);
  const question = questions.find(
    (question) => question.id === id
  );

  if (question) {
    response.json(question);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/questions/:id", (request, response) => {
  const id = Number(request.params.id);

  questions = questions.filter(
    (question) => question.id != id
  );

  response.status(204).end();
});

app.post("/api/questions", (request, response) => {
  const question = request.body;

  const ids = questions.map((note) => note.id);
  const maxId = Math.max(...ids);
  const newQuestion = {
    id: maxId + 1,
    body: question.body,
  };

  questions = [...questions, newQuestion];

  response.json(newQuestion);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
