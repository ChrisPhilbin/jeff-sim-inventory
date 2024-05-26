import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../service/items/item.service';
import { Item } from '../../model/item.model';
import { QRCodeModule } from 'angularx-qrcode';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-qr-code',
  standalone: true,
  imports: [QRCodeModule],
  templateUrl: './qr-code.component.html',
  styleUrl: './qr-code.component.scss',
})
export class QrCodeComponent implements OnInit {
  private readonly BASEURL = 'https://zenacad-dev.web.app/items/';
  items: Item[] = [];
  itemId: string = '';
  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.itemId = params.get('itemId') as string;
          return this.itemService.getItemById(this.itemId);
        })
      )
      .subscribe((itemData: Item) => {
        this.items.push(itemData);
      });

    if (!this.itemId) {
      this.itemService.items$.subscribe((items: Item[]): void => {
        this.items = items;
      });

      if (!this.items.length) {
        this.itemService.getAllItems();
      }
    }
  }

  generateUrlForQrCode(item: Item): string {
    return this.BASEURL + item?.id;
  }
}
