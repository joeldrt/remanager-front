export class UserExtra {
  constructor(
    public id: string,
    public login: string,
    public profilePictureUrl: string,
    public picturesUrls: string[],
  ) {
  }
}
