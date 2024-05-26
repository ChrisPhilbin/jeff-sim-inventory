export interface Item {
  incrementAmount: number;
  buildToQuantity: number;
  caseCost: number;
  caseQuantity: number;
  currentQuantity: number;
  description: string;
  isActive: boolean;
  lastUsed: string;
  name: string;
  id?: string | null;
}

export class Item implements Item {
  constructor(
    public incrementAmount: number,
    public buildToQuantity: number,
    public caseCost: number,
    public caseQuantity: number,
    public currentQuantity: number,
    public description: string,
    public isActive: boolean,
    public lastUsed: string,
    public name: string,
    public id?: string | null
  ) {}
}
