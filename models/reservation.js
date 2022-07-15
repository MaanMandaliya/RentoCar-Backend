/*
* @author: Maan Mandaliya (B00903171 | mn638205@dal.ca)
* @description: This is a MongoDB model to manage CRUD operations on Reservations collection.
*/
const mongoose = require("mongoose");
const Joi = require("joi");

const Reservations = mongoose.model(
    "Reservations",
    new mongoose.Schema({
        number: {
            type: Number,
            required: true,
            length: 6
        },
        pickupPostal: {
            type: String,
            required: true,
            length: 6,
        },
        dropPostal: {
            type: String,
            required: true,
            length: 6,
        },
        pickupDate: {
            type: Date,
            required: true,
        },
        dropDate: {
            type: Date,
            required: true,
        },
        pickupTime: {
            type: String,
            required: true,
            minlength: 4,
            maxlength: 5
        },
        dropTime: {
            type: String,
            required: true,
            minlength: 4,
            maxlength: 5
        },
        age: {
            type: Number,
            required: true,
            min: 18,
            max: 100
        },
        nationality: {
            type: String,
            required: true,
            minlength: 8,
            maxlength: 12
        },
        carType: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 9
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        username: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 50
        },
        vehicle: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vehicle",
            required: true,
        },
        isCancelled: {
            type: Boolean,
            default: false
        },
        cancellationReason: {
            type: String,
            default: null,
            minlength: 0,
            maxlength: 100
        }
    })
);

module.exports.validate = (object) => {
    const schema = Joi.object({
        number: Joi.number().min(6).max(6).required(),
        pickupPostal: Joi.string().min(6).max(6).required(),
        dropPostal: Joi.string().min(6).max(6).required(),
        pickupDate: Joi.date().required(),
        dropDate: Joi.date().required(),
        pickupTime: Joi.string().min(4).max(5).required(),
        dropTime: Joi.string().min(4).max(5).required(),
        age: Joi.number().min(18).max(100).required(),
        nationality: Joi.string().min(8).max(12).required(),
        carType: Joi.string().min(3).max(9).required(),
        price: Joi.number().min(0).required(),
        username: Joi.string().min(3).max(50),
        vehicle: Joi.object().required(),
        isCancelled: Joi.bool(),
        cancellationReason: Joi.string().min(0).max(100).required()
    });

    return schema.validate(object)
};

module.exports.Reservations = Reservations;