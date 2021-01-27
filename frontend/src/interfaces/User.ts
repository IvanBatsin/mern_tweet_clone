export interface IUser {
  email: string,
  fullName: string,
  userName: string,
  // password?: string,
  confirmed?: boolean,
  // confirmHash: string
  _id: string,
  website?: string,
  location?: string,
  about?: string,
  avatarUrl?: string
}