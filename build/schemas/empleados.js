"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modeloEmpleado = void 0;
const mongoose_1 = require("mongoose");
const empleadoSchema = new mongoose_1.Schema({
    "idEmpleado": {
        type: String,
        unique: true,
    },
    "nombre": String,
    "email": String,
    "telefono": String,
    "sueldobase": {
        type: Number,
        default: 950
    },
    "comisionventa": Number,
});
exports.modeloEmpleado = (0, mongoose_1.model)('empleados', empleadoSchema);
