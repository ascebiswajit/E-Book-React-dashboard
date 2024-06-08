import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface TokenStore {
  token: string;
  setToken: (data: string) => void;
}

const useTokenStore = create<TokenStore>()(
  devtools(
    persist((set) => ({
        token: "",
        setToken: (data) => set(() => ({ token: data })),
      }),{name:'token-Store'})
    
  )
);

export default useTokenStore;
