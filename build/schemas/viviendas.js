"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modeloVivienda = void 0;
const mongoose_1 = require("mongoose");
const viviendaSchema = new mongoose_1.Schema({
    "tipoObjeto": {
        type: String,
        required: 'Que no se te olvide, a ver como lo identificas luego'
    },
    "idVivienda": {
        type: Number,
        unique: true,
    },
    "largo": Number,
    "ancho": Number,
    "ubicacion": {
        "municipio": String,
        "ciudad": {
            type: String,
            lowercase: true,
            required: [true, 'Se te olvida la ciudad!']
        },
        "codpost": Number,
    },
    "caracteristicas": {
        habitaciones: Number,
        baños: Number,
        ascensor: Boolean,
        equipamiento: Array
    },
    "estado": {
        vendido: {
            type: Boolean,
            default: false
        },
        fecha: Date,
        empleado: String,
    },
    "piscina": Boolean,
    "largojardin": Number,
    "anchojardin": Number,
    "cochera": Boolean
});
exports.modeloVivienda = (0, mongoose_1.model)('viviendas', viviendaSchema);
