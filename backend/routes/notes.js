const express = require('express')
const fetchuser = require('../middleware/fetchuser')
const Notes = require('../models/Notes')
const { body, validationResult, matchedData } = require('express-validator')
const router = express.Router()

// Route 1: Get all the notes using: Get "/api/notes/allnotes", Logged in required
router.get('/allnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }

})

// Route 2: Create notes using: Post "/api/notes/createnotes", Logged in required
router.post('/createnotes', fetchuser, [
    body('title', "Enter a Title").isLength({ min: "3" }),
    body('description', "Enter the description").isLength({ min: "5" })
], async (req, res) => {

    try {
        const { title, description, tag } = req.body
        // if there are errors
        const err = validationResult(req)
        if (!err) {
            res.status(400).json({ error: err.array() })
        }

        const notes = new Notes({
            title, description, tag, user: req.user.id
        })
        const saveNotes = await notes.save()

        res.json(saveNotes)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
})

    // Route 3: Update notes using: Put "/api/notes/updatenotes", Logged in required
    router.put('/updatenotes/:id', fetchuser, async (req, res) => {

        try {
            const { title, description, tag } = req.body

            // create new note object
            const newNote = {}
            if (title) { newNote.title = title }
            if (description) { newNote.description = description }
            if (tag) { newNote.tag = tag }

            // Find a note to be updated and update it
            let note = await Notes.findById(req.params.id)

            if (!note) {
                res.status(404).send("Notes Not Found")
            }

            // checking if notes belongs to its own user
            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("Changed to this notes is not allowed")
            }

            // Update the notes 
            note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
            res.json(note)
        } catch (error) {
            console.error(error.message)
            res.status(500).send("Internal Server Error")
        }

    })

    // Route 4: Deleting notes using: delete "/api/notes/deletenotes", Logged in required
    router.delete('/deletenotes/:id', fetchuser, async (req, res) => {

        try {
            const { title, description, tag } = req.body

            // Find a note to be updated and update it
            let note = await Notes.findById(req.params.id)
            if (!note) {
                res.status(404).send("Notes Not Found")
            }

            // checking if notes belongs to its own user
            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("Changed to this notes is not allowed")
            }

            // Update the notes 
            note = await Notes.findByIdAndDelete(req.params.id)
            res.json({ Message: "Success Note has been deleted" })
        } catch (error) {
            console.error(error.message)
            res.status(500).send("Internal Server Error")
        }
    })
module.exports = router