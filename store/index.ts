import {create} from 'zustand'

const initialState = {
    
}
export const useStore = create(set => ({
    ...initialState,
    initUserInfo:(user:any)=>set((state:any)=>({...state,user}))
  }))