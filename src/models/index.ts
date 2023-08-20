export interface IProduct {
  _id:string,
  id: number;
  sku: number;
  name:string,
  unit:string,
  title: string;
  ourprice:number,
  description: string;
  availableSizes: string[];
  style: string;
  price: number;
  addedQuantity:number;
  installments: number;
  currencyId: string;
  currencyFormat: string;
  isFreeShipping: boolean;
  img:string,
  added:Boolean,
  quantity:number
}

export interface ICartProduct extends IProduct {
  quantity: number;
  ourprice:number,
  img:string
}

export interface ICartTotal {
  productQuantity: number;
  installments: number;
  totalPrice: number;
  currencyId: string;
  currencyFormat: string;
}

export interface IGetProductsResponse {
  data: {
    products: IProduct[];
  };
}
