import type { IMetaResponse, ITableQuery } from './../../types/index';

export interface IAdminQuery extends ITableQuery {}

export interface IAdmin {
  _id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'superadmin' | 'editor';
  avatar: string;
  isActive: boolean;
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
}

export interface IAdminResponse {
  items: IAdmin[];
  meta: IMetaResponse;
}

export interface IAdminCreateInput {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'superadmin' | 'editor';
  avatar?: string;
  isActive?: boolean;
}

export interface IAdminUpdateInput {
  username?: string;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  role?: 'admin' | 'superadmin' | 'editor';
  avatar?: string;
  isActive?: boolean;
}
