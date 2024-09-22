import { EquipmentList } from './equipment-list.model';

export interface Topic {
  id: number | string;
  name: string;
  description: string;
  minNumberOfInstructors: number;
  equipmentList: EquipmentList[];
  active: boolean;
}
