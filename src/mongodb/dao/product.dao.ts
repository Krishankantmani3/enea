import { Product, Products } from "../model/product.model";

export class ProductDao {

    public async insertManyProducts(products: any) {
        try {
           await Products.insertMany(products);
        }
        catch (err) {
            console.error("product.dao.ts", "ProductDao", "insertManyProducts", err);
            throw "database error";
        }
    }

    public async getProductsBySupplierName(supplierName: any, limit, offset) {
        try {
           let products = await Products.find({supplier: supplierName}).skip(offset).limit(limit);
           return products;
        }
        catch (err) {
            console.error("product.dao.ts", "ProductDao", "getProductsBySupplierName", err);
            throw "database error";
        }
    }

    public async getNotExpiredProductsBySuppliers(suppliers: any, limit, offset) {
        try {
           let products = await Products.find({supplier: {$in: suppliers}, exp: {$lte: new Date()}}).skip(offset).limit(limit);
           return products;
        }
        catch (err) {
            console.error("product.dao.ts", "ProductDao", "getProductsBySuppliers", err);
            throw "database error";
        }
    }
}
