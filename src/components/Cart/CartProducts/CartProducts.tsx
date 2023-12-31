import { ICartProduct } from 'models';
import CartProduct from './CartProduct';

import * as S from './style';

interface IProps {
  products: ICartProduct[];
}
let deliveryAddress=""
const CartProducts = ({ products }: IProps) => {
  return (
  
    <S.Container>
      {products?.length ? (
        products.map((p) => <CartProduct product={p} key={p.sku} />)
      ) : (
        <S.CartProductsEmpty>
          Add some products in the cart <br />
          :)
        </S.CartProductsEmpty>
      )}
        
    </S.Container>
   
    

  );
};

export default CartProducts;
