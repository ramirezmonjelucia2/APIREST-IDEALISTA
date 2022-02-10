import { Schema, model, Collection } from 'mongoose'
const empleadoSchema = new Schema({
    idEmpleado: {
        type: Number,
        unique: true
    },
    nombre: String,
    email: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    sueldobase: {
        type: Number,
        default: 950
    },
    comisionventa: Number,
}
)



export type totEmpleados = {
    idEmpleado: number,
    nombre: string,
    email: string,
    telefono: string,
    sueldobase: number,
    comisionventa: number,
}

export const modeloEmpleado = model('empleados', empleadoSchema)