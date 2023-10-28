import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  logged: false,
  user: {},
  authLoading: false
}


const ip = import.meta.env.VITE_IP;
export const loginUser = createAsyncThunk('loginUser', async (action) => {
    
    const body = action

    try {
      const response = await fetch(ip + "/auth/login", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: body.email,
          password: body.sifre
        }),
      });
  
      const result = await response.json();
      return result
    } catch (error) {
      console.error("Error:", error);
    }
  }



)
export const getUserInfo = createAsyncThunk('getUserInfo', async () => {
    
    const config = "bearer " + localStorage.getItem("token")

    try {
      const response = await fetch(ip + "/auth/getUserInfo", {
        method: "GET", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          'Authorization': config
        }
      });
  
      const result = await response.json();
      return result
    } catch (error) {
      console.error("Error:", error);
    }
  }



)
export const registerUser = createAsyncThunk('registerUser', async (action) => {
    
    const body = action

    try {
      const response = await fetch(ip + "/auth/register", {
          method: "POST", // or 'PUT'
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              name: body.ad,
              lastname: body.soyad,
              email: body.email,
              password: body.sifre
          }),
      })
  
      const result = await response.json();
      return result
    } catch (error) {
      console.error("Error:", error);
    }
  }



)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token")
      state.logged = false
    },
    setUser: (state,action) => {
      state.user = action.payload
    }

  },//builder
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    
    builder.addCase(loginUser.pending, (state) => {
      state.authLoading = true

    })
    builder.addCase(registerUser.pending, (state) => {
      state.authLoading = true

    })
    builder.addCase(getUserInfo.pending, (state) => {
      state.authLoading = true

    })

    builder.addCase(loginUser.fulfilled, (state, action) => {
      if(action.payload.success){
        state.authLoading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.logged = true
        localStorage.setItem("token", state.token)
      }
      state.authLoading=false

    })
    builder.addCase(registerUser.fulfilled, (state, action) => {
      if(action.payload.success){
        state.authLoading=false
        state.user = action.payload.user
        state.token = action.payload.token
        state.logged = true
        localStorage.setItem("token", state.token)
      }

      state.authLoading=false
    })
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      if(action.payload.success){
        state.authLoading=false
        state.user = action.payload.user
        state.logged = true
      }else{
        localStorage.clear()
        state.authLoading=false
      }
    })
  },
})

// Action creators are generated for each case reducer function
export const { logout, setUser } = authSlice.actions

export default authSlice.reducer