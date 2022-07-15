const express = require("express");
const { Station, validate } = require("../models/station");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const stations = await Station.find();
        res.status(200).json(stations);
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
});

router.post("/", [], async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).json(error.details[0].message);

        const station = new Station({
            stationName: req.body.stationName,
            stationCode: req.body.stationCode,
            address: req.body.address,
            capacity: req.body.capacity
        });
        await station.save();

        res.status(201).json(station);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
});

router.put("/:id", [], async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).json(error.details[0].message);
        const station = await Station.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    stationName: req.body.stationName,
                    stationCode: req.body.stationCode,
                    address: req.body.address,
                    capacity: req.body.capacity
                },
            },
            { new: true }
        );
        if (!station)
            return res
                .status(404)
                .json(`The station with the code ${req.params.stationCode} was not found.`);

        res.status(200).json(station);
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
});

router.delete("/:id", [], async (req, res) => {
    try {
        const station = await Station.findByIdAndRemove(req.params.id);
        if (!station)
            return res
                .status(404)
                .json(`The station with the code ${req.params.id} was not found.`);
        res.status(200).json(station);
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
});

module.exports = router;
