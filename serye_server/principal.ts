/*Archivo que contendra el proyecto, aqui se inicializatodo y se levanta el servidor*/
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import Servidor from './src/api/clases/servidor';
import { BD_URL } from './src/config/bd';
import {URL_ARCHIVOS} from "./src/config/globales";
const servidor = Servidor.instance;
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(BD_URL, { useNewUrlParser: true });

/* Body parser */

servidor.app.use(bodyParser.json({limit: '10mb'}));
servidor.app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
/* CORS */
servidor.app.use(cors({ origin: true, credentials: true }));
servidor.app.use(express.static(URL_ARCHIVOS));
//servidor.app.use(express.static('../../../documentos'));
//servidor.app.use('/api/usuarios',require('./routes/usuarios.routes'));
//servidor.app.use(express.static('./src/api/componentes/rutas/acceso.Rutas'));

//servidor.app.use('/api/acceso',require('./routes/acceso.routes'));
servidor.iniciar();
