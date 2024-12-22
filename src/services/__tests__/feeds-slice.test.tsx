import { TOrder } from '@utils-types';
import { feedsSlice, getAllFeeds } from '../slices/feeds-slice';
const mockOrder = {
  success: true,
  total: 10,
  totalToday: 1,
  orders: [
    {
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный био-марсианский бургер',
      createdAt: '2024-12-19T22:02:53.949Z',
      updatedAt: '2024-12-19T22:02:54.635Z',
      number: 63508
    }
  ]
};
const initialState = {
  orders: [] as Array<TOrder>,
  total: 0 as number,
  totalToday: 0 as number,
  isLoading: true as boolean,
  error: undefined as string | undefined
};

describe('Initialisation feedsSlice test', () => {
  test('should handle initialisation', () => {
    const state = feedsSlice.reducer(initialState, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual(initialState);
  });
  test('should handle getAllFeeds.pending', () => {
    const action = { type: getAllFeeds.pending.type };
    const state = feedsSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: true,
      error: undefined
    });
  });

  test('should handle getAllFeeds.fulfilled', () => {
    const action = { type: getAllFeeds.fulfilled.type, payload: mockOrder };
    const state = feedsSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      orders: mockOrder.orders,
      total: mockOrder.total,
      totalToday: mockOrder.totalToday
    });
  });
  test('should handle getAllFeeds.rejected', () => {
    const action = {
      type: getAllFeeds.rejected.type,
      error: { message: 'Error' }
    };
    const state = feedsSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      orders: [],
      total: 0,
      totalToday: 0,
      error: 'Error'
    });
  });
});
