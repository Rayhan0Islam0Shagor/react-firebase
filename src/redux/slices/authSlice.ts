import { forgetPasswordApi, signOutApi } from './../actions/authActions';
import {
  goggleApi,
  facebookApi,
  loginApi,
  registerApi,
} from 'redux/actions/authActions';
import { IRegister, ILogin, IAuth } from 'types/index.d';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const authRegister = createAsyncThunk(
  'auth/register',
  async (user: IRegister) => {
    return await registerApi(user);
  }
);

export const authLogin = createAsyncThunk(
  'auth/login',
  async (user: ILogin) => {
    return await loginApi(user);
  }
);

export const authGoggleLogin = createAsyncThunk('auth/goggle', async () => {
  return await goggleApi();
});

export const authFacebookLogin = createAsyncThunk('auth/facebook', async () => {
  return await facebookApi();
});

export const authForgetPassword = createAsyncThunk(
  'auth/forget_password',
  async (email: string) => {
    return await forgetPasswordApi(email);
  }
);

export const authLogout = createAsyncThunk('auth/logout', async () => {
  return await signOutApi();
});

export interface AuthState {
  currentUser?: IAuth;
  loading: boolean;
}

const initialState: AuthState = {
  currentUser: undefined,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(authRegister.pending, (state) => {
      //   state.loading = true;
      // })
      // .addCase(authRegister.fulfilled, (state) => {
      //   state.loading = false;
      // })

      // // Login
      // .addCase(authLogin.pending, (state) => {
      //   state.loading = true;
      // })
      // .addCase(authLogin.fulfilled, (state) => {
      //   state.loading = false;
      // })

      // // goggle login
      // .addCase(authGoggleLogin.pending, (state) => {
      //   state.loading = true;
      // })
      // .addCase(authGoggleLogin.fulfilled, (state) => {
      //   state.loading = false;
      // })

      // // Facebook login
      // .addCase(authFacebookLogin.pending, (state) => {
      //   state.loading = true;
      // })
      // .addCase(authFacebookLogin.fulfilled, (state) => {
      //   state.loading = false;
      // })

      // // Forget password
      // .addCase(authForgetPassword.pending, (state) => {
      //   state.loading = true;
      // })
      // .addCase(authForgetPassword.fulfilled, (state) => {
      //   state.loading = false;
      // })

      // // sign out
      // .addCase(authLogout.pending, (state) => {
      //   state.loading = true;
      // })
      // .addCase(authLogout.fulfilled, (state) => {
      //   state.loading = false;
      // })
      .addMatcher(
        ({ type }) => type.startsWith('auth') && type.endsWith('/pending'),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        ({ type }) => type.startsWith('auth') && type.endsWith('/fulfilled'),
        (state) => {
          state.loading = false;
        }
      );
  },
});

// Action creators are generated for each case reducer function
export const { addUser } = authSlice.actions;

export default authSlice.reducer;
