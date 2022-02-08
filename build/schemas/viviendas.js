"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modeloVivienda = void 0;
const mongoose_1 = require("mongoose");
const viviendaSchema = new mongoose_1.Schema({
    "_tipoObjeto": {
        type: String,
        required: [true, 'Que no se te olvide, a ver como lo identificas luego !!']
    },
    "_idVivienda": {
        type: Number,
        unique: true,
    },
    "_largo": Number,
    "_ancho": Number,
    "_ubicacion": {
        "municipio": String,
        "ciudad": {
            type: String,
            lowercase: true,
            required: [true, 'Se te olvida la ciudad!']
        },
        "codpost": Number,
    },
    "_caracteristicas": {
        habitaciones: Number,
        baños: Number,
        ascensor: Boolean,
        equipamiento: Array
    },
    "_preciom2": Number,
    "_estado": {
        vendido: {
            type: Boolean,
            default: false
        },
        fecha: Date,
        empleado: String,
    },
    "_piscina": Boolean,
    "_largojardin": Number,
    "_anchojardin": Number,
    "_cochera": Boolean
});
exports.modeloVivienda = (0, mongoose_1.model)('viviendas', viviendaSchema);
