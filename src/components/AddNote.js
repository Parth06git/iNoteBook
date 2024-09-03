import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = (props) => {

    const context = useContext(noteContext)
    const { addNote } = context

    const [note, setNote] = useState({
        title: "",
        description: "",
        tag: "General"
    })

    const handleAdd = (e) => {
        e.preventDefault()
        addNote(note.title, note.description, note.tag)
        setNote({
            title: '',
            description: '',
            tag: 'General'
        })
        props.showAlert("Added Note Successfully", "success", "2000")
    }

    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <form>
                <div className="my-3">
                    <h1>Add a Note</h1>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label"><h4>Title</h4></label>
                        <input type="text" className="form-control" id="title" name='title' value={note.title} onChange={handleChange} minLength={3} required />
                        {note.title.length < 3 && <p className="my-1">*Title must be atleast 3 character.</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label"> <h4>Description</h4> </label>
                        <textarea className="form-control" id="description" name='description' value={note.description} rows="7" onChange={handleChange} minLength={5} required ></textarea>
                        {note.description.length < 5 && <p className="my-1">*Description must be atleast 5 character.</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label"><h4>Tag</h4></label>
                        <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={handleChange} />
                    </div>
                    <button disabled={note.title.length < 3 || note.description.length < 5} className="btn btn-primary" type="submit" onClick={handleAdd} >Add the Note</button>
                </div>
            </form>
        </div>

    )
}

export default AddNote
