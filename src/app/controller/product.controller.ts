import { Application, Router } from "express";
import { ProductService } from "../service/product.service";
import { csvUpload, readXLSX_File } from "../utils/csv-upload";

export class ProductController {

    router: Router;
    app: Application;
    productService: ProductService;
    constructor(app: Application, router: Router) {
        this.app = app;
        this.router = router;
        this.productService = new ProductService();
    }

    configureRouting() {
        this.router.post(`/products/file`, csvUpload.single('csv'), async (req, res, next) => {
            try {
                if (!req.file)
                    return res.status(400).json({status: "failed", message: "file extension may not be correct"});
                let productDetails = await readXLSX_File(req.file.path);
                await this.productService.insertManyProducts(productDetails);
                res.status(200).json({ status: "success", message: "product list added successfully" });
            } catch (error) {
                console.error("product.controller.ts", "ProductController", "`${baseUrl}/file` methd - post", error);
                res.status(500).json({status: "failed", message: "internal server error"});
            }
        });

        this.router.get("/products", async (req, res, next) => {
            try {
                let supplierName = req.query.supplier;
                if(!supplierName){
                    return res.status(400).json({status: "failed", message: "no supplier name is passed"});
                }
                
                let products = await this.productService.getProductsBySupplierName(supplierName, req.query.limit, req.query.offset);
                return res.status(200).json({products: products});
            } catch (error) {
                console.error("product.controller.ts", "ProductController", "products - get", error);
                res.status(500).json({status: "failed", message: "internal server error"});
            }
        });

        this.router.get("/products/not-expired", async (req, res, next) => {
            try {
                let suppliers = req.body.suppliers;
                if(!suppliers || !suppliers.length){
                    return res.status(400).json({status: "failed", message: "no suppliers name is passed"});
                }

                let products = await this.productService.getNotExpiredProductsBySuppliers(suppliers, req.query.limit, req.query.offset);
                return res.status(200).json({products: products});
            } catch (error) {
                console.error("product.controller.ts", "ProductController", "/products/not-expired - get", error);
                res.status(500).json({status: "failed", message: "internal server error"});
            }
        });

    }
};
