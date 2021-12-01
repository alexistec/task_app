import React from 'react';
import { useSelector } from 'react-redux';
import { NoteScreen } from '../notes/NoteScreen';
import { NothingSeleced } from './NothingSeleced';
import { Sidebar } from './Sidebar'

export const TaskScreen = () => {

    const { active } = useSelector(state => state.task)

    return (
        <div className="task__main-content">
            <Sidebar/>
            <main>
                {
                    ( active )
                    ? (<NoteScreen/>)
                    : (<NothingSeleced/>)
                }
            </main>
        </div>
    )
}
