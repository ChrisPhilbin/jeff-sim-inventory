import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from '../../../service/items/item.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-item-action-buttons',
  standalone: true,
  imports: [CommonModule, ConfirmDialogModule, ToastModule],
  templateUrl: './item-action-buttons.component.html',
  styleUrl: './item-action-buttons.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class ItemActionButtonsComponent {
  @Input()
  itemId: any = '';

  constructor(
    private router: Router,
    private itemService: ItemService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  public navigateToEdit(): void {
    this.router.navigate(['/items', this.itemId, 'edit']);
  }

  public navigateToGenerateQrCode(): void {
    this.router.navigate(['/code', this.itemId]);
  }

  public deleteItem(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to delete this item?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        this.itemService.deleteItemById(this.itemId);
        this.messageService.add({
          severity: 'info',
          summary: 'Success',
          detail: 'Item was successfully removed!',
        });
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 3000);
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Cancelled',
          detail: 'The item was not removed from the database.',
        });
      },
    });
  }
}
