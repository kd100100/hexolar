const initialState = {
    user: null,
    feaData: null,
    future: null,
    past: null,
    efficiencyGraph: null,
    efficiencyBox: null,
    lat: null,
    lng: null,
};

const reducer = (state = initialState, action) => {
    console.log(action);
    switch(action.type){
        
        case "SET_USER":
            return{ 
                ...state,
                user: action.user
            }
            
        case 'SET_FEA_DATA':
            return{  
                ...state,
                feaData: action.data,
            };

        case 'SET_FUTURE_DATA':
            return{
                ...state,
                future: action.data,
            };

        case 'SET_PAST_DATA':
            return{
                ...state,
                past: action.data,
            };
        
        case 'SET_EFFICIENCY_GRAPH':
            return{
                ...state,
                efficiencyGraph: action.data,
            };

        case 'SET_EFFICIENCY_BOX':
            return{
                ...state,
                efficiencyBox: action.data,
            };

        case 'SET_LAT':
            return{
                ...state,
                lat: action.data,
            };

        case 'SET_LNG':
            return{
                ...state,
                lng: action.data,
            };
                        
        default:
            return state;
    }
}

export default reducer;