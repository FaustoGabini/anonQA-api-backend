const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  body: String,
  date: Date,
  response: String,
});

const Question = mongoose.model("Question", questionSchema);

/* Question.find({}).then((result) => {
  console.log(result);
  mongoose.connection.close();
}); */

/* const question = new Question({
  body: "Esta es mi primer pregunta",
  date: new Date(),
});

question
  .save()
  .then((result) => {
    console.log(result);
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error(error);
  }); */

module.exports = Question;
