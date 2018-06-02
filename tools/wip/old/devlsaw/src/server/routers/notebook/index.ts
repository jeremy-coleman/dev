/**
 * notebook router
 */
import * as express from 'express';
const notebook = express.Router();
import {Notebook} from './Notebook';


notebook.use('/notebook', new Notebook().getRoutes());


export default notebook;