import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ItemService } from '../../../service/items/item.service';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../../../model/item.model';
import { switchMap } from 'rxjs';
import { LoadingComponent } from '../../common/loading/loading.component';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ItemActionButtonsComponent } from '../item-action-buttons/item-action-buttons.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-item-details',
  standalone: true,
  imports: [
    LoadingComponent,
    CommonModule,
    ItemActionButtonsComponent,
    CurrencyPipe,
  ],
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.scss',
})
export class ItemDetailsComponent implements OnInit {
  item: Item;
  itemClone: Item;
  itemId: string;
  adjustmentButtonsDisabled: boolean = false;
  url: string = window.location.toString();
  itemChanged: boolean = false;

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          return this.itemService.getItemById(params.get('itemId') as string);
        })
      )
      .subscribe((itemData: Item) => {
        this.item = itemData;
        this.itemClone = _.cloneDeep(this.item);
        this.itemChanged = false;
      });
  }

  public adjustAmount(operand: string): void {
    let updatedQuantity: number = this.calculateQuantityBasedOnOperand(
      operand,
      this.item.currentQuantity,
      this.item.incrementAmount
    );
    this.adjustmentButtonsDisabled = true;
    this.itemChanged = true;
    this.itemService
      .adjustCurrentQuantityByGivenAmount(updatedQuantity, this.item)
      .then(() => {
        this.item.currentQuantity = updatedQuantity;
        this.adjustmentButtonsDisabled = false;
      })
      .catch((error) => {
        console.log(
          'Something went wrong adjusting the currentQuantity of the item: ',
          error
        );
        this.adjustmentButtonsDisabled = false;
      });
  }

  private calculateQuantityBasedOnOperand(
    operand: string,
    currentQuantity: number,
    incrementAmount: number
  ): number {
    if (operand === 'ADD') {
      return currentQuantity + incrementAmount;
    } else {
      const newQuantity: number = currentQuantity - incrementAmount;
      return newQuantity <= 0 ? 0 : newQuantity;
    }
  }

  public isQuantityBelowThreshold(): boolean {
    return this.item.currentQuantity < this.item.buildToQuantity;
  }

  public async deleteItem(): Promise<void> {
    if (this.item.id) {
      await this.itemService.deleteItemById(this.item.id);
    }
  }

  public calculateInventoryCost(): number {
    const unitPrice: number = this.item?.caseCost / this.item?.caseQuantity;
    return unitPrice * this.item?.currentQuantity;
  }
}
