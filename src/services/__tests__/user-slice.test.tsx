import {
  login,
  logout,
  apiGetUser,
  userSlice,
  updateUser,
  register
} from '../slices/user-slice';

const initialState = {
  isAuthChecked: false,
  user: {
    email: '',
    name: ''
  },
  error: ''
};

const token = {
  refreshToken: 'test-refresh-token',
  accessToken: 'test-access-token'
};

const userData = {
  email: 'test@example.com',
  name: 'Test-User'
};

const loginData = {
  email: 'test@example.com',
  password: 'password123'
};

const registerData = {
  email: 'test@example.com',
  name: 'Test-User',
  password: 'password123'
};

describe('userSlice', () => {
  describe('register', () => {
    it('should clear error when pending', () => {
      const state = userSlice.reducer(
        initialState,
        register.pending('pending', registerData)
      );
      expect(state.error).toBe('');
    });

    it('should set auth state and user data when fulfilled', () => {
      const state = userSlice.reducer(
        initialState,
        register.fulfilled(
          { user: userData, success: true, ...token },
          'fulfilled',
          registerData
        )
      );
      expect(state.isAuthChecked).toBe(true);
      expect(state.error).toBe('');
      expect(state.user).toEqual(userData);
    });

    it('should set error message when rejected', () => {
      const errorMessage = 'Registration failed';
      const state = userSlice.reducer(
        initialState,
        register.rejected(new Error(errorMessage), 'rejected', registerData)
      );
      expect(state.error).toEqual(errorMessage);
    });
  });

  describe('login', () => {
    it('should clear error when pending', () => {
      const state = userSlice.reducer(
        initialState,
        login.pending('pending', loginData)
      );
      expect(state.error).toBe('');
    });

    it('should set auth state and user data when fulfilled', () => {
      const state = userSlice.reducer(
        initialState,
        login.fulfilled(
          { user: userData, success: true, ...token },
          'fulfilled',
          loginData
        )
      );
      expect(state.isAuthChecked).toBe(true);
      expect(state.error).toBe('');
      expect(state.user).toEqual(userData);
    });

    it('should set error message when rejected', () => {
      const errorMessage = 'Login failed';
      const state = userSlice.reducer(
        initialState,
        login.rejected(new Error(errorMessage), 'rejected', loginData)
      );
      expect(state.error).toEqual(errorMessage);
    });
  });

  describe('logout', () => {
    it('should reset auth state on successful logout', () => {
      const state = userSlice.reducer(initialState, {
        type: logout.fulfilled.type
      });
      expect(state.isAuthChecked).toBe(false);
      expect(state.user).toEqual(initialState.user);
    });
  });

  describe('apiGetUser', () => {
    it('should set auth state and user data when fulfilled', () => {
      const state = userSlice.reducer(
        initialState,
        apiGetUser.fulfilled(
          { user: userData, success: true, ...token },
          'fulfilled'
        )
      );
      expect(state.isAuthChecked).toBe(true);
      expect(state.error).toBe('');
      expect(state.user).toEqual(userData);
    });

    it('should set error message when rejected', () => {
      const errorMessage = 'Failed to fetch user data';
      const state = userSlice.reducer(
        initialState,
        apiGetUser.rejected(new Error(errorMessage), 'rejected')
      );
      expect(state.error).toEqual(errorMessage);
    });
  });

  describe('updateUser', () => {
    it('should clear error when pending', () => {
      const state = userSlice.reducer(
        initialState,
        updateUser.pending('pending', registerData)
      );
      expect(state.error).toBe('');
    });

    it('should set auth state and updated user data when fulfilled', () => {
      const state = userSlice.reducer(
        initialState,
        updateUser.fulfilled(
          { user: userData, success: true, ...token },
          'fulfilled',
          registerData
        )
      );
      expect(state.isAuthChecked).toBe(true);
      expect(state.error).toBe('');
      expect(state.user).toEqual(userData);
    });

    it('should set error message when rejected', () => {
      const errorMessage = 'Failed to update user';
      const state = userSlice.reducer(
        initialState,
        updateUser.rejected(new Error(errorMessage), 'rejected', registerData)
      );
      expect(state.error).toEqual(errorMessage);
    });
  });
});
