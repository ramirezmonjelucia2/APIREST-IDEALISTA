import { Request, Response, Router } from 'express'
import { db } from '../database/database'
import { modeloVivienda, totVivi } from '../schemas/viviendas'
import { modeloEmpleado, totEmpleados } from '../schemas/empleados'

class DatoRoutes {
    private _router: Router

    constructor() {
        this._router = Router()
    }
    get router() {
        return this._router
    }

    private getViviendas = async (req: Request, res: Response) => {
        await db.conectarBD()
            .then(async (mensaje) => {
                console.log(mensaje)
                const query = await modeloVivienda.find({
                })
                res.json(query)
            })
            .catch((mensaje) => {
                res.send(mensaje)
            })

        db.desconectarBD()
    }








    private getTypes = async (req: Request, res: Response) => {
        const { type } = req.params
        await db.conectarBD()
            .then(
                async (mensaje) => {
                    console.log(mensaje)
                    const query = await modeloVivienda.find(
                        {

                            tipoObjeto: type
                        }
                    )
                    res.json(query)
                })
            .catch(
                (mensaje) => {
                    res.send(mensaje)
                    console.log(mensaje)
                })
        await db.desconectarBD()
    }


 
    private getEmpleados = async (req: Request, res: Response) => {
        await db.conectarBD()
        .then( async ()=> {
            const query = await modeloEmpleado.aggregate([
                {
                    $lookup: {
                        from: 'viviendas',
                        localField: 'idEmpleado',
                        foreignField: 'estado.empleado',
                        as: "ventas"
                    },
                    
                    $project: {
                        idEmpleado: 1,
                        nombre:1,
                        ventas: { $size:"$ventas" }
                    }
                }
            ])
            res.json(query)
        })
        .catch((mensaje) => {
            res.send(mensaje)
        })
        await db.desconectarBD()
    }




    private postVivienda = async (req: Request, res: Response) => {
        const { tipoObjeto,
            idVivienda,
            largo,
            ancho,
            municipio,
            ciudad,
            codpost,
            habitaciones,
            baños,
            ascensor,
            equipamiento,
            piscina,
            largojardin,
            anchojardin,
            cochera } = req.body

        await db.conectarBD()
        let dSchemaViv: totVivi = {
            tipoObjeto: tipoObjeto,
            idVivienda: idVivienda,
            largo: largo,
            ancho: ancho,
            ubicacion: {
                municipio: municipio,
                ciudad: ciudad,
                codpost: codpost,
            },
            caracteristicas: {
                habitaciones: habitaciones,
                baños: baños,
                ascensor: ascensor,
                equipamiento: [equipamiento]
            },
            estado: {
                vendido: false,
                fecha: new Date(),
                empleado: null,

            },
            piscina: piscina,
            largojardin: largojardin,
            anchojardin: anchojardin,
            cochera: cochera
        }
        const oSchema = new modeloVivienda(dSchemaViv)
        await oSchema.save()
            .then((doc: any) => res.send('La vivienda es: ' + doc))
            .catch((err: any) => res.send('Error: ' + err))
        await db.desconectarBD()
    }



    private postEmpleado = async (req: Request, res: Response) => {
        const { idEmpleado, nombre, email, telefono, sueldobase, comisionventa } = req.body
        await db.conectarBD()
        let dSchemaEmp: totEmpleados = {
            idEmpleado: idEmpleado,
            nombre: nombre,
            email: email,
            telefono: telefono,
            sueldobase: sueldobase,
            comisionventa: comisionventa
        }
        const oSchema = new modeloEmpleado(dSchemaEmp)
        await oSchema.save()
            .then((doc: any) => res.send('El empleado es: ' + doc))
            .catch((err: any) => res.send('Error: ' + err))
        await db.desconectarBD()
    }

    private updateEstado = async (req: Request, res: Response) => {
        const { idVivienda, idEmpleado } = req.params
        await db.conectarBD()
        await modeloVivienda.findOneAndUpdate(
            {
                idVivienda: idVivienda
            },
            {
                estado: {
                    vendido: true,
                    fecha: new Date(),
                    empleado: idEmpleado
                }
            }
        )
            .then((doc: any) => res.send('Vivienda vendida  ' + doc))
            .catch((err: any) => res.send('Error: ' + err))
        await db.desconectarBD()
    }
    private modificarEmpleado = async (req: Request, res: Response) => {
        const { idEmpleado, email, telefono, sueldobase, comision } = req.params
        await db.conectarBD()
        await modeloEmpleado.findOneAndUpdate(
            {
                idEmpleado: idEmpleado
            },
            {
                email: email,
                telefono: telefono,
                sueldobase: sueldobase,
                comisionventa: comision
            }
        )
            .then((doc: any) => res.send(' Subido el sueldo a:  ' + doc))
            .catch((err: any) => res.send('Error: ' + err))
        await db.desconectarBD()
    }

    private deleteVivienda = async (req: Request, res: Response) => {
        const { idVivienda } = req.params
        await db.conectarBD()
        await modeloVivienda.findOneAndDelete(
            {
                idVivienda: idVivienda
            }
        )
            .then((doc: any) => res.send(' Vivienda borrada:  ' + doc))
            .catch((err: any) => res.send('Error: ' + err))
        await db.desconectarBD()
    }

    private deleteEmpleado = async (req: Request, res: Response) => {
        const { idEmpleado } = req.params
        await db.conectarBD()
        await modeloEmpleado.findOneAndDelete(
            {
                idEmpleado: idEmpleado
            }
        )
            .then((doc: any) => res.send(' Empleado borrado: ' + doc))
            .catch((err: any) => res.send('Error: ' + err))
        await db.desconectarBD()
    }


    misRutas() {
        this._router.get('/viviendas', this.getViviendas)
        this._router.get('/viviendas/:type', this.getTypes)
        this._router.get('/empleados', this.getEmpleados)

        this._router.post('/vivienda', this.postVivienda)
        this._router.post('/empleados', this.postEmpleado)

        this._router.put('/empleado/:idEmpleado/:sueldobase/:comision', this.modificarEmpleado)
        this._router.put('/venta/:idVivienda/:idEmpleado', this.updateEstado)

        this._router.delete('/deleteEmpleado/:idEmpleado', this.deleteEmpleado)
        this._router.delete('/deleteVivienda/:idVivienda', this.deleteVivienda)

    }
}

const obj = new DatoRoutes()
obj.misRutas()
export const routes = obj.router
