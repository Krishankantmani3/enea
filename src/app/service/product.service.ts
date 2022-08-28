import moment from "moment";
import { ProductDao } from "../../mongodb/dao/product.dao";
import { Product } from "../../mongodb/model/product.model";

const LIMIT_FOR_PAGING = 30;

export class ProductService {
    private productDao: ProductDao;

    constructor() {
        this.productDao = new ProductDao();
        this.insertManyProducts = this.insertManyProducts.bind(this);
    }

    async insertManyProducts(products: any) {
        try {
            products = products.map( (product: Product) => {
                // in case of invaid date setting current data.
                product['exp'] = moment(product.exp, true).isValid() ? new Date(product.exp): new Date();
                return product;
            });
            await this.productDao.insertManyProducts(products);
        }
        catch (err) {
            console.error("product.service.ts", "ProductService", "insertManyProducts", err);
            throw err;
        }
    }

    async getProductsBySupplierName(supplierName: any, limit?, offset?) {
        try {
            // due to large output data paging is mandatry even no query-params in request
            limit = limit && !isNaN(limit) ? parseInt(limit) : LIMIT_FOR_PAGING;
            offset = offset && !isNaN(limit) ? parseInt(offset) : 0;
            let products = await this.productDao.getProductsBySupplierName(supplierName, limit, offset);
            return products;
        }
        catch (err) {
            console.error("product.service.ts", "ProductService", "getProductsBySupplierName", err);
            throw err;
        }
    }

    async getNotExpiredProductsBySuppliers(suppliers: any, limit?, offset?) {
        try {
            // due to large output data paging is mandatry even no query-params in request
            limit = limit && !isNaN(limit) ? parseInt(limit) : LIMIT_FOR_PAGING;
            offset = offset && !isNaN(limit) ? parseInt(offset) : 0;
            let products = await this.productDao.getNotExpiredProductsBySuppliers(suppliers, limit, offset);
            return products;
        }
        catch (err) {
            console.error("product.service.ts", "ProductService", "getProductsBySupplierName", err);
            throw err;
        }
    }
}