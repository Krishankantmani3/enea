import express, { Application } from "express";
import { ProductController } from "../controller/product.controller";

export class Approutes {
  router: express.Router;
  productController: ProductController;

  constructor(app: Application) {
    this.router = express.Router();
    this.productController = new ProductController(app, this.router);
    app.use('/api', this.router);
    this.configureRoutes();
    app.use('*', (req, res) => {
      res.status(404).json({ message: "resource not found" });
    });
  }

  configureRoutes() {
    // all routes goes here
    this.productController.configureRouting();
  }
}