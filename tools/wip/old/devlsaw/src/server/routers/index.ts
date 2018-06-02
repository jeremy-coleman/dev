/**
 * application main router
 */
import * as express from 'express';
const api = express.Router();
import {default as userRouter} from './user';
import {default as messagingRouter} from './messaging';
import {default as notebookRouter} from './notebook';
import {default as globalRouter} from './global';

api.use('/user', userRouter);
api.use('/messaging', messagingRouter);
api.use('/notebook', notebookRouter);
api.use('/global', globalRouter);

export default api;