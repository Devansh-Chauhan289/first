import {legacy_createStore,applyMiddleware} from "redux"
import { DataReducers } from "./reducers"
import {thunk} from "redux-thunk"

export let store = legacy_createStore(DataReducers,applyMiddleware(thunk))