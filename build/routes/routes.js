"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const database_1 = require("../utilidades/database");
const viviendas_1 = require("../schemas/viviendas");
const empleados_1 = require("../schemas/empleados");
class DatoRoutes {
    constructor() {
        this.getViviendas = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                console.log(mensaje);
                const query = yield viviendas_1.modeloVivienda.find({});
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            database_1.db.desconectarBD();
        });
        this.getTypes = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { type } = req.params;
            yield database_1.db.conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                console.log(mensaje);
                const query = yield viviendas_1.modeloVivienda.find({
                    _tipoObjeto: type
                });
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
                console.log(mensaje);
            });
            yield database_1.db.desconectarBD();
        });
        this.postVivienda = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { _tipoObjeto, _idVivienda, _largo, _ancho, municipio, ciudad, codpost, habitaciones, baños, ascensor, equipamiento, precio, _piscina, _largojardin, _anchojardin, _cochera } = req.body;
            yield database_1.db.conectarBD();
            let dSchemaViv = {
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
                "_preciom2": precio,
                "_estado": {
                    "vendido": false,
                    "fecha": new Date(),
                    "empleado": null,
                },
                "_piscina": _piscina,
                "_largojardin": _largojardin,
                "_anchojardin": _anchojardin,
                "_cochera": _cochera
            };
            const oSchema = new viviendas_1.modeloVivienda(dSchemaViv);
            yield oSchema.save()
                .then((doc) => res.send("La vivienda es: " + doc))
                .catch((err) => res.send('Error: ' + err));
            yield database_1.db.desconectarBD();
        });
        this.postEmpleado = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { _idEmpleado, _nombre, _sueldobase, _comisionventa } = req.body;
            yield database_1.db.conectarBD();
            let dSchemaEmp = {
                "_idEmpleado": _idEmpleado,
                "_nombre": _nombre,
                "_sueldobase": _sueldobase,
                "_comisionventa": _comisionventa
            };
            const oSchema = new empleados_1.modeloEmpleado(dSchemaEmp);
            yield oSchema.save()
                .then((doc) => res.send("El empleado es: " + doc))
                .catch((err) => res.send('Error: ' + err));
            yield database_1.db.desconectarBD();
        });
        this.updateEstado = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { idVivienda, idEmpleado } = req.params;
            yield database_1.db.conectarBD();
            yield viviendas_1.modeloVivienda.findOneAndUpdate({
                _idVivienda: idVivienda
            }, {
                _estado: {
                    vendido: true,
                    fecha: new Date(),
                    empleado: idEmpleado
                }
            })
                .then((doc) => res.send("Vivienda vendida " + doc))
                .catch((err) => res.send('Error: ' + err));
            yield database_1.db.desconectarBD();
        });
        this.modificarEmpleado = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { idEmpleado, sueldobase, comision } = req.params;
            yield database_1.db.conectarBD();
            yield empleados_1.modeloEmpleado.findOneAndUpdate({
                _idEmpleado: idEmpleado
            }, {
                _sueldobase: sueldobase,
                _comisionventa: comision
            })
                .then((doc) => res.send("Subido el sueldo a: " + doc))
                .catch((err) => res.send('Error: ' + err));
            yield database_1.db.desconectarBD();
        });
        this.deleteVivienda = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { idVivienda } = req.params;
            yield database_1.db.conectarBD();
            yield viviendas_1.modeloVivienda.findOneAndDelete({
                _idVivienda: idVivienda
            })
                .then((doc) => res.send("Vivienda borrada: " + doc))
                .catch((err) => res.send('Error: ' + err));
            yield database_1.db.desconectarBD();
        });
        this.deleteEmpleado = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { idEmpleado } = req.params;
            yield database_1.db.conectarBD();
            yield empleados_1.modeloEmpleado.findOneAndDelete({
                _idEmpleado: idEmpleado
            })
                .then((doc) => res.send("Empleado borrado: " + doc))
                .catch((err) => res.send('Error: ' + err));
            yield database_1.db.desconectarBD();
        });
        this._router = (0, express_1.Router)();
    }
    get router() {
        return this._router;
    }
    misRutas() {
        this._router.get('/viviendas', this.getViviendas);
        this._router.get('/viviendas/:type', this.getTypes);
        this._router.post('/vivienda', this.postVivienda);
        this._router.post('/empleado', this.postEmpleado);
        this._router.put('/empleado/:idEmpleado/:sueldobase/:comision', this.modificarEmpleado);
        this._router.put('/venta/:idVivienda/:idEmpleado', this.updateEstado);
        this._router.delete('/deleteEmpleado/:idEmpleado', this.deleteEmpleado);
        this._router.delete('/deleteVivienda/:idVivienda', this.deleteVivienda);
    }
}
const obj = new DatoRoutes();
obj.misRutas();
exports.routes = obj.router;
