const router = require("express").Router();
const Pin = require("../models/Pin");

router.post("/", async (req, res) => {
  const newPin = new Pin(req.body);
  try {
    const savedPin = await newPin.save();
    res.status(200).json(savedPin);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const pins = await Pin.find()
    res.status(200).json(pins);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/username", async (req, res) => {
  try {
    let us = await req.query.username;
    let pins = [];
    if (us !== "") {
      pins = await Pin.find({ username: us });
    } else {
      pins = await Pin.find()
    }
    res.status(200).json(pins);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await Pin.find().distinct("username");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/coordinates", async (req, res) => {
  try {
    const currentUser = await req.query.username;
    let lats;
    let longs;
    if (currentUser !== "") {
      lats = await Pin.find({ username: currentUser }).distinct("lat");
      longs = await Pin.find({ username: currentUser }).distinct("long");
    } else {
      lats = await Pin.find().distinct("lat");
      longs = await Pin.find().distinct("long");
    }
    const lats_coord = [Math.min(...lats), Math.max(...lats)]
    const longs_coord = [Math.min(...longs), Math.max(...longs)]
    res.status(200).json([lats_coord, longs_coord]);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
