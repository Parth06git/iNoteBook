import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const NoteItems = (props) => {

    const { showAlert } = props
    const context = useContext(noteContext)
    const { deleteNote } = context
    const { note, updateNote } = props

    const handleDelete = () => {
        deleteNote(note._id)
        showAlert("Note is deleted Successfully", "success", "2000")
    }


    const handleUpdate = () => {
        updateNote(note)
    }

    return (
        <div className="col-md-3">
            <div className="card my-3">
            <span className="position-absolute top-0 translate-middle badge rounded-pill bg-dark" style={{
                left: '50%',
                zIndex: '1'
            }} >
                Tag: {note.tag}
            </span>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <i className="fa-solid fa-trash mx-2" onClick={handleDelete} ></i>
                    <i className="fa-solid fa-file-pen mx-2" onClick={handleUpdate} ></i>
                </div>
            </div>
        </div>
    )
}

export default NoteItems
