export enum LoadingState {
  LOADED = 'LOADED',
  LOADING = 'LOADING',
  ERROR = 'ERROR',
  NEVER = 'NEVER'
}

export enum AddFromLoading {
  LOADING = 'LOADING',
  ERROR = 'ERROR',
  NEVER = 'NEVER'
}

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

export interface TweetsState {
  items: Tweet[],
  loadingState: LoadingState,
  addFormLoadingState: AddFromLoading
}