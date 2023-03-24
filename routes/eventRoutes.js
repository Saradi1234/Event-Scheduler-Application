const express = require('express');
const Event=require("../models/event")


const router = express.Router();

//CREATE POST
router.post("/v1/events", async (req, res) => {

    try {
        // console.log(req.body);

        const { title, description, location } = req.body
        

        if (!title) {
            return res.status(400).json({ error: "Validation error:title is required" })
        } else if (!description) {
            return res.status(400).json({ error: "Validation error:description is required" })
        }
        else if (!location) {
            return res.status(400).json({ error: "Validation error:location is required" })
        }

        const event = await Event.create({
            title,
            description,
            location
        })
        return res.status(201).json({
            status: "Success",
            event
        })
    } catch (err) {
        return res.status(400).json({
            status: "Failed",
            message: err.message
        })
    }
});


// GET ALL Events
router.get("/v1/events", async (req, res) => {

    try {
        //Write the code to fetch the data
        const events = await Event.find();
        return res.status(200).json({
            status: "Success",
            events
        })
    } catch (err) {
        return res.status(500).json({
            status: "Failed",
            message: err.message
        })
    }
});


// Get Specific Event
router.get("/v1/events/:id", async (req, res) => {

    try {
        const event = await Event.find({ _id: req.params.id });
        return res.status(200).json({
            status: "Success",
            event
        })
    } catch (err) {
        return res.status(404).json({
            status: "There is no Event with that id",
            message: err.message
        })
    }
});

//DELETE Specific Event
router.delete("/v1/events/:id", async (req, res) => {

    try {
        const result = await Event.deleteOne({ _id: req.params.id });
        return res.status(204).json({
            status: "Success",
            result
        })
    } catch (err) {
        return res.json({
            status: "Not Found",
            message: err.message
        })
    }
});


//Update an event
router.put("/v1/events/:id", async (req, res) => {

    try {
        const { title, description, location } = req.body

        if (!title) {
            return res.status(400).json({ error: "Validation error:title is required" })
        } else if (!description) {
            return res.status(400).json({ error: "Validation error:description is required" })
        }
        else if (!location) {
            return res.status(400).json({ error: "Validation error:location is required" })
        }

        const result = await Event.updateMany({ _id: req.params.id }, {
            title,
            description,
            location
        });
        return res.status(200).json({
            status: "Success",
            result
        })
    } catch (err) {
        return res.status(400).json({
            status: "Failed",
            message: err.message
        })
    }
});

module.exports = router;