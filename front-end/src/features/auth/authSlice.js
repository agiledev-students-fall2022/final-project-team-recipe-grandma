import { createSlice } from '@reduxjs/toolkit';

type UserContext = $ReadOnly<{|
  _id: string,
  name: string,
  email: string,
  token: string
|}>;

type AuthActionContext = {|
  payload: {|
    user: UserContext
  |}
|};

type State = {|
  +user: {|
    +_id: string,
    +name: string,
    +email: string,
    +token: string
  |}
|};

const LoginReduction = (state: State, action: AuthActionContext) => {
  state.user = action.payload;
};

const LogoutReduction = (state: State) => {
  state.user = null;
};

//  Professor permitted Redux
export const userSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
  },
  reducers: {
    signIn: LoginReduction,
    signOut: LogoutReduction,
  },
});

export const { signIn, signOut } = userSlice.actions;
export const selectUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.user?.token;
export default userSlice.reducer;
