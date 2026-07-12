import { createSlice } from '@reduxjs/toolkit'

const userDataSlice = createSlice({
  name: 'userData',
  initialState: {
    user: null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload
    }
  }
})

export const { setUser } = userDataSlice.actions
export default userDataSlice.reducer