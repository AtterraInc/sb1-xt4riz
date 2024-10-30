const STORAGE_KEY = 'power_dialer_state';

export const StorageService = {
  saveState: (state: any) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem(STORAGE_KEY, serializedState);
    } catch (error) {
      console.error('Failed to save state:', error);
    }
  },

  loadState: () => {
    try {
      const serializedState = localStorage.getItem(STORAGE_KEY);
      return serializedState ? JSON.parse(serializedState) : undefined;
    } catch (error) {
      console.error('Failed to load state:', error);
      return undefined;
    }
  }
};