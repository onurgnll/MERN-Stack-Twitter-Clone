
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  sharedTweet: [],
  notifications: [],
  notificationAmount: 0,
  followers: [],
  followersLoading: false,
  followedLoading: false,
  followed: [],
  profileUser: {}

}

const ip = import.meta.env.VITE_IP;
export const getFolloweds = createAsyncThunk('getFolloweds', async (action) => {
  try {
    

    const response = await fetch(ip + "/user/followed/" + action, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })

    const result = await response.json();
    return result

    // dispatch(fetchTrends())
  } catch (error) {
    console.log(error);
  }

})
export const getUserProfile = createAsyncThunk('getUserProfile', async (action) => {
  try {

    const response = await fetch(ip + "/user/details/"+ action, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })

    const result = await response.json();
    console.log(result);
    return result
  } catch (error) {
    console.log(error);
  }

})

export const getFollowers = createAsyncThunk('getFollowers', async (action) => {
  try {

    const response = await fetch(ip + "/user/followers/"+ action, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })

    const result = await response.json();
    return result

  } catch (error) {
    console.log(error);
  }

})

export const getNotifications = createAsyncThunk('getNotifications', async () => {
  try {
    

    const config = "bearer " + localStorage.getItem("token")
    const response = await fetch(ip + "/user/ownNotifications/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': config
      }
    })

    const result = await response.json();
    return result

    // dispatch(fetchTrends())
  } catch (error) {
    console.log(error);
  }

})


export const setSeenAllNotifs = createAsyncThunk('setSeenAllNotifs', async () => {
  try {
    

    const config = "bearer " + localStorage.getItem("token")
    const response = await fetch(ip + "/user/setSeenAllNotifications/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': config
      }
    })

    const result = await response.json();
    return result

  } catch (error) {
    console.log(error);
  }

})





export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // setLogged: (state) => {
    //   state.logged = true
    //   state.user = JSON.parse(localStorage.getItem("user"))
    // }

  },//builder
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed

    builder.addCase(getNotifications.pending, (state) => {
      state.loading = true
    });
    builder.addCase(getFollowers.pending, (state) => {
      state.followersLoading = true
    });
    builder.addCase(getFolloweds.pending, (state) => {
      state.followedLoading = true
    });
    builder.addCase(getNotifications.fulfilled, (state, action) => {
      state.notifications = action.payload?.notifications

      state.notificationAmount = action.payload?.notifications?.length

    });
    builder.addCase(setSeenAllNotifs.fulfilled, (state) => {
      state.notifications = []
      state.notificationAmount = 0

    });
    builder.addCase(getFollowers.fulfilled, (state,action) => {
      state.followers = action.payload?.followers

      state.followersLoading = false

    });
    builder.addCase(getUserProfile.fulfilled, (state,action) => {
      state.profileUser = action.payload?.user

    });
    builder.addCase(getFolloweds.fulfilled, (state,action) => {
      state.followed = action.payload?.followed

      state.followedLoading = false

    });

    // builder.addCase(fetchTrends.fulfilled, (state, action) => {
    //   if (!action.payload.success) {
    //     console.log("");
    //   } else {
    //     state.trends = action.payload.trends
    //     console.log(state.trends);
    //   }



    // })
  },
})

// Action creators are generated for each case reducer function
export const { setLogged, logout, setUser } = userSlice.actions

export default userSlice.reducer