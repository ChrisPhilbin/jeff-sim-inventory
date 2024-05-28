import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import { ItemService } from './service/items/item.service';
import { Item } from './model/item.model';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { SidebarComponent } from './components/common/sidebar/sidebar.component';
import { SidebarService } from './service/sidebar/sidebar.service';
import { DialogModule } from 'primeng/dialog';
import { QrCodeScanComponent } from './components/qr-code/qr-code-scan/qr-code-scan.component';
import { AuthService } from './service/auth/auth.service';
import { AppUser } from './model/app-user.model';
import { AuthModule } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AsyncPipe,
    JsonPipe,
    SidebarModule,
    ButtonModule,
    SidebarComponent,
    DialogModule,
    QrCodeScanComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Jefferson School of Nursing - Sim Lab Inventory Portal';
  items: Item[] = [];
  sidebarVisible: boolean = false;
  showScannerModal: boolean = false;
  isUserSignedIn: boolean = false;

  constructor(
    public itemService: ItemService,
    public authService: AuthService,
    private sidebarService: SidebarService
  ) {}

  ngOnInit(): void {
    this.authService.onAuthStateChange();
    this.authService.user$.subscribe((user) => {
      this.isUserSignedIn = user.isUserValid();
      console.log(this.isUserSignedIn, 'is user signed in');
    });

    this.sidebarService.isSidebarVisible.subscribe(
      (visibilityStatus: boolean): void => {
        this.sidebarVisible = visibilityStatus;
      }
    );
  }

  public toggleSidebar(): void {
    this.sidebarService.toggleSidebar();
  }

  public openScanner(): void {
    this.showScannerModal = !this.showScannerModal;
  }

  public async logout(): Promise<void> {
    await this.authService.logout();
  }
}
