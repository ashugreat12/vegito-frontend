import axios from 'axios';
import { IGetProductsResponse } from 'models';

const isProduction = process.env.NODE_ENV === 'production';
interface CartItem {
  quantity:number,
  _id:string
  // Define your properties here
  // For example: id: number, name: string, price: number, etc.
}
export const getProducts = async (search?:any) => {
  let response: IGetProductsResponse;


    
    response = await axios.get(
      '/api/vegetables/search-vegetables',{params:{search:search?search:''}}
    );
    console.log("****repsonse",response)
    // response = require('static/json/products.json');
    let cartString=localStorage.getItem("cart")

  const { products } = response.data || [];
  if(cartString){

    let cart: CartItem[] = JSON.parse(cartString)
    products.forEach(product=>{
      cart.forEach(el=>{
        if(el._id==product._id){
          product.added=true
          product.addedQuantity=el.quantity
        }
      })
    }) 
  }

  return products;
};
