import formatPrice from 'utils/formatPrice';

import { useCart } from 'contexts/cart-context';

import * as S from './style';
import { placeOrder } from 'services/order';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
let deliveryAddress = '';
let orders = [];
interface OrderItem {
  name: string;
}

// Define the interface for the order
interface Order {
  items: OrderItem[];
  orderItemsString: string;
  status: string;
  _id: string;
  total:String;
  // Add other properties if there are any
}
export default function Myorders() {
  // const { products, total, isOpen, openCart, closeCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);

  //   const handleCheckout = () => {
  //     console.log("*cart products",products,total)
  //     if (total.productQuantity && deliveryAddress?.length>0) {
  //       let data={userId:"123",items:products,total:total.totalPrice,address:deliveryAddress}
  //      placeOrder(data)
  //     } else if(deliveryAddress=="") {
  //       alert("Please enter delivery address")

  //     }else{

  //       alert('Add some product in the cart!');
  //     }
  //   };

  useEffect(() => {
    if (localStorage.getItem('user') != null) {
      let userData = localStorage.getItem('user');
      let userId = userData
        ? JSON.parse(userData).user?._id
        : null;
        axios
        .get('/api/orders/get-orders', { params: { userId: userId } })
        .then((response) => {
          const responseData = response.data as Order[]; // Explicitly cast the data to Order[] type
          const modifiedOrders = responseData.map((el: Order) => {
            const orderItemsString = el.items
              .map((item: OrderItem) => item.name.split('-')[0])
              .join(', ');
            return { ...el, orderItemsString };
          });
          setOrders(modifiedOrders);
          console.log('**modified', modifiedOrders);
        })
        .catch((error) => {
          console.error('Error fetching orders:', error);
        });
    }
  
  }, []);

  const cancelOrder = useCallback(
    (orderId: String, index: number) => {
      console.log(index);
      orders[index].status = 'cancelled';
      console.log(index, orders, orderId);
      setOrders(orders);
      axios
        .post('/api/orders/cancel-order', { orderId: orderId })
        .then((response) => {
          alert('Order Cancelled');
          window.location.reload();
        });
    },
    [orders]
  );

  const handleToggleCart = (isOpen: boolean) => () =>
    isOpen ? setIsOpen(false) : setIsOpen(true);

  return (
    <div>
      <S.CartButton onClick={handleToggleCart(isOpen)}>
        {isOpen ? (
          <span style={{ color: 'black' }}>X</span>
        ) : (
          <S.CartIcon>
            
          </S.CartIcon>
        )}
      </S.CartButton>
      <S.Container isOpen={isOpen}>
        <S.CartButton onClick={handleToggleCart(isOpen)}>
          {isOpen ? (
            <span style={{ color: 'black', fontWeight: 'bold' }}>X</span>
          ) : (
            <S.CartIcon>
              <S.CartQuantity title="Products in cart quantity">
                {/* {total.productQuantity} */}
              </S.CartQuantity>
            </S.CartIcon>
          )}
        </S.CartButton>
        <div
          className="order-container"
          style={{
            color: 'black',
            display: 'flex',
            marginTop: '10%',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              width: '100%',
              textAlign: 'center',
              fontWeight: 'bold',
              textDecoration: 'underline',
              marginBottom: '10%',
              marginTop: '5%',
            }}
          >
            <span>My Orders</span>
          </div>
          {orders?.length==0&&(<div>
            <p style={{marginTop:"20%",fontWeight:"500",fontSize:"1rem",marginLeft:"35%"}}>No order Placed !</p>
          </div>)}
          {orders.map((order, index) => (
            <div style={{ display: 'flex' }}>
              <div
                style={{
                  width: '70%',
                  display: 'flex',
                  flexDirection: 'column',
                  marginLeft: '4%',
                  marginBottom: '5%',
                }}
              >
                <span style={{ fontWeight: 'bold', marginBottom: '3%' }}>
                  order {index + 1}
                </span>
                <span style={{ marginBottom: '3%' }}>
                  {order.orderItemsString}
                </span>
                <span style={{ marginBottom: '3%' }}>
                  {order.total} Rs
                </span>
                {/* <span style={{ marginBottom: '3%' }}>{order.status}</span> */}
              </div>
              <div style={{ width: '30%' }}>
                {order?.status == 'Placed' && (
                  <button
                    className="button-24"
                    onClick={() => {
                      cancelOrder(order._id, index);
                    }}
                  >
                    Cancel
                  </button>
                )}
                {order?.status == 'cancelled' && (
                  <button
                    className="button-24"
                    style={{ backgroundColor: `grey` ,border:"none",fontSize:'0.7rem'}}
                  
                  >
                    Cancelled
                  </button>
                )}
              </div>
            </div>
          ))}
          {/* <span>hello</span> */}
        </div>
      </S.Container>
    </div>
  );
}
