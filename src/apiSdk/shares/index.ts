import axios from 'axios';
import queryString from 'query-string';
import { SharesInterface, SharesGetQueryInterface } from 'interfaces/shares';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getShares = async (query?: SharesGetQueryInterface): Promise<PaginatedInterface<SharesInterface>> => {
  const response = await axios.get('/api/shares', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createShares = async (shares: SharesInterface) => {
  const response = await axios.post('/api/shares', shares);
  return response.data;
};

export const updateSharesById = async (id: string, shares: SharesInterface) => {
  const response = await axios.put(`/api/shares/${id}`, shares);
  return response.data;
};

export const getSharesById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/shares/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteSharesById = async (id: string) => {
  const response = await axios.delete(`/api/shares/${id}`);
  return response.data;
};
