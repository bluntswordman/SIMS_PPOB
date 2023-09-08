import type { IBanner, IService, IUser, Response } from "@global/types";

export interface UserState {
  user: Response<IUser>;
  loading: boolean;
  error: string | null;
}

export interface BalanceState {
  balance: number;
  loading: boolean;
  error: string | null;
}

export interface ModuleState {
  banners: IBanner[];
  services: IService[];
  service: IService;
  loading: boolean;
  error: string | null;
}

export interface TransactionState {
  transaction: ITransaction;
  histories: ITransaction[];
  hasMore: boolean;
  loading: boolean;
  error: string | null;
}
