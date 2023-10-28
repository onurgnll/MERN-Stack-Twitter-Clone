
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchTrends } from '../tweet/tweetSlice'

const initialState = {
  loading: false,
  sharedTweet: [],

}


const ip = import.meta.env.VITE_IP;
export const postTweet = createAsyncThunk('postTweet', async (action, { dispatch, getState }) => {
  try {
    const state = getState()
    const user = state.auth.user
    const config = "bearer " + localStorage.getItem("token")
    // let publicc = (herkes == "Herkes" ? true : false)
    const response = await fetch(ip + "/tweet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': config
      },
      body: JSON.stringify({
        tweetowner: user.name + " " + user.lastname,
        tweetownerid: user.username,
        tweetcontent: action.tweetContent,
        public: action.public
      }),
    })

    const result = await response.json();
    console.log(result);

    dispatch(fetchTrends());
    return result

    // dispatch(fetchTrends())
  } catch (error) {
    console.log(error);
  }

})




export const retweetTweet = createAsyncThunk('retweetTweet', async (action) => {
  try {
    console.log(action);
    const config = "bearer " + localStorage.getItem("token")
    // let publicc = (herkes == "Herkes" ? true : false)
    const response = await fetch(ip + "/tweet/retweet/" + action.id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': config
      },
      body: JSON.stringify({
        public: action.public || true
      }),
    })

    const result = await response.json();
    console.log(result);

    return result

  } catch (error) {
    console.log(error);
  }

})




export const tweetOperationsSlice = createSlice({
  name: 'tweetOperations',
  initialState,
  reducers: {
    // setLogged: (state) => {
    //   state.logged = true
    //   state.user = JSON.parse(localStorage.getItem("user"))
    // }

  },//builder
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed

    builder.addCase(postTweet.pending, (state) => {
      state.loading = true
    });
    builder.addCase(postTweet.fulfilled, (state, action) => {

      // if (result.success) {
      //   setSharedTweet([...sharedTweet, result.tweet]);

      // }
      state.sharedTweet.push(action.payload.tweet)
      state.loading = false

    });
    builder.addCase(retweetTweet.fulfilled, (state, action) => {

      // if (result.success) {
      //   setSharedTweet([...sharedTweet, result.tweet]);

      // }
      console.log(action);
      // state.sharedTweet.push(action.payload.tweet)
      state.loading = false

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
export const { setLogged, logout, setUser } = tweetOperationsSlice.actions

export default tweetOperationsSlice.reducer