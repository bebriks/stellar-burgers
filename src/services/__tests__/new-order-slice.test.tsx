import { newOrderSlice, newOrder } from '../slices/new-order-slice';

const mockOrder = {
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
};

const initialState = {
  orderModalData: null,
  orderRequest: false,
  error: undefined
};

describe('newOrderSlice testing', () => {
  it('should set orderRequest to true when pending', () => {
    const state = newOrderSlice.reducer(
      initialState,
      newOrder.pending('pending', [])
    );

    expect(state.orderRequest).toBe(true);
  });

  it('should set modalData to the order and clear error when fulfilled', () => {
    const state = newOrderSlice.reducer(
      initialState,
      newOrder.fulfilled(
        { order: mockOrder, success: true, name: '' },
        'fulfilled',
        []
      )
    );

    expect(state.orderModalData).toBe(mockOrder);
    expect(state.error).toBe(undefined);
  });

  it('should set error message when rejected', () => {
    const errorMessage = 'error';
    const state = newOrderSlice.reducer(
      initialState,
      newOrder.rejected(new Error(errorMessage), 'rejected', [])
    );

    expect(state.error).toEqual(errorMessage);
  });
});
