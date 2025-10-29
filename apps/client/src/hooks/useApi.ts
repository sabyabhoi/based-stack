import { create } from 'zustand'
import { client } from '../lib/api'

interface HelloResponse {
  message: string
}

interface SessionResponse {
  session: { user: { id: string; email: string } }
  user: { id: string; email: string }
}

interface ApiState {
  helloMessage: string | null
  session: SessionResponse | null
  isLoading: boolean
  error: string | null

  fetchHello: () => Promise<void>
  fetchSession: () => Promise<void>
}

export const useApi = create<ApiState>((set) => ({
  helloMessage: null,
  session: null,
  isLoading: false,
  error: null,

  fetchHello: async () => {
    set({ isLoading: true, error: null })
    try {
      const res = await (client as any)['api/hello'].$get()
      const data: HelloResponse = await res.json()
      set({ helloMessage: data.message, isLoading: false })
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Unknown error', isLoading: false })
    }
  },

  fetchSession: async () => {
    set({ isLoading: true, error: null })
    try {
      const res = await (client as any)['api/session'].$get()
      const data: SessionResponse = await res.json()
      set({ session: data, isLoading: false })
    } catch (error) {
      if (error instanceof Error && error.message.includes('401')) {
        set({ session: null, isLoading: false })
      } else {
        set({ error: error instanceof Error ? error.message : 'Unknown error', isLoading: false })
      }
    }
  },
}))
