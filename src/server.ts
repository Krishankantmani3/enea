import { envValidationForProd } from "./app/config/env.config";
import express from "express";
import { Approutes } from "./app/config/routes";
import setMongooseConfig from './mongodb/config/mongoose.config';
import http from 'http';
const PORT = parseInt(process.env.PORT as string);

envValidationForProd();
setMongooseConfig();

var app = express();
app.use(express.json());
const appRoutes = new Approutes(app);
const httpServer = http.createServer(app);

httpServer.listen(PORT, () => {
    console.log("http running on " + PORT);
});
