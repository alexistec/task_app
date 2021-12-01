import Swal from 'sweetalert2';
import { db } from "../firebase/firebaseConfig";
import { fileUpload } from '../helpers/fileUpload';
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";


export const startNewTask = () => {

    return async( dispatch, getState) => {

        const { uid } = getState().auth;

        const newTask = {
            title: '',
            body : '',
            date: new Date().getTime()
        };

        const docRef = await db.collection(`${ uid }/tasks/notes`).add( newTask );
        
        dispatch( activeNote( uid, newTask ));
        dispatch( addNewNote( uid, newTask ));
    }     
}


export const activeNote = (id, note) => ({
    type: types.taskActive,
    payload: {
        id,
        ...note
    }
})

export const addNewNote = ( id, note ) => ({
    type:types.taskAddNew,
    payload : {
        id,
        ...note
    }
})

export const startLoadingNotes = ( uid ) => {
    return async ( dispatch ) => {
        const notes = await loadNotes( uid );
        dispatch( setNotes(notes) );
    }
}


export const setNotes = ( notes ) => ({
    type:types.taskLoad,
    payload:notes
})

export const startSaveNote = ( note ) => {
    return async (dispatch, getState) => {

        const { uid } = getState().auth;

        if( !note.url ){
            delete note.url;
        }

        const noteToFirestore = {...note};
        delete noteToFirestore.id;

        await db.doc(`${ uid }/tasks/notes/${ note.id }`).update( noteToFirestore );

        dispatch( refreshNote(note.id, note) );

        Swal.fire('Saved',note.title);
    }
}

export const refreshNote = (id , note ) => ({
    type: types.taskUpdated,
    payload:{
        id, 
        note : {
            id,
            ...note
        }
    }
})

export const startUploading = ( file ) => {
    return async (dispatch, getState ) => {
        const { active:activeNote } = getState().task;
        

        Swal.fire({
            title:'Uploading....',
            text:'Please wait',
            allowOutsideClick:false,
            onBeforeOpen: () => {
                Swal.showLoading()
            }
        })

        const fileUrl = await fileUpload( file ); 
        activeNote.url = fileUrl;

        dispatch( startSaveNote( activeNote ) );

        Swal.close();
    }
}


export const startDeleting = (id) => {

    return async ( dispatch, getState ) => {
        const uid = getState().auth.uid;
        await db.doc(`${ uid }/tasks/notes/${ id }`).delete();

        dispatch( deleteNote(id) )
    }
}

export const deleteNote = (id) => ({
    type: types.taskDelete,
    payload:id
})

export const cleaningNotes = () => ({
    type: types.taskLogoutCleaning
})