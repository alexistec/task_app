import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startNewTask, startUploading } from '../../actions/task';
import { types } from '../../types/types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);


const store = mockStore({
    auth:{
        uid:'TESTING'
    }
})
 


describe('Test in file startNewTask',() => {

    test('should create new note', async () => {
        
        await store.dispatch( startNewTask() );

        const actions = store.getActions(); 

        expect( actions[0] ).toEqual({
            type:types.taskActive,
            payload: {
                id: expect.any(String),
                title:'',
                body:'',
                date: expect.any(Number)
            }
        });

        expect( actions[1] ).toEqual({
            types:types.taskAddNew,
            payload: {
                id: expect.any(String),
                title:'',
                body:'',
                date: expect.any(Number)
            }
        })


    })

    test('should update the note url startUploading',()=> {
       /* const file = new File([],'foto.jpg');
        await store.dispatch( startUploading() );*/
    })

    
})