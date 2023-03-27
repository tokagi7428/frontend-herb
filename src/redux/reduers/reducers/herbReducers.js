const initialState = {
    herb: [],
    loading: true,
    error: "",
}

const herbReducers = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "FETCH_SUCCESS":
            return {
                ...state,
                loading: false,
                herbs: action.payload
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

export default herbReducers;