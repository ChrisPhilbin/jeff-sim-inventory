import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  isSidebarVisible: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor() {}

  public toggleSidebar(): void {
    this.isSidebarVisible.next(!this.isSidebarVisible.value);
  }
}
