import { Schema, model } from 'mongoose'
const empleadoSchema = new Schema({
    "_idEmpleado": {
        type: String,
        unique: true,
    },
    "_nombre": String,
    "_sueldobase": {
        type: Number,
        default: 950
    },
    "_comisionventa": Number,
})



export type totEmpleados = {
    "_idEmpleado": string,
    "_nombre": string,
    "_sueldobase": number,
    "_comisionventa": number,
}

export const modeloEmpleado = model('empleados', empleadoSchema)