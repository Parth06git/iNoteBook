import React, { useState } from 'react'
import NoteContext from './noteContext'

const NoteState = (props) => {

  const host = "http://localhost:5000"

  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial)

  // Get all note
  const getNote = async (title, description, tag) => {
    // Api calls

    const url = host + "/api/notes/allnotes"
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authToken": localStorage.getItem('token')
      }
    })
    const json = await response.json()
    setNotes(json)

  }

  // Add a note
  const addNote = async (title, description, tag) => {
    // Api calls

    const url = host + "/api/notes/createnotes"
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authToken": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    })
    const note = await response.json()
    setNotes(notes.concat(note))
  }

  // Delete a note
  const deleteNote = async (id) => {
    // Api calls

    const url = host + "/api/notes/deletenotes/" + id
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "authToken": localStorage.getItem('token')
      }
    })
    await response.json()
    // console.log(json)


    // console.log("Deleting the note with id " + id)
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    // Api calls

    const url = host + "/api/notes/updatenotes/" + id
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "authToken": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    })
    await response.json()
    // console.log(json)

    // Login to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title
        element.description = description
        element.tag = tag
      }
    }




  }

  return (
    <NoteContext.Provider value={{ notes, getNote, addNote, deleteNote, editNote }} >
      {props.children}
    </NoteContext.Provider>
  )

}

export default NoteState