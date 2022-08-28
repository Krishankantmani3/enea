import { Schema } from "mongoose";
import mongoose from 'mongoose';

export class Product{
    code: string;
    name: string;
    batch: string;
    stock: number;
    deal: number;
    free: number;
    mrp: number;
    rate: number;
    exp: Date;
    company: string;
    supplier: string;

    constructor(product: Product){
        this.code = product.code;
        this.name = product.name; 
        this.batch = product.batch; 
        this.stock = product.stock; 
        this.deal = product.deal; 
        this.free = product.free; 
        this.mrp = product.mrp; 
        this.rate = product.rate; 
        this.exp = product.exp; 
        this.company = product.company; 
        this.supplier = product.supplier; 
    }
}

let ProductSchema = new Schema({
    code: String,
    name: String,
    batch: String,
    stock: Number,
    deal: Number,
    free: Number,
    mrp: Number,
    rate: Number,
    exp: Date,
    company: String,
    supplier: String
});

export let Products = mongoose.model('Product', ProductSchema);

