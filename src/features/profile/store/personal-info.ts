import { create } from 'zustand'

type PersonalInfoState = {
   isEditing: boolean
   setEditing: (val: boolean) => void
   isLoading: boolean
   setLoading: (val: boolean) => void
}

export const usePersonalInfoStore = create<PersonalInfoState>((set) => ({
   isEditing: false,
   setEditing: (val) => {
      set({ isEditing: val })
   },
   isLoading: false,
   setLoading: (val) => {
      set({ isLoading: val })
   }
}))
