import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../../service/items/item.service';
import { Item } from '../../../model/item.model';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from '../../common/loading/loading.component';

@Component({
  selector: 'app-item-index',
  standalone: true,
  imports: [CommonModule, TableModule, FormsModule, LoadingComponent],
  templateUrl: './item-index.component.html',
  styleUrl: './item-index.component.scss',
})
export class ItemIndexComponent implements OnInit {
  items: Item[] = [];
  itemsClone: Item[] = [];
  searchTerm: string = '';
  isLoading: boolean = false;
  error: string = '';

  constructor(private itemsService: ItemService, private router: Router) {}

  ngOnInit(): void {
    this.error = '';
    this.isLoading = true;
    this.itemsService.items$.subscribe({
      next: (items: Item[]): void => {
        this.items = this.itemsService.sortItems(items);
        this.itemsClone = _.cloneDeep(this.items);
        this.isLoading = false;
      },
      error: (error) => {
        console.error(
          'There was an error when attempting to get all items: ',
          error
        );
        this.isLoading = false;
        this.error =
          'There was an error when attempting to get all available items. Please try again.';
      },
    });

    this.itemsService.getAllItems();
  }

  public navigateToItem(itemId: any): void {
    this.router.navigate(['/items', itemId]);
  }

  public navigateToCreateForm(): void {
    this.router.navigate(['/items/new']);
  }

  public navigateToQrCodes(): void {
    this.router.navigate(['/code']);
  }

  public navigateToScan(): void {
    console.log('scan');
    this.router.navigate(['/code/scan']);
  }

  public isQuantityBelowThreshold(item: Item): boolean {
    return item.currentQuantity < item.buildToQuantity;
  }

  public searchItems(searchTerm: string): void {
    if (searchTerm === '') {
      this.items = _.cloneDeep(this.itemsClone);
    }
    this.items = this.items.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  public resetSearch(): void {
    this.searchTerm = '';
    this.items = _.cloneDeep(this.itemsClone);
  }
}
