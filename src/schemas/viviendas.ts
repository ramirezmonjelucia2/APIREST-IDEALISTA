import { Schema, model } from 'mongoose'

const viviendaSchema = new Schema({
    "_tipoObjeto": {
        type: String,
        required: 'Que no se te olvide, a ver como lo identificas luego'
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

})


export type tChalet = {
    "_tipoObjeto": string | null,
    "_idVivienda": number | null,
    "_largo": number | null,
    "_ancho": number | null,
    "_ubicacion": {
        "municipio": string | null,
        "ciudad": string | null,
        "codpost": number | null,
    },
    "_caracteristicas": {
        "habitaciones": number | null,
        "baños": number | null,
        "ascensor": boolean | null,
        "equipamiento": Array<string> | null
    },
    "_estado": {
        "vendido": boolean | null,
        "fecha": Date | null,
        "empleado": string | null

    }
    "_piscina": boolean | null
    "_largojardin": number | null
    "_anchojardin": number | null
}

export type tCasa = {
    "_tipoObjeto": string | null,
    "_idVivienda": number | null,
    "_largo": number | null,
    "_ancho": number | null,
    "_ubicacion": {
        "municipio": string | null,
        "ciudad": string | null,
        "codpost": number | null,
    },
    "_caracteristicas": {
        "habitaciones": number | null,
        "baños": number | null,
        "ascensor": boolean | null,
        "equipamiento": Array<string> | null
    },
    "_estado": {
        "vendido": boolean | null,
        "fecha": Date | null,
        "empleado": string | null

    }
    "_cochera": boolean | null
}


export type totVivi = {
    "_tipoObjeto": string,
    "_idVivienda": number,
    "_largo": number,
    "_ancho": number,
    "_ubicacion": {
        "municipio": string,
        "ciudad": string,
        "codpost": number,
    },
    "_caracteristicas": {
        "habitaciones": number,
        "baños": number,
        "ascensor": boolean,
        "equipamiento": Array<string>
    },
    "_estado": {
        "vendido": boolean| null,
        "fecha": Date | null,
        "empleado": string | null,

    }
    "_piscina": boolean,
    "_largojardin": number,
    "_anchojardin": number,
    "_cochera": boolean
}
export const modeloVivienda = model('viviendas', viviendaSchema)