import axios from 'axios';

export const placeOrder = async (body?:any) => {
  let response=   await axios.post(
    '/api/orders/place-order',body)

    if(response.status==200){
     alert("Thanku Your Order is placed , will be delivered tommorw between 6-9am") 
    window.location.reload()
    }
  

}
  

 
    
  

