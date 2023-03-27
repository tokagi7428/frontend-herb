const initialState = {
    farm: [],
    loading: true,
    error: "",
}

const farmReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_REQUEST":
            // console.log("FETCH_REQUEST")
            return {
                ...state,
                loading: true,
            };
        case "FETCH_SUCCESS":
            // console.log("action : ", action.payload)
            return {
                ...state,
                loading: false,
                farm: action.payload
            }
        case "FETCH_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export default farmReducer;