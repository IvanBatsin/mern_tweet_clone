export interface User {
  email: string,
  fullName: string,
  userName: string,
  confirmed: boolean,
  _id: string,
  website?: string,
  location?: string,
  about?: string,
  avatarUrl?: string
}