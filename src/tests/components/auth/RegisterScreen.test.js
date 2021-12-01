import React from 'react';
import { mount } from "enzyme";
import { Provider } from 'react-redux';
import { MemoryRouter } from "react-router-dom";

import configureStore from 'redux-mock-store';
import thunk  from 'redux-thunk';
import { RegisterScreen } from "../../../components/auth/RegisterScreen"
import '@testing-library/jest-dom';
import { types } from '../../../types/types';
/*jest.mock('../../../actions/auth', () => ({
    startGoogleLogin: jest.fn(),
    startLoginEmailPassword: jest.fn()
}))*/


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {},
    ui:{
        loading:false,
        msgError: null
    }
};

let store = mockStore(initState);
//store.dispatch = jest.fn();





const wrapper = mount(
    <Provider store={ store }>
        <MemoryRouter>
            <RegisterScreen/>
        </MemoryRouter>
    </Provider>
);

describe('Test in component <RegisterScreen/>', () => {
    
    test('should render correctly', () => {
       
        expect( wrapper ).toMatchSnapshot();
    })

    test('should run the dispatch', () => {
        const emailField = wrapper.find('input[name="email"]');
        
        emailField.simulate('change',{
            target: {
                value:'',
                name:'email'
            }
        });


        wrapper.find('form').simulate('submit',{
            preventDefault(){}
        })


        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.uiSetError,
            payload:'Email is not valid'
        })


    })
    

    test('should show the alert box with the error message', () => {
        
        const initState = {
            auth: {},
            ui:{
                loading:false,
                msgError:'Email is not correct'
            }
        };

        const store = mockStore(initState);

        const wrapper = mount(
            <Provider store={ store }>
                <MemoryRouter>
                    <RegisterScreen/>
                </MemoryRouter>
            </Provider>
        )

        expect( wrapper.find('.auth__alert-error').exists() ).toBe(true)
        expect( wrapper.find('.auth__alert-error').text().trim()).toBe( initState.ui.msgError)    
    })
    

    
})
