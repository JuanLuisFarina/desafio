import { productModelName, productSchema } from './config/schemaConfig.js';
import MongoContainer from './MongoContainer.js';
export default class MongoProducts extends MongoContainer{
    constructor(){
        super(productModelName, productSchema);
    }
    
    async updateProduct(product, productId){
        try {
            return this.collection.updateOne({_id : productId}, product);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
