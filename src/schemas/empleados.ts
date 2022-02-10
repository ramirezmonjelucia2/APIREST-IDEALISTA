import { Schema, model } from 'mongoose'
const empleadoSchema = new Schema({
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
})



export type totEmpleados = {
    "idEmpleado": string,
    "nombre": string,
    "email": string,
    "telefono": string,
    "sueldobase": number,
    "comisionventa": number,
}

export const modeloEmpleado = model('empleados', empleadoSchema)