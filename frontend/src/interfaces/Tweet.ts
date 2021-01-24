export interface Tweet {
  _id: string,
  text: string,
  createdAt: Date,
  user: {
    fullName: string,
    userName: string,
    avatarUrl: string
  }
}