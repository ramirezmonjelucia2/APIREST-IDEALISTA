import { Schema, model } from 'mongoose'

const viviendaSchema = new Schema({
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

})


export type tChalet = {
    "tipoObjeto": string | null,
    "idVivienda": number | null,
    "largo": number | null,
    "ancho": number | null,
    "ubicacion": {
        "municipio": string | null,
        "ciudad": string | null,
        "codpost": number | null,
    },
    "caracteristicas": {
        "habitaciones": number | null,
        "baños": number | null,
        "ascensor": boolean | null,
        "equipamiento": Array<string> | null
    },
    "estado": {
        "vendido": boolean | null,
        "fecha": Date | null,
        "empleado": string | null

    }
    "piscina": boolean | null
    "largojardin": number | null
    "anchojardin": number | null
}

export type tCasa = {
    "tipoObjeto": string | null,
    "idVivienda": number | null,
    "largo": number | null,
    "ancho": number | null,
    "ubicacion": {
        "municipio": string | null,
        "ciudad": string | null,
        "codpost": number | null,
    },
    "caracteristicas": {
        "habitaciones": number | null,
        "baños": number | null,
        "ascensor": boolean | null,
        "equipamiento": Array<string> | null
    },
    "estado": {
        "vendido": boolean | null,
        "fecha": Date | null,
        "empleado": string | null

    }
    "cochera": boolean | null
}


export type totVivi = {
    "tipoObjeto": string,
    "idVivienda": number,
    "largo": number,
    "ancho": number,
    "ubicacion": {
        "municipio": string,
        "ciudad": string,
        "codpost": number,
    },
    "caracteristicas": {
        "habitaciones": number,
        "baños": number,
        "ascensor": boolean,
        "equipamiento": Array<string>
    },
    "estado": {
        "vendido": boolean| null,
        "fecha": Date | null,
        "empleado": string | null,

    }
    "piscina": boolean,
    "largojardin": number,
    "anchojardin": number,
    "cochera": boolean
}
export const modeloVivienda = model('viviendas', viviendaSchema)