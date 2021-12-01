import { types } from "../../types/types"


describe('Test with our types',() => {


    test('must contain the types', () => {
        expect( types ).toEqual({
            login:'[Auth] Login',
            logout: '[Auth] Logout',

            uiSetError: '[UI] Set Error',
            uiRemoveError: '[UI] Remove Error',

            uiStartLoading: '[UI] Start loading',
            uiFinishLoading: '[UI] Finish loading',

            taskAddNew  : '[Task] New task',
            taskActive  : '[Task] Set active task',
            taskLoad    : '[Task] Set Load task',
            taskUpdated : '[Task] Updated task',
            taskFileUrl : '[Task] Updated iamge url',
            taskDelete  : '[Task] Delete task',
            taskLogoutCleaning :  '[Task] Logout Cleaning',
        })
    })
    

})