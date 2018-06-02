/**
 * global router
 */
import * as express from 'express';
const global = express.Router();
import {Search} from './Search';

global.use('/search', new Search().getRoutes());


export default global;