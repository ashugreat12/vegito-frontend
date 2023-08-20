import { useEffect, useState } from 'react';

import Loader from 'components/Loader';
import { GithubCorner, GithubStarButton } from 'components/Github';
import Recruiter from 'components/Recruiter';
import Filter from 'components/Filter';
import Products from 'components/Products';
import Cart from 'components/Cart';
import { SplashScreen } from '@capacitor/splash-screen';

import { useProducts } from 'contexts/products-context';

import * as S from './style';
import Login from 'components/login/Login';
import axios from 'axios';
import Myorders from 'components/MyOrdrs/MyOrders';

function App() {
  const { isFetching, products, fetchProducts } = useProducts();
  const [user, setUser] = useState('');
  axios.defaults.baseURL = 'https://enthusiastic-elk-umbrella.cyclic.cloud';
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
    if (localStorage.getItem('user')) {
      setUser(JSON.stringify(localStorage.getItem('user')));
    } 
     if (localStorage.getItem('user') != null) {
      let userData = localStorage.getItem('user');
      let userId = userData ? JSON.parse(userData).user._id : null;
   axios.get("/api/user/get-user-by-id",{params:{userId:userId}}).then(response=>{
    localStorage.setItem("user",JSON.stringify(response.data))
   })
    
     }
  }, []);
  return (
    <S.Container >
      {!user && (
        <div>
          <Login></Login>
        </div>
      )}

      {user && (
        <div >
          <div className="wrapper">
            {/* <div className="label">Submit your search</div> */}
            <div className="searchBar">
              <input
                id="searchQueryInput"
                onInput={(e) => {
                  fetchProducts(e.currentTarget.value);
                }}
                name="searchQueryInput"
                placeholder="What You Want?"
              />
              <button
                id="searchQuerySubmit"
                type="submit"
                name="searchQuerySubmit"
              >
                <svg viewBox="0 0 24 24">
                  <path
                    fill="#666666"
                    d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
                  />
                </svg>
              </button>
            </div>
          </div>
          {isFetching && <Loader />}
          {/* <GithubCorner /> */}
          <Recruiter />
          <Myorders key={1}></Myorders>
          <S.TwoColumnGrid>
            {/* <S.Side>
          <Filter />
          <GithubStarButton />
        </S.Side> */}
            <S.Main>
              <S.MainHeader >
                <p>{products?.length}  Product(s) found</p>
              </S.MainHeader>
              <div style={{width:"100%"}}>
              </div>
              <Products  products={products} />
             
            
            </S.Main>
          </S.TwoColumnGrid>
          <Cart />
        </div>
      )}
    </S.Container>
  );
}

export default App;
