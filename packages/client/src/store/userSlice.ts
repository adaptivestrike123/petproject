import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiAxios } from "../components/axios/apiAxios";
import { useAppSelector } from "./hook";

interface Post {
  title: string;
  text: string;
  id: number;
  authorId: number;
}

interface User {
  login: string;
  id: number;
  avatarUrl: string;
  posts: Post[];
  likes: Like[];
}
interface Like {
  id: number;
}
interface UserState {
  user: User | undefined;
}
interface Props {
  login: string;
  password?: string;
}

const initialState: UserState = {
  user: undefined,
};

export const fetchUser = createAsyncThunk<User, Props>(
  "user/fetchUser",
  async (auth) => {
    const { login, password } = auth;
    const { data } = await apiAxios.post("/auth/login", { login, password });
    if (data == "Неправильный логин или пароль") {
      return undefined;
    }
    return data;
  }
);
export const refresh = createAsyncThunk<User, Props>(
  "user/refresh",
  async (auth) => {
    const { login } = auth;
    const { data } = await apiAxios.post("/auth/refresh", { login });
    return data;
  }
);

export const registerUser = createAsyncThunk<User, Props>(
  "user/registerUser",
  async (register) => {
    const { login, password } = register;
    const { data } = await apiAxios.post("/auth/register", { login, password });
    if (data == "Пользователь уже существует") {
      return undefined;
    }
    return data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clear(state) {
      state.user = undefined;
    },
    updateAvatar(state, action) {
      state.user!.avatarUrl = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, () => {
        console.log("rejected");
      })
      .addCase(refresh.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(refresh.rejected, () => {
        console.log("rejected");
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, () => {
        console.log("rejected");
      });
  },
});
export const { clear, updateAvatar } = userSlice.actions;
export default userSlice.reducer;
