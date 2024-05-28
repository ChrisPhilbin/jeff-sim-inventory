import { Component } from '@angular/core';
import { AuthService } from '../../service/auth/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  public email: string = '';
  public password: string = '';

  constructor(private authService: AuthService) {}

  public async signIn(): Promise<void> {
    await this.authService.signIn(this.email, this.password);
  }
}
