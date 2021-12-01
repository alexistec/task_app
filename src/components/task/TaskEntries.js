import React from 'react'
import { useSelector } from 'react-redux';
import { TaskEntry } from './TaskEntry';

export const TaskEntries = () => {

    const { notes } = useSelector( state => state.task );
    
    

    return (
        <div className="journal__entries">
            
            {
                notes.map( note => (
                    <TaskEntry 
                        key={ note.id }
                        { ...note }
                    />
                ))
            }

        </div>
    )
}