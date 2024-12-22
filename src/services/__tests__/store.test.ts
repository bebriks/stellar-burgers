import store from '../store';
import { ingredientsSlice } from '../slices/ingredients-slice';
import { constructorSlice } from '../slices/constructor-slice';
import { newOrderSlice } from '../slices/new-order-slice';
import { userSlice } from '../slices/user-slice';
import { feedsSlice } from '../slices/feeds-slice';
import { userOrdersSlice } from '../slices/user-all-orders-slice';

describe('Initial state of store', () => {
  test('Test initial state of store', () => {
    const initialState = store.getState();

    expect(initialState).toEqual({
      ingredients: {
        ingredients: [],
        loading: false,
        error: null
      },
      feeds: {
        orders: [],
        total: 0,
        totalToday: 0,
        isLoading: true,
        error: undefined
      },
      constructorIngredient: {
        bun: null,
        ingredients: []
      },
      newOrder: {
        orderRequest: false,
        orderModalData: null,
        error: undefined
      },
      user: {
        isAuthChecked: false,
        user: {
          email: '',
          name: ''
        },
        error: ''
      },
      orders: {
        orders: [],
        isLoading: true
      }
    });
  });

  test('Test initial state of ingredientsReducer', () => {
    const initialState = ingredientsSlice.reducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });
    expect(initialState).toEqual({
      ingredients: [],
      loading: false,
      error: null
    });
  });

  test('Test initial state of feedsReducer', () => {
    const initialState = feedsSlice.reducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });
    expect(initialState).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      isLoading: true,
      error: undefined
    });
  });

  test('Test initial state of constructorReducer', () => {
    const initialState = constructorSlice.reducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });
    expect(initialState).toEqual({
      bun: null,
      ingredients: []
    });
  });

  test('Test initial state of newOrderReducer', () => {
    const initialState = newOrderSlice.reducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });
    expect(initialState).toEqual({
      orderRequest: false,
      orderModalData: null,
      error: undefined
    });
  });

  test('Test initial state of userReducer', () => {
    const initialState = userSlice.reducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });
    expect(initialState).toEqual({
      isAuthChecked: false,
      user: {
        email: '',
        name: ''
      },
      error: ''
    });
  });

  test('Test initial state of userOrdersReducer', () => {
    const initialState = userOrdersSlice.reducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });
    expect(initialState).toEqual({
      orders: [],
      isLoading: true
    });
  });
});
