import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import NoteItems from './NoteItems'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {

    const { showAlert } = props
    let navigate = useNavigate()
    const context = useContext(noteContext)
    const { notes, getNote, editNote } = context

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNote()
        }
        else {
            navigate('/login')
        }
    })

    const [note, setNote] = useState({
        id: "",
        etitle: "",
        edescription: "",
        etag: ""
    })

    const updateNote = (currentnote) => {
        ref.current.click()
        setNote({
            id: currentnote._id,
            etitle: currentnote.title,
            edescription: currentnote.description,
            etag: currentnote.tag
        })
    }

    const ref = useRef(null)

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)


    const handleUpdate = (e) => {
        e.preventDefault()
        editNote(
            note.id,
            note.etitle,
            note.edescription,
            note.etag
        )
        showAlert("Note is updated Successfully", "success", "2000")
        handleClose()
    }

    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <Button ref={ref} variant="primary" className='d-none' onClick={handleShow}>
                Launch demo modal
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Note</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label htmlFor="etitle" className="form-label"><h4>Title</h4></label>
                        <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} onChange={handleChange} minLength={3} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="edescription" className="form-label"> <h4>Description</h4> </label>
                        <textarea className="form-control" id="edescription" name='edescription' value={note.edescription} rows="3" onChange={handleChange} minLength={5} required ></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="etag" className="form-label"><h4>Tag</h4></label>
                        <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={handleChange} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button disabled={note.etitle.length < 3 || note.edescription.length < 5} variant="primary" onClick={handleUpdate}>
                        Update Note
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className='row my-3'>
                <h1>Your Notes</h1>
                <div className="container mx -1">
                    {notes.length === 0 && 'No Notes to Display'}
                </div>
                {notes.map((note) => {

                    return <NoteItems note={note} updateNote={updateNote} showAlert={showAlert} key={note._id} />

                })}

            </div>
        </>
    )
}

export default Notes
