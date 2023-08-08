const express = require("express");
const mongoose = require("mongoose");
const FriendModel = require("./models/Friends");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(
    process.env.DB_CONNECT,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected...."))
  .catch((err) => console.log(err));

app.post("/addfriend", async (req, res) => {
  const name = req.body.name;
  const age = req.body.age;

  const friend = new FriendModel({
    name: name,
    age: age,
  });
  await friend.save();
  res.send(friend);
});

app.get("/read", async (req, res) => {
  try {
    const result = await FriendModel.find({});
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put("/update", async (req, res) => {
  const newAge = req.body.newAge;
  const id = req.body.id;

  try {
    const updatedFriend = await FriendModel.findById(id).exec();
    updatedFriend.age = Number(newAge);
    updatedFriend.save();
    res.send("update");
  } catch (error) {
    console.log(error);
  }
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await FriendModel.findByIdAndRemove(id).exec();
    res.send("deleted");
  } catch (error) {
    res.status(500).send("Error: Unable to delete the friend.");
  }
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
