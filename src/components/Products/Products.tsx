import { IProduct } from 'models';
import Product from './Product';

import * as S from './style';

interface IProps {
  products: IProduct[];
}

const Products = ({ products }: IProps) => {
  console.log("*pr1",products)
  return (

    <S.Container style={{display:"flex",flexDirection:"column",paddingLeft:"2%"}} >
      
      {products?.map((p) => (
     
        <div  key={p._id}>
     
        <Product product={p} />
        </div>
      ))}
    
      
    </S.Container>
  );
};

export default Products;
