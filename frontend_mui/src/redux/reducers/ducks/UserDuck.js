import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  registered: false,
};

export const register = createAsyncThunk(
  "user/register/",
  async ({ first_name, last_name, email, password }, thunkAPI) => {
    const body = JSON.stringify({
      first_name,
      last_name,
      email,
      password,
    });
    try {
      const res = await fetch("/auth/register/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body,
      });
      const data = await res.json();
      if (res.status === 201) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const login = createAsyncThunk(
  "user/login/",
  async ({ email, password }, thunkAPI) => {
    const body = JSON.stringify({
      email,
      password,
    });
    try {
      const res = await fetch("/auth/login/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
        body,
      });
      const data = await res.json();
      if (res.status === 200) {
        thunkAPI.dispatch(getUser());
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const checkAuth = createAsyncThunk(
  "user/verify/",
  async (_, thunkAPI) => {
    const body = JSON.stringify({ token: Cookies.get("access_token") });
    try {
      const res = await fetch("/auth/users/verify/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body,
      });
      const data = await res.json();
      if (res.status === 200) {
        thunkAPI.dispatch(getUser());
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const getUser = createAsyncThunk("auth/me/", async (_, thunkAPI) => {
  try {
    const res = await fetch("/auth/me/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("access_token")}`,
      },
    });
    const data = await res.json();
    if (res.status === 200) {
      return data;
    } else {
      return thunkAPI.rejectWithValue(data);
    }
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const logout = createAsyncThunk("user/logout/", async (_, thunkAPI) => {
  const refresh_token = Cookies.get("refresh_token");
  const body = JSON.stringify({
    refresh_token,
  });
  try {
    const res = await fetch("/auth/logout/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
    const data = await res.json();
    if (res.status === 200) {
      return data;
    } else {
      return thunkAPI.rejectWithValue(data);
    }
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetRegistered: (state) => {
      state.registered = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        state.registered = true;
      })
      .addCase(register.rejected, (state) => {
        state.loading = false;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuth.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.loading = false;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
      })
      .addCase(logout.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { resetRegistered } = userSlice.actions;
export default userSlice.reducer;
