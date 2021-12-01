import { db } from "../firebase/firebaseConfig"




export const loadNotes = async ( uid ) => {

    const notesSnap = await db.collection(`${ uid }/tasks/notes`).get();

    const notes = [];



    notesSnap.forEach( snapChild => {
        notes.push({
            id:snapChild.id,
            ...snapChild.data()
        })
        
    })

    console.log(notes)
    return notes;
}