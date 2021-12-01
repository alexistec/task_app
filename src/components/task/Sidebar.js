import React  from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';
import { cleaningNotes, startNewTask } from '../../actions/task';
import { TaskEntries } from './TaskEntries';



export const Sidebar = () => {

    const { name } = useSelector(state => state.auth)
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch( startLogout() )
    }

    const handleAddNew = () => {
        dispatch(startNewTask())
        
    }



    return (
        <aside className="task__sidebar">
            <div className="task__sidebar-navbar">
                <h3 className="mt-5">
                    <i className="far fa-moon"></i>
                    <span> {name}!</span>
                </h3>
                <button
                    onClick={ handleLogout }
                    className="btn">
                    Logout
                </button>
            </div>
            <div
                className="task__new-entry"
                onClick={ handleAddNew }
            >
                <i className="far fa-calendar-plus fa-5x"></i>
                <p className="mt-5">
                    New Entry
                </p>
            </div>
            <TaskEntries/>
        </aside>
    )
}
