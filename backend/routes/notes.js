const express = require('express');
const fetchuser = require('./middleware/fetchUser');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const Notes = require('../models/Notes');

router.get('/', (req, res) => {
    res.send('Notes route');
})

//get all the notes using: GET "/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({user: req.user.id});
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})
//create a new note using: POST "/api/notes/addnote". Login required
router.post('/addnote', fetchuser,[
    body('title', 'Enter a valid title').isLength({min: 3}),
    body('description', 'Description must be atleast 5 characters').isLength({min: 5}),
    body('tag', 'Tag must be atleast 3 characters').isLength({min: 3}),
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    try {
        const {title, description, tag} = req.body;
        const note = new Notes({title, description, tag, user: req.user.id});
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

//update an existing note using: PUT "/api/notes/updatenote". Login required
router.put('/updatenote/:id', fetchuser,[
    body('title', 'Enter a valid title').isLength({min: 3}),
    body('description', 'Description must be atleast 5 characters').isLength({min: 5}),
    body('tag', 'Tag must be atleast 3 characters').isLength({min: 3}),
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const {title, description, tag} = req.body;
    const newNote = {};
    if(title) {
        newNote.title = title;
    }
    if(description) {
        newNote.description = description;
    }
    if(tag) {
        newNote.tag = tag;
    }

    //find the note to be updated and update it
    let note = await Notes.findById(req.params.id);
    if(!note) {
        return res.status(404).send({'errors':"Not found"});
    }

    if(note.user.toString() !== req.user.id) {
        return res.status(401).send({'errors':"Not allowed"});
    }

    note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
    res.json({note});     
})

//delete an existing note using: DELETE "/api/notes/deletenote". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        //find the note to be deleted and delete it
        let note = await Notes.findById(req.params.id);
        if(!note) {
            return res.status(404).send({'errors':"Not found"});
        }

        //allow deletion only if user owns this note
        if(note.user.toString() !== req.user.id) {
            return res.status(401).send({'errors':"Not allowed"});
        }

        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({'success':"Note has been deleted", note: note});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})
module.exports = router;
