import React from 'react'
import moment from 'moment'
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/task';

export const TaskEntry = ({ id, date, title, body, url='' }) => {
    
    console.log('title', title);
    console.log('body', body);

    const dispatch = useDispatch();
    const noteDate = moment(date);


    const handleEntryClick = () => {
        dispatch( 
            activeNote( id, {
                date, title, body, url
            }) 
        );
    }

    return (
        <div 
            className="task__entry pointer"
            onClick={ handleEntryClick }
        >
            { url &&
                <div
                    className="task__entry-picture"
                    style={{ 
                        backgroundSize:'cover',
                        backgroundImage: `url(${ url })`
                    }}
                ></div>
            }
            
            <div className='task__entry-body'>
                <p className="task__entry-title">
                   { title }
                </p>
                <p className="task__entry-content">
                   { body }
                </p>
            </div>
            <div className='task__entry-date-box'>
                <span>{noteDate.format('dddd')}</span>
                <h4>{noteDate.format('Do')}</h4>
            </div>
        </div>
    )
}
