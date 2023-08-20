import formatPrice from 'utils/formatPrice';
import { ICartProduct } from 'models';

import { useCart } from 'contexts/cart-context';

import * as S from './style';

interface IProps {
  product: ICartProduct;
}
const CartProduct = ({ product }: IProps) => {
  console.log("**p",product)
  const { removeProduct, increaseProductQuantity, decreaseProductQuantity } =
    useCart();
  const {
    sku,
    title,
    price,
    style,
    currencyId,
    unit,
    currencyFormat,
    availableSizes,
    quantity,
    img
  } = product;

  const handleRemoveProduct = () => removeProduct(product);
  const handleIncreaseProductQuantity = () => increaseProductQuantity(product);
  const handleDecreaseProductQuantity = () => decreaseProductQuantity(product);

  return (
    <S.Container >
      <S.DeleteButton
        onClick={handleRemoveProduct}
        title="remove product from cart"
      />
      <S.Image
      style={{objectFit:"contain",height:"10vw",width:"10vw"}}
        src={img}
        alt={title}
      />
      <S.Details style={{paddingLeft:"4%",textAlign:"center",}}>
        
        {/* <S.Title style={{fontWeight:"bold",fontSize:"0.9rem",}} >{title}</S.Title> */}
        <S.Desc style={{fontWeight:"500",fontSize:"0.8rem",textAlign:"center", }}>
         
         <span>
         {product.name.split("-")[0]} <br />
          </span> 
         
        
          
        </S.Desc>
        <div style={{fontSize:"0.8rem",fontWeight:"bold",marginTop:"5%"}}>
        Quantity:  <span >{quantity} * {unit}
          </span>
        </div>
       
      </S.Details>
      <S.Price>
        <p style={{fontSize:"0.9rem",marginBottom:"3%"}}>{`₹ ${ parseInt(formatPrice(price, currencyId))*product.quantity}`}</p>
        <div>
          <S.ChangeQuantity
            onClick={handleDecreaseProductQuantity}
            disabled={quantity === 1 ? true : false}
          >
            -
          </S.ChangeQuantity>
          <S.ChangeQuantity onClick={handleIncreaseProductQuantity}>
            +
          </S.ChangeQuantity>
        </div>
      </S.Price>
    </S.Container>
  );
};

export default CartProduct;
