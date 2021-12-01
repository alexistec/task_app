import { types } from "../types/types";

const initialState = {
    task : [],
    active : null
}

export const taskReducer = ( state =initialState , action  ) => {
    switch ( action.type) {
        
        case types.taskActive :
            return {
                ...state,
                active : {
                    ...action.payload
                }
            }
        
        case types.taskAddNew :
            return{
                ...state,
                notes:[ action.payload, ...state.notes ]
            }
            
        case types.taskLoad :
            return {
                ...state,
                notes: [ ...action.payload ]
            }    
        
        case types.taskUpdated : 
            return {
                ...state,
                notes: state.notes.map(
                    note => note.id === action.payload.id
                        ? action.payload.note
                        : note
                )
            }    
        
        case types.taskDelete : 
            return{
                ...state,
                active: null,
                notes : state.notes.filter( note => note.id !== action.payload)
            } 
        
        case types.taskLogoutCleaning: 
            return{
                ...state,
                active: null,
                notes : []
            } 

        default:
            return state;
    }
}