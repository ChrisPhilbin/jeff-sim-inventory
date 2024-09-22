import { Item } from './item.model';

export interface EquipmentList {
  id: number;
  name: string;
  description: string;
  items: Item[];
}
