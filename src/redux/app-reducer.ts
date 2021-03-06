import { InferActionsTypes } from './redux-store';
import { getAuthUserData } from "./auth-reducer";

const INITIALIZED_SUCCESS = 'SN/APP/INITIALIZED_SUCCESS';

let initialState = {
    initialized: false,
};

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {

        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            };

        default:
            return state;
    }
}


export const actions = {
    initializedSuccess: () => ({ type: INITIALIZED_SUCCESS }),
}

export const initializeApp = () => (dispatch: any) => {
   let promise = dispatch(getAuthUserData());
   promise.then(() =>{
       dispatch(actions.initializedSuccess())
   });
}

export default appReducer;