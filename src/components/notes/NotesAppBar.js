import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNote, startUploading } from '../../actions/task';



export const NotesAppBar = () => {

    const dispatch = useDispatch();
    const { active:note } = useSelector(state => state.task)

    const handleSave = () => {
        console.log(note);
        dispatch(
            startSaveNote( note )
        )
    }

    const handlePictureUpload = () => {
        document.querySelector('#fileSelector').click();
    }


    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if( file ){
            dispatch( startUploading( file ) )
        }

    }


    return (
        <div className="notes__appbar">
            <span>28 of Agost 2021</span>
            <input 
                type="file"
                name="file"
                id="fileSelector"
                style={{ display:'none' }}
                onChange={ handleFileChange }
            />
            <div>
                <button 
                    className="btn"
                    onClick={ handlePictureUpload }
                >
                    Picture
                </button>
                <button 
                    className="btn"
                    onClick={ handleSave }
                >
                    Save
                </button>
            </div>
        </div>
    )
}
