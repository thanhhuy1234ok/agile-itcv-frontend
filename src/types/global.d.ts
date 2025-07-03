export {};

declare global {
  interface IFetchAccount {
    user: import('@/types/user').IUser;
  }
}
