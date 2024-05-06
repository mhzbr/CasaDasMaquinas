import { defineStore } from 'pinia';

interface UserFilter {
  minWeight: number;
  maxWeight: number;
  minHeight: number;
  maxHeight: number;
  minPrice: number;
  maxPrice: number;
  minAge: number;
  maxAge: number;
  isOnline: boolean;
  genre: string;
}

export const useUserFilterStore = defineStore('userFilter', {
  state: (): {
    filter: UserFilter;
    orderBy: string;
    limit: number;
    page: number;
  } => ({
    filter: {
      minWeight: 40,
      maxWeight: 180,
      minHeight: 90,
      maxHeight: 200,
      minPrice: 50,
      maxPrice: 1000,
      minAge: 18,
      maxAge: 60,
      isOnline: false,
      genre: 'woman',
    },
    orderBy: 'default',
    limit: 15,
    page: 1
  }),

  actions: {
    /**
     * Checks and adjusts the upper limits of the filter options to prevent invalid values.
     */
    checkUpperLimits() {
      if (this.filter.maxAge >= 60) {
        this.filter.maxAge = 60;
      }
      if (this.filter.maxHeight >= 200) {
        this.filter.maxHeight = 200;
      }
      if (this.filter.maxPrice >= 5000) {
        this.filter.maxPrice = 5000;
      }
      if (this.filter.maxWeight >= 160) {
        this.filter.maxWeight = 160;
      }
    },

    /**
     * Updates the filter options with the provided values.
     * @param minWeight - Minimum weight
     * @param maxWeight - Maximum weight
     * @param minHeight - Minimum height
     * @param maxHeight - Maximum height
     * @param minPrice - Minimum price
     * @param maxPrice - Maximum price
     * @param minAge - Minimum age
     * @param maxAge - Maximum age
     */
    updateFilter(
      minWeight: number,
      maxWeight: number,
      minHeight: number,
      maxHeight: number,
      minPrice: number,
      maxPrice: number,
      minAge: number,
      maxAge: number
    ) {
      this.filter.minWeight = minWeight;
      this.filter.maxWeight = maxWeight;
      this.filter.minHeight = minHeight;
      this.filter.maxHeight = maxHeight;
      this.filter.minPrice = minPrice;
      this.filter.maxPrice = maxPrice;
      this.filter.minAge = minAge;
      this.filter.maxAge = maxAge;
      this.checkUpperLimits();
    },

    /**
     * Updates the order by option.
     * @param newOrderBy - New order by option ('default', 'rating', or 'online')
     */
    updateOrderBy(newOrderBy: string) {
      if (newOrderBy !== 'default' && newOrderBy !== 'rating' && newOrderBy !== 'online') {
        throw new Error('Invalid orderBy value');
      }
      if (newOrderBy === 'online') {
        this.filter.isOnline = true;
        this.orderBy = 'default';
      } else {
        this.filter.isOnline = false;
        this.orderBy = newOrderBy;
      }
    },

    /**
     * Updates the limit option.
     * @param newLimit - New limit value
     */
    updateLimit(newLimit: number) {
      this.limit = newLimit;
    },

    /**
     * Updates the page option.
     * @param newPage - New page value
     */
    updatePage(newPage: number) {
      this.page = newPage;
    },

    /**
     * Updates the genre option.
     * @param newGenre - New genre value ('woman', 'man', or 'trans')
     */
    updateGenre(newGenre: string) {
      if (newGenre !== "woman" && newGenre !== "man" && newGenre !== "trans") {
        throw new Error('Invalid genre value');
      }
      this.filter.genre = newGenre;
    }
  }
});

export type UserFilterStore = ReturnType<typeof useUserFilterStore>;