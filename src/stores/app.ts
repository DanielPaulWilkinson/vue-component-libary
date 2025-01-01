import { defineStore } from 'pinia'

export type AppState = {
  rating: number,
  taste: string,
  texture: string,
  notes: string,
  aroma: string,
  cost: number,
  coffeeType: string | null,
  termsAndConditions: boolean | null,
}

export const useAppStore = defineStore('useAppStore', {
  state: (): AppState => {
    return {
       rating: 0,
       cost: 0,
       taste: "",
       texture: "",
       aroma: "",
       notes: "",
       coffeeType: null,
       termsAndConditions: null,
    };
  },
});
