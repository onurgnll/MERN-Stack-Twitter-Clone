import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../features/auth/authSlice'
import tweetSlice from '../features/tweet/tweetSlice'
import tweetOperationsSlice  from '../features/tweetOperations/tweetOperationsSlice'
import userSlice from '../features/user/userSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    tweet: tweetSlice,
    tweetOperations: tweetOperationsSlice,
    user: userSlice

  },
})