import { Product } from 'src/app/product/model/product';
import { Stock } from 'src/app/stock/model/stock';
import { Warehouse } from 'src/app/warehouse/model/warehouse';

export class Mouvement {
  produit: Product;
  type: string;
  stock: Stock;
  quantite: number;
  date: Date;
}
