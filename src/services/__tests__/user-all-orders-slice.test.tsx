import { TOrder } from '@utils-types';
import {
  userOrdersSlice,
  getUserOrders
} from '../slices/user-all-orders-slice';

const mockOrders = [
  {
    _id: '6760e16f750864001d371cf9',
    ingredients: [
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa093e'
    ],
    status: 'done',
    name: 'Краторный люминесцентный бургер',
    createdAt: '2024-12-17T02:26:55.824Z',
    updatedAt: '2024-12-17T02:26:56.754Z',
    number: 62982
  },
  {
    _id: '67613f4f750864001d371de0',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa0941'
    ],
    status: 'done',
    name: 'Флюоресцентный био-марсианский бургер',
    createdAt: '2024-12-17T09:07:27.638Z',
    updatedAt: '2024-12-17T09:07:28.634Z',
    number: 62989
  },
  {
    _id: '67614059750864001d371de2',
    ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0943'],
    status: 'done',
    name: 'Краторный space бургер',
    createdAt: '2024-12-17T09:11:53.434Z',
    updatedAt: '2024-12-17T09:11:54.436Z',
    number: 62990
  },
  {
    _id: '6761a69f750864001d3720c4',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa0941'
    ],
    status: 'done',
    name: 'Флюоресцентный люминесцентный био-марсианский бургер',
    createdAt: '2024-12-17T16:28:15.088Z',
    updatedAt: '2024-12-17T16:28:20.088Z',
    number: 63070
  },
  {
    _id: '6761aab0750864001d3720d4',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa0941'
    ],
    status: 'done',
    name: 'Флюоресцентный люминесцентный био-марсианский бургер',
    createdAt: '2024-12-17T16:45:36.280Z',
    updatedAt: '2024-12-17T16:45:37.209Z',
    number: 63072
  },
  {
    _id: '6761ad36750864001d3720e6',
    ingredients: [
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa0941'
    ],
    status: 'done',
    name: 'Краторный био-марсианский бургер',
    createdAt: '2024-12-17T16:56:22.033Z',
    updatedAt: '2024-12-17T16:56:22.925Z',
    number: 63074
  },
  {
    _id: '6761b7db750864001d3720ff',
    ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e'],
    status: 'done',
    name: 'Флюоресцентный люминесцентный бургер',
    createdAt: '2024-12-17T17:41:47.742Z',
    updatedAt: '2024-12-17T17:41:48.607Z',
    number: 63075
  }
];

const initialState = {
  orders: [] as Array<TOrder>,
  isLoading: true as boolean
};

describe('userOrdersSlice', () => {
  test('should handle getUserOrders.pending', () => {
    const action = { type: getUserOrders.pending.type };
    const state = userOrdersSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, isLoading: true });
  });
  test('should handle getUserOrders.rejected', () => {
    const action = {
      type: getUserOrders.rejected.type
    };
    const state = userOrdersSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, isLoading: false });
  });
  test('should handle getUserOrders.fulfilled', () => {
    const action = {
      type: getUserOrders.fulfilled.type,
      payload: mockOrders
    };
    const state = userOrdersSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      orders: mockOrders
    });
  });
});
