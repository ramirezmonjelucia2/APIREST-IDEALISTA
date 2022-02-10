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
                const query = await modeloVivienda.find({})
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

                            _tipoObjeto: type
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
            .then(async (mensaje) => {
                console.log(mensaje)
                const query = await modeloEmpleado.find({})
                res.json(query)
            })
            .catch((mensaje) => {
                res.send(mensaje)
            })

        db.desconectarBD()
    }





    private postVivienda = async (req: Request, res: Response) => {
        const { _tipoObjeto,
            _idVivienda,
            _largo,
            _ancho,
            municipio,
            ciudad,
            codpost,
            habitaciones,
            baños,
            ascensor,
            equipamiento,
            _piscina,
            _largojardin,
            _anchojardin,
            _cochera } = req.body

        await db.conectarBD()
        let dSchemaViv: totVivi = {
            "_tipoObjeto": _tipoObjeto,
            "_idVivienda": _idVivienda,
            "_largo": _largo,
            "_ancho": _ancho,
            "_ubicacion": {
                "municipio": municipio,
                "ciudad": ciudad,
                "codpost": codpost,
            },
            "_caracteristicas": {
                "habitaciones": habitaciones,
                "baños": baños,
                "ascensor": ascensor,
                "equipamiento": [equipamiento]
            },
            "_estado": {
                "vendido": false,
                "fecha": new Date(),
                "empleado": null,

            },
            "_piscina": _piscina,
            "_largojardin": _largojardin,
            "_anchojardin": _anchojardin,
            "_cochera": _cochera
        }
        const oSchema = new modeloVivienda(dSchemaViv)
        await oSchema.save()
            .then((doc: any) => res.send("La vivienda es: " + doc))
            .catch((err: any) => res.send('Error: ' + err))
        await db.desconectarBD()
    }



    private postEmpleado = async (req: Request, res: Response) => {
        const { _idEmpleado, _nombre, email, telefono, _sueldobase, _comisionventa } = req.body
        await db.conectarBD()
        let dSchemaEmp: totEmpleados = {
            "_idEmpleado": _idEmpleado,
            "_nombre": _nombre,
            "_email": email,
            "_telefono": telefono,
            "_sueldobase": _sueldobase,
            "_comisionventa": _comisionventa
        }
        const oSchema = new modeloEmpleado(dSchemaEmp)
        await oSchema.save()
            .then((doc: any) => res.send("El empleado es: " + doc))
            .catch((err: any) => res.send('Error: ' + err))
        await db.desconectarBD()
    }

    private updateEstado = async (req: Request, res: Response) => {
        const { idVivienda, idEmpleado} = req.params
        await db.conectarBD()
        await modeloVivienda.findOneAndUpdate(
            {
                _idVivienda: idVivienda
            },
            {
                _estado: {
                    vendido: true,
                    fecha: new Date(),
                    empleado: idEmpleado
                }
            }
        )
            .then((doc: any) => res.send("Vivienda vendida " + doc))
            .catch((err: any) => res.send('Error: ' + err))
        await db.desconectarBD()
    }
    private modificarEmpleado = async (req: Request, res: Response) => {
        const { idEmpleado, email, telefono, sueldobase, comision } = req.params
        await db.conectarBD()
        await modeloEmpleado.findOneAndUpdate(
            {
                _idEmpleado: idEmpleado
            },
            {   _email: email,
                _telefono: telefono,
                _sueldobase: sueldobase,
                _comisionventa: comision
            }
        )
            .then((doc: any) => res.send("Subido el sueldo a: " + doc))
            .catch((err: any) => res.send('Error: ' + err))
        await db.desconectarBD()
    }

    private deleteVivienda = async (req: Request, res: Response) => {
        const { idVivienda } = req.params
        await db.conectarBD()
        await modeloVivienda.findOneAndDelete(
            {
                _idVivienda: idVivienda
            }
        )
            .then((doc: any) => res.send("Vivienda borrada: " + doc))
            .catch((err: any) => res.send('Error: ' + err))
        await db.desconectarBD()
    }

    private deleteEmpleado = async (req: Request, res: Response) => {
        const { idEmpleado } = req.params
        await db.conectarBD()
        await modeloEmpleado.findOneAndDelete(
            {
                _idEmpleado: idEmpleado
            }
        )
            .then((doc: any) => res.send("Empleado borrado: " + doc))
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
