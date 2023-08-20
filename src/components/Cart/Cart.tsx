import formatPrice from 'utils/formatPrice';
import CartProducts from './CartProducts';

import { useCart } from 'contexts/cart-context';

import * as S from './style';
import { placeOrder } from 'services/order';
import { useCallback, useEffect, useState } from 'react';
let deliveryAddress = '';
const Cart = () => {
  const { products, total, isOpen, openCart, closeCart,  } =
    useCart();

  const [thnku, setThanku] = useState(false);
  const [address, setAddress] = useState('');
  useEffect(() => {
    if (localStorage.getItem('user') != null) {
      let userData = localStorage.getItem('user');
      let address = userData
        ? JSON.parse(userData).user?.profile?.address
        : null;
      if (address) {
        setAddress(address);
      }
    }
  }, []);
  const handleCheckout = useCallback(() => {
    if (total.productQuantity && address?.length > 0) {
      if (localStorage.getItem('user') != null) {
        let userData = localStorage.getItem('user');
        let userId = userData ? JSON.parse(userData).user._id : null;
        console.log('*user', userData, userId);
        let data = {
          userId: userId,
          items: products,
          total: total.totalPrice,
          address: address,
          status: 'Placed',
        };
      
          localStorage.removeItem('cart');
    
        placeOrder(data);
      }
      // setThanku(true)
    } else if (deliveryAddress == '') {
      alert('Please enter delivery address');
    } else {
      alert('Add some product in the cart!');
    }
  }, [address]);

  const handleToggleCart = (isOpen: boolean) => () =>
    isOpen ? closeCart() : openCart();

  return (
    <S.Container isOpen={isOpen}>
      <S.CartButton onClick={handleToggleCart(isOpen)}>
        {isOpen ? (
          <span style={{ fontSize: '1rem' }}>X</span>
        ) : (
          <S.CartIcon>
            <S.CartQuantity title="Products in cart quantity">
              {total.productQuantity}
            </S.CartQuantity>
          </S.CartIcon>
        )}
      </S.CartButton>

      {isOpen && (
        <S.CartContent>
          <S.CartIcon2 style={{ marginLeft: '40%' }} large>
            <S.CartQuantity>{total.productQuantity}</S.CartQuantity>
          </S.CartIcon2>
          {/* <S.HeaderTitle>Cart</S.HeaderTitle> */}

          <CartProducts products={products} />

          <S.CartFooter>
            <div style={{ display: 'flex', width: '100%' }}>
              <p
                style={{
                  fontWeight: 'bold',
                  color: '#5b5a5e',
                  fontSize: '0.8rem',
                  width: '95%',
                }}
              >
                Free Delivery
              </p>
              <span>-</span>
            </div>

            <S.Sub>Total</S.Sub>
            <S.SubPrice>
              <S.SubPriceValue>{`₹ ${formatPrice(
                total.totalPrice,
                total.currencyId
              )}`}</S.SubPriceValue>

              <S.SubPriceInstallment>
                {total.installments ? (
                  <span>
                    {`OR UP TO ${total.installments} x ${
                      total.currencyFormat
                    } ${formatPrice(
                      total.totalPrice / total.installments,
                      total.currencyId
                    )}`}
                  </span>
                ) : null}
              </S.SubPriceInstallment>
            </S.SubPrice>

            <div>
              <input
                id="addressInput"
                onInput={(e) => {
                  deliveryAddress = e?.currentTarget?.value;
                  setAddress(e?.currentTarget?.value);
                }}
                value={address}
                name="addressInput"
                placeholder="Enter Delivery Address (Cash/UPI on Delivery)"
              />
            </div>

            <S.CheckoutButton onClick={handleCheckout} autoFocus>
              Checkout
            </S.CheckoutButton>
          </S.CartFooter>
        </S.CartContent>
      )}
      {/* {isOpen &&( <div className="modal">
    <div className="modal-content">
      <h2>Welcome to Our Website</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      <button className="close">Close</button>
    </div>
  </div>)} */}
    </S.Container>
  );
};

export default Cart;
