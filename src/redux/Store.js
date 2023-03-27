import { sessionReducer, sessionService } from 'redux-react-session'
import { applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
// import fetchReducer from './reduers/fetchReducer'
import { configureStore } from '@reduxjs/toolkit'
import fetchHerb from './reduers/fetchs/fetchHerb'
import fetchFarm from './reduers/fetchs/fetchFarm'
import farmReducers from './reduers/reducers/farmReducers'
import herbReducers from './reduers/reducers/herbReducers'

const middleware = [thunk]
const Store = configureStore(
    {
        reducer: {
            session: sessionReducer,
            herb: fetchHerb,
            farm: fetchFarm,
            farmReducers,
            herbReducers
        },
        devTools: true
    },
    compose(applyMiddleware(...middleware))
)

sessionService.initSessionService(Store)
export default Store;