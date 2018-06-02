import * as dotenv from 'dotenv';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import {guard} from './middleware/guard';
import {default as routers} from './routers';
import * as mongoose from 'mongoose';
import * as passport from 'passport';
import { PassportConfig } from './config/passport';
//import * as swaggerUi from 'swagger-ui-express';
//const swaggerDocument = require('./api-doc/swagger.json');


class App {

    public express: express.Application;

    constructor() {
        this.setEnvironment();
        this.express = express();
        this.database();
        this.middleware();
        this.routes();
    }

 
    private database(): void {
        mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
        mongoose.connection.on('error', () => {
            console.log('MongoDB connection error. Please make sure MongoDB is running.');
            process.exit();
        });
    }

    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,PUT,POST,DELETE');
            res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            if(req.method === 'OPTIONS'){
                res.status(200).send();
            } else {
                next();
            }
        });
        this.express.use(guard);
        this.express.use(passport.initialize());
        this.express.use(passport.session());
        const pConfig = new PassportConfig(passport);
        pConfig.init();
    }

    private setEnvironment(): void {
        if (process.env.NODE_ENV === 'test') {
            dotenv.config({ path: ".env.test" });
        } else {
            dotenv.config({ path: ".env" });
        }
    }

    /**
     * API main v1 routes
     */
    private routes(): void {
        this.express.use('/v1', routers);
        this.express.use('/', (req, res) => {
            res.status(404).send({ error: `path doesn't exist`});
        });
    }

}

export default new App().express;