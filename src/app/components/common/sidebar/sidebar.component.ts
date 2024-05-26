import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../../service/items/item.service';
import { Item } from '../../../model/item.model';
import { Router } from '@angular/router';
import { SidebarService } from '../../../service/sidebar/sidebar.service';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import * as _ from 'lodash';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [StyleClassModule, ButtonModule, FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  items: Item[] = [];
  itemsClone: Item[] = [];
  searchTerm: string = '';

  constructor(
    private itemService: ItemService,
    private router: Router,
    private sidebarService: SidebarService
  ) {}

  ngOnInit(): void {
    this.itemService.items$.subscribe((items: Item[]): void => {
      this.items = this.itemService.sortItems(items);
      this.itemsClone = _.cloneDeep(this.items);
    });
    this.itemService.getAllItems();
  }

  public navigateToItem(itemId: any): void {
    this.router.navigate(['/items', itemId]);
    setTimeout(() => {
      this.sidebarService.toggleSidebar();
    }, 200);
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
