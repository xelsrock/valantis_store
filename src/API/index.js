import md5 from 'md5';
import { modificateDate } from '../utils';

const getAPIKey = () => {
  const password = 'Valantis';
  const nowDate = new Date();
  const year = nowDate.getFullYear();
  const month = nowDate.getMonth() + 1;
  const day = nowDate.getDate();

  return password + '_' + year + modificateDate(month) + modificateDate(day);
};

export const xAuth = md5(getAPIKey());

export const fetchAllProduct = async () => {
  return await fetch('https://api.valantis.store:40000/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth': xAuth,
    },
    body: JSON.stringify({
      action: 'get_ids',
    }),
  }).then((res) => res.json());
};

export const fetchDataProduct = async (productIds) => {
  return await fetch('https://api.valantis.store:40000/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth': xAuth,
    },
    body: JSON.stringify({
      action: 'get_items',
      params: { ids: productIds.result },
    }),
  }).then((res) => res.json());
};

export const fetchIdProduct = async (page) => {
  return await fetch('https://api.valantis.store:40000/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth': xAuth,
    },
    body: JSON.stringify({
      action: 'get_ids',
      params: { offset: (page - 1) * 50, limit: 50 },
    }),
  }).then((res) => res.json());
};

export const fetchFilterPrice = async (price) => {
  return await fetch('https://api.valantis.store:40000/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth': xAuth,
    },
    body: JSON.stringify({
      action: 'filter',
      params: { price: Number(price) },
    }),
  }).then((res) => res.json());
};

export const fetchFilterTitle = async (title) => {
  return await fetch('https://api.valantis.store:40000/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth': xAuth,
    },
    body: JSON.stringify({
      action: 'filter',
      params: { product: title },
    }),
  }).then((res) => res.json());
};

export const fetchFilterBrand = async (brand) => {
  return await fetch('https://api.valantis.store:40000/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth': xAuth,
    },
    body: JSON.stringify({
      action: 'filter',
      params: { brand: brand },
    }),
  }).then((res) => res.json());
};
