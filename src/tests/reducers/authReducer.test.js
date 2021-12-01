import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";


describe('Test in authReducer',() => {

    test('I should login',() => {
        
        const initState = {};

        const action = {
            type: types.login,
            payload : {
                uid:'abc',
                displayName:'Alexis'
            }
        }

        const state = authReducer( initState, action );

        expect( state ).toEqual({
            uid:'abc',
            name: 'Alexis'
        })

    })

    test('I should logout', () => {
        
        const initialState = {
            uid:'abc',
            name:'Alexis'
        };

        const action = {
            type: types.logout,
            
        }

        const state = authReducer( initialState, action );

        expect( state ).toEqual({});

    })

    test('unknown action', () => {
        
        const initialState = {
            uid:'abc',
            name:'Alexis'
        };

        const action = {
            type: 'assadasdds',
            
        }

        const state = authReducer( initialState, action );

        expect( state ).toEqual(initialState)
       

    })
    

})