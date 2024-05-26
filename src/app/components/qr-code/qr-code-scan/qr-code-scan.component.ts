import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library';

@Component({
  selector: 'app-qr-code-scan',
  standalone: true,
  imports: [CommonModule, ZXingScannerModule],
  templateUrl: './qr-code-scan.component.html',
  styleUrl: './qr-code-scan.component.scss',
})
export class QrCodeScanComponent {
  formats: BarcodeFormat[] = [BarcodeFormat.QR_CODE];

  @Input()
  cameraOn: boolean = false;

  public scanSuccess(event: string): void {
    if (event.includes('items')) {
      this.cameraOn = false;
      window.location.href = event;
    }
  }
}
