import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../modules/auth/authSlice';

// Future imports for other modules:
// import managerReducer from '../modules/manager/managerSlice';
// import pickerReducer from '../modules/picker/pickerSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // manager: managerReducer, // Uncomment when created
    // picker: pickerReducer,   // Uncomment when created
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Optional: Avoids warnings if non-serializable data is passed
    }),
  devTools: import.meta.env.MODE !== 'production', // Enable Redux DevTools only in Dev
});

export default store;