import {configureStore,combineReducers} from '@reduxjs/toolkit'
import userReducer from '../function/userSlice'
import {persistReducer,persistStore} from 'redux-persist';
import { version } from 'react';
import storage from 'redux-persist/lib/storage'
import themeReducer from '../function/themeSlice'





const rootReducer = combineReducers({
    user:userReducer,
    theme:themeReducer
});

const persistConfig ={
    key:'root',
    storage,
    version:1
}

const persistedReducer = persistReducer(persistConfig,rootReducer)

export const store = configureStore({
    reducer:persistedReducer,
    //prevent default middleware
    middleware:(getDefaultMiddleware) =>getDefaultMiddleware({serializableCheck:false})
})

export const persistor = persistStore(store)







// import {configureStore} from '@reduxjs/toolkit'
// import userReducer from '../function/userSlice'

// export const store = configureStore({
//     reducer:{
//        user: userReducer,
//     },
// })























































































































































//Persisting, in the context of web development and state management, refers to the act of preserving or saving data beyond the current session or page reload. It involves storing the application's data in a more permanent storage, such as a database or local storage, so that the data can be retrieved and reused even after the application is closed or the user navigates away.
// In a broader sense, "configuration" refers to the process of setting up or customizing the behavior of a system or component
//persistConfig is a configuration object passed to the redux-persist library. It tells the library how and where to persist your Redux state. The key is a unique identifier, storage is the storage engine, and version is an optional version number.