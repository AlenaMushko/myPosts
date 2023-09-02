import { IBaseIdName } from './products';

export interface ICategoriesData extends IBaseIdName {
  children?: IBaseIdName[];
}
