import { Category } from 'src/app/category/model/category';
import { Unit } from 'src/app/unit/model/unit';
import { Warehouse } from 'src/app/warehouse/model/warehouse';
import { Provider } from 'src/app/provider/model/provider';

export class Product {
  id: number;
  nom: string;
  description: string;
  type: string;
  prixAchat: number;
  quantiteEnStock: number;
  fournisseur: Provider;
  categorie: Category;
  emplacement: Warehouse;
  uniteDeMesure: Unit;
  quantiteTotale: number;
  quantiteMin: number;
}
