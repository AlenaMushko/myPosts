export interface IBaseIdName {
  id: string;
  name: string;
}

export interface IProductData extends IBaseIdName {
  img_url: string;
  manufacturer: string;
  price: string;
  rating: string;
  sku: number;
}
