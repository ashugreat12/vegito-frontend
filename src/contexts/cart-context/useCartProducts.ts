
import { useEffect } from 'react';
import { useCartContext } from './CartContextProvider';
import useCartTotal from './useCartTotal';
import { ICartProduct } from 'models';
interface CartItem {
  quantity:number,
  _id:string
  // Define your properties here
  // For example: id: number, name: string, price: number, etc.
}
const useCartProducts = () => {
  const { products, setProducts } = useCartContext();
  const { updateCartTotal } = useCartTotal();
useEffect(()=>{
if(localStorage.getItem("cart")){

  let cartString = localStorage.getItem('cart');
    if (cartString) {
      let cart: ICartProduct[] = JSON.parse(cartString);
     
      setProducts(cart)
      updateCartTotal(cart)
    } 
}
},[])
  const updateQuantitySafely = (
    currentProduct: ICartProduct,
    targetProduct: ICartProduct,
    quantity: number
  ): ICartProduct => {
    if (currentProduct.name=== targetProduct.name) {
      return Object.assign({
        ...currentProduct,
        quantity: currentProduct.quantity + quantity,
      });
    } else {
      return currentProduct;
    }
  };

  const addProduct = (newProduct: ICartProduct) => {
    console.log("*new product",newProduct)
    let updatedProducts;
    const isProductAlreadyInCart = products.some(
      (product: ICartProduct) => newProduct.name === product.name
    );

    if (isProductAlreadyInCart) {
      updatedProducts = products.map((product: ICartProduct) => {
        return updateQuantitySafely(product, newProduct, newProduct.quantity);
      });
    } else {
      updatedProducts = [...products, newProduct];
    }
console.log("*updated products",updatedProducts)
    setProducts(updatedProducts);
    updateCartTotal(updatedProducts);
  };

  const removeProduct = (productToRemove: ICartProduct) => {
    const updatedProducts = products.filter(
      (product: ICartProduct) => product._id !== productToRemove._id
    );
    let cartString = localStorage.getItem('cart');
    if (cartString) {
      let cart: CartItem[] = JSON.parse(cartString);
      cart.forEach(el=>{
        if(el._id==productToRemove._id){
       
            cart=cart.filter(el=>el._id!=productToRemove._id);
          
        
        }
    
      });
      localStorage.setItem("cart",JSON.stringify(cart))
    } 
    setProducts(updatedProducts);
    updateCartTotal(updatedProducts);
  };

  const increaseProductQuantity = (productToIncrease: ICartProduct) => {
console.log("*increase fun")
    const updatedProducts = products.map((product: ICartProduct) => {
    
      
      return updateQuantitySafely(product, productToIncrease, +1);
    });

    let cartString = localStorage.getItem('cart');
    if (cartString) {
      let cart: CartItem[] = JSON.parse(cartString);
      cart.forEach(el=>{
        if(el._id==productToIncrease._id){
          console.log("*increase hit",el._id)
          el.quantity++
        }
    
      });
      localStorage.setItem("cart",JSON.stringify(cart))
    } 

    setProducts(updatedProducts);
    updateCartTotal(updatedProducts);
  };

  const decreaseProductQuantity = (productToDecrease: ICartProduct) => {
    const updatedProducts = products.map((product: ICartProduct) => {
      
  
      return updateQuantitySafely(product, productToDecrease, -1);
    });
    let cartString = localStorage.getItem('cart');
    if (cartString) {
      let cart: CartItem[] = JSON.parse(cartString);
      cart.forEach(el=>{
        if(el._id==productToDecrease._id){
          if(el.quantity==1){
            cart=cart.filter(el=>el._id!=productToDecrease._id);
          }else{
            el.quantity--
          }
        
        }
    
      });
      localStorage.setItem("cart",JSON.stringify(cart))
    }
    setProducts(updatedProducts);
    updateCartTotal(updatedProducts);
  };


  return {
    products,
    addProduct,
    removeProduct,
    increaseProductQuantity,
    decreaseProductQuantity,
  };
};

export default useCartProducts;
