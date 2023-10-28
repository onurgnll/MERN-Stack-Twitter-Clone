
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const ip = import.meta.env.VITE_IP;
const initialState = {
  tweets: [],
  page: 1,
  hasMore: true,
  trends: [],

  retweets: []


}

export const getRetweets = createAsyncThunk('getRetweets', async (action) => {
  try {

    const config = "bearer " + localStorage.getItem("token")
    const res = await fetch(ip +"/tweet/getretweets/" + action, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': config
      }
    })
    const data = await res.json();

    return data
  } catch (error) {
    console.log(error);

    throw error;
  }
});
export const getTweets = createAsyncThunk('getTweets', async (_, { getState }) => {
  try {
    const state = getState(); // Get the current state
    const res = await fetch(
      ip +`/tweet/page/${state.tweet.page}`
    )
    const data = await res.json();

    return data
  } catch (error) {
    console.log(error);

    throw error;
  }
});

export const fetchTrends = createAsyncThunk('fetchTrends', async () => {
  try {
    const res = await fetch(
      ip +`/tweet/trends`
    )
    const data = await res.json();

    return data
  } catch (error) {
    console.log(error);

    throw error;
  }
});
export const tweetSlice = createSlice({
  name: 'tweet',
  initialState,
  reducers: {
    reset: (state) => {
      state.hasMore = true
      state.page = 1
      state.tweets = []
    }

  },//builder
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed

    builder.addCase(getTweets.fulfilled, (state, action) => {

      if (!action.payload.success) {
        state.hasMore = false
      } else {
        state.page += 1
        action.payload.tweets.map((element) => {
          state.tweets.push(element)
        })

      }



    });
    
    builder.addCase(getRetweets.fulfilled, (state, action) => {

      if (action.payload.success) {
        state.retweets = action.payload.retweets
      } 



    });
    builder.addCase(fetchTrends.fulfilled, (state, action) => {
      if (!action.payload.success) {
        console.log("");
      } else {
        state.trends = action.payload.trends
      }



    })
  },
})

// Action creators are generated for each case reducer function
export const {  reset } = tweetSlice.actions

export default tweetSlice.reducer