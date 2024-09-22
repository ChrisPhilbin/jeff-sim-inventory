import { Component, OnInit } from '@angular/core';
import { Item } from '../../../model/item.model';
import { FormsModule } from '@angular/forms';
import { ItemService } from '../../../service/items/item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './item-form.component.html',
  styleUrl: './item-form.component.scss',
})
export class ItemFormComponent implements OnInit {
  item: Item;
  editMode: boolean = false;
  name: string;
  description: string;
  buildToQuantity: number;
  caseCost: number;
  caseQuantity: number;
  currentQuantity: number;
  isActive: boolean;
  lastUsed: string;
  incrementAmount: number;
  id: string;

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          return this.itemService.getItemById(params.get('itemId') as string);
        })
      )
      .subscribe((itemData: Item) => {
        this.item = itemData;
        this.assignItemAttributesToFormFields();
        this.editMode = true;
      });
  }

  private assignItemAttributesToFormFields(): void {
    if (this.item) {
      this.name = this.item.name;
      this.description = this.item.description;
      this.buildToQuantity = this.item.buildToQuantity;
      this.caseCost = this.item.caseCost;
      this.caseQuantity = this.item.caseQuantity;
      this.currentQuantity = this.item.currentQuantity;
      this.isActive = this.item.isActive;
      this.lastUsed = this.item.lastUsed;
      this.incrementAmount = this.item.incrementAmount;
      this.id = this.item.id as string;
    }
  }

  public async onSubmit(): Promise<void> {
    const item: Item = this.createNewItem();
    if (this.editMode) {
      await this.itemService.updateItemById(item);
      this.router.navigate(['/items', item.id]);
    } else {
      await this.itemService.createNewItemAndAppendToItems(item);
      this.router.navigate(['/']);
    }
  }

  private createNewItem(): Item {
    const newlyCreatedItem: Item = new Item(
      this.incrementAmount,
      this.buildToQuantity,
      this.caseCost,
      this.caseQuantity,
      this.currentQuantity,
      this.description,
      this.isActive,
      new Date().toString(),
      this.name,
      this.editMode ? this.id : null
    );
    return newlyCreatedItem;
  }
}
