import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface SharesInterface {
  id?: string;
  company_name: string;
  quantity: number;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface SharesGetQueryInterface extends GetQueryInterface {
  id?: string;
  company_name?: string;
  user_id?: string;
}
