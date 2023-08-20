import { KeyboardEvent } from 'react';

import formatPrice from 'utils/formatPrice';
import { IProduct } from 'models';

import { useCart } from 'contexts/cart-context';

import * as S from './style';

interface IProps {
  product: IProduct;
}
interface CartItem {
  quantity:number,
  _id:string
  // Define your properties here
  // For example: id: number, name: string, price: number, etc.
}

const Product = ({ product }: IProps) => {
  const {
    openCart,
    addProduct,
    total,
    removeProduct,
    increaseProductQuantity,
    decreaseProductQuantity,
  } = useCart();

  useCart();
  const {
    sku,
    title,
    name,
    price,
    installments,
    currencyId,
    ourprice,
    unit,
    quantity,
    currencyFormat,
    isFreeShipping,
    img,
  } = product;
  //
  const handleIncreaseProductQuantity = () => {
    increaseProductQuantity(product);
   
    product.addedQuantity++;
  };
  const handleDecreaseProductQuantity = () => {
   
    decreaseProductQuantity(product);
    if (product.addedQuantity == 1) {
      removeProduct(product)
      // let cartString = localStorage.getItem('cart');
      // if (cartString) {
      //   let cart: CartItem[] = JSON.parse(cartString);
      
      //   console.log('*cart', cart);
      //   localStorage.setItem("cart",JSON.stringify(cart))
      // } 
      product.added = false;
    }
    product.addedQuantity--;
  };
  const handleRemoveProduct = () => {
    removeProduct(product);
  };
  const formattedPrice = formatPrice(price, currencyId);
  let productInstallment;
  if (!localStorage.getItem('name')) {
    localStorage.setItem('name', 'dhruv');
  }

  if (installments) {
    const installmentPrice = price / installments;

    productInstallment = (
      <S.Installment>
        <span>or {installments} x</span>
        <b>
          {currencyFormat}
          {formatPrice(installmentPrice, currencyId)}
        </b>
      </S.Installment>
    );
  }

  const handleAddProduct = () => {
    let cartString = localStorage.getItem('cart');
    if (cartString) {
      let cart: CartItem[] = JSON.parse(cartString);
      cart.push({ ...product, quantity: 1 });
      console.log('*cart', cart,total);
      localStorage.setItem("cart",JSON.stringify(cart))
    } else {
      localStorage.setItem(
        'cart',
        JSON.stringify([{ ...product, quantity: 1 }])
      );
    }

    addProduct({ ...product, quantity: 1,unit:unit });
    product.added = true;
    product.addedQuantity = product.addedQuantity
      ? product.addedQuantity + 1
      : 1;
    // openCart();
  };

  const handleAddProductWhenEnter = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.code === 'Space') {
      addProduct({ ...product, quantity: 1,unit:unit });
      openCart();
    }
  };

  return (
    <S.Container onKeyUp={handleAddProductWhenEnter} sku={img} tabIndex={1}>
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
        <div className="circular-image" style={{ width: '20%' }}>
          <img  src={img} alt={name} />
        </div>

        <div style={{ width: '45%', flexDirection: 'column' }}>
          <S.Title>{name.split('-')[0]}</S.Title>
          <S.Price>
            <S.Val>
              <span style={{ fontSize: '1rem' }}>₹</span>
              <b style={{ fontSize: '1rem' }}>{ourprice}</b>
              <span>/{unit}</span>
            </S.Val>
          </S.Price>
        </div>

        {product.added && (
          <div style={{ width: '35%', marginTop: '3%' }}>
            <S.ChangeQuantity
              onClick={handleDecreaseProductQuantity}
              disabled={quantity === 1 ? true : false}
              style={{ marginRight: '20px' }}
            >
              -
            </S.ChangeQuantity>
            {product.addedQuantity}
            <S.ChangeQuantity
              style={{ marginLeft: '20px' }}
              onClick={handleIncreaseProductQuantity}
            >
              +
            </S.ChangeQuantity>
          </div>
        )}
        {!product.added && (
          <div style={{ width: '35%' }}>
            <S.BuyButton onClick={handleAddProduct} tabIndex={-1}>
              Add
            </S.BuyButton>
          </div>
        )}
      </div>
    </S.Container>
  );
};

export default Product;
