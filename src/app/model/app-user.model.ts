export interface AppUser {
  emailAddress: string;
  idToken: string;
  uid: string;
}

export class AppUser {
  constructor(
    public emailAddress: string,
    public idToken: string,
    public uid: string
  ) {}

  public isUserValid(): boolean {
    return this.emailAddress && this.idToken && this.uid ? true : false;
  }
}
