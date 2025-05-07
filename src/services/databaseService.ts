
import { toast } from "sonner";

// Mock database service

// In-memory storage for demo purposes
const storage: Record<string, any[]> = {
  studyBuddies: [],
  resources: [],
  events: [],
  messages: [],
  alumni: [],
  users: []
};

// Generic functions to interact with the "database"
export const getItems = <T>(collection: string): Promise<T[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve((storage[collection] || []) as T[]);
    }, 300); // Simulate network delay
  });
};

export const getItemById = <T>(collection: string, id: string): Promise<T | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const items = storage[collection] || [];
      const item = items.find(item => item.id === id);
      resolve(item as T);
    }, 300);
  });
};

export const addItem = <T extends { id?: string }>(collection: string, item: T): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Create a copy with a new ID if none provided
      const newItem = { 
        ...item, 
        id: item.id || `${collection}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}` 
      };
      
      if (!storage[collection]) {
        storage[collection] = [];
      }
      
      storage[collection].push(newItem);
      toast.success(`${collection} item added`);
      resolve(newItem as T);
    }, 500);
  });
};

export const updateItem = <T extends { id: string }>(collection: string, item: T): Promise<T> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!storage[collection]) {
        storage[collection] = [];
      }
      
      const index = storage[collection].findIndex(i => i.id === item.id);
      
      if (index !== -1) {
        storage[collection][index] = { ...item };
        toast.success(`${collection} item updated`);
        resolve(item);
      } else {
        toast.error(`Item not found in ${collection}`);
        reject(new Error(`Item with ID ${item.id} not found in ${collection}`));
      }
    }, 500);
  });
};

export const deleteItem = (collection: string, id: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!storage[collection]) {
        toast.error(`Collection ${collection} doesn't exist`);
        reject(new Error(`Collection ${collection} doesn't exist`));
        return;
      }
      
      const initialLength = storage[collection].length;
      storage[collection] = storage[collection].filter(item => item.id !== id);
      
      if (storage[collection].length < initialLength) {
        toast.success(`Item removed from ${collection}`);
        resolve(true);
      } else {
        toast.error(`Item not found in ${collection}`);
        reject(new Error(`Item with ID ${id} not found in ${collection}`));
      }
    }, 500);
  });
};

// Query helper functions
export const queryItems = <T>(
  collection: string, 
  filters: Record<string, any>
): Promise<T[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const items = storage[collection] || [];
      
      const filtered = items.filter(item => {
        return Object.entries(filters).every(([key, value]) => {
          // Handle different filter operations
          if (typeof value === 'object' && value !== null) {
            if (value.$contains && Array.isArray(item[key])) {
              return item[key].includes(value.$contains);
            }
            if (value.$gt !== undefined) {
              return item[key] > value.$gt;
            }
            if (value.$lt !== undefined) {
              return item[key] < value.$lt;
            }
            if (value.$in && Array.isArray(value.$in)) {
              return value.$in.includes(item[key]);
            }
          }
          
          // Default exact match
          return item[key] === value;
        });
      });
      
      resolve(filtered as T[]);
    }, 300);
  });
};

// Helper to initialize with some data
export const seedDatabase = (
  collections: Record<string, any[]>
): Promise<void> => {
  return new Promise((resolve) => {
    Object.entries(collections).forEach(([collection, items]) => {
      storage[collection] = [...items];
    });
    resolve();
  });
};
