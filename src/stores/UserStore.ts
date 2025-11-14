import type { User } from "@/utils/types";
import { defineStore } from "pinia";


export const useUserStore = defineStore("user", {
  state: () => ({
    user: null as User | null,
  }),
  actions: {
    setUser(userData:User) {
      this.user = userData;
    },
    clearUser() {
      this.user = null;
    },
  },
}); 