import React from "react";
import Split from "react-split";
import Sidebar from "./Sidebar";
import Editor from "./Editor";
import { nanoid } from "nanoid";
import "../notes.css"

export default function Notes() {
    const [notes, setNotes] = React.useState(JSON.parse(localStorage.getItem("notes")) || [])
    const [currentNoteId, setCurrentNoteId] = React.useState(notes[0] && notes[0].id) || ""

    React.useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes))
    }, [notes])

    function createNewNote() {
        console.log("create")
        const newNote = {
            id: nanoid(),
            body: "# Type your markdown note's title here"
        }

        setNotes(prevNotes => [newNote, ...prevNotes])
        setCurrentNoteId(newNote.id)
    }

    function updateNote(text) {
        setNotes(oldNotes => oldNotes.map(oldNote => {
            return oldNote.id === currentNoteId
                ? { ...oldNote, body: text }
                : oldNote
        }))
    }

    function findCurrentNote() {
        return notes.find(note => {
            return note.id === currentNoteId
        }) || notes[0]
    }

    return (
        <main>
            {notes.length > 0 ?
                <Split direction="horizontal" sizes={[30, 70]} className="split">
                    <Sidebar
                        notes={notes}
                        currentNote={findCurrentNote()}
                        setCurrentNoteId={setCurrentNoteId}
                        newNote={createNewNote}
                    />
                    {
                        currentNoteId &&
                        notes.length > 0 &&
                        <Editor
                            currentNote={findCurrentNote()}
                            updateNote={updateNote}
                        />
                    }
                </Split>
                :
                <div className="no-notes">
                    <h1>You have no notes</h1>
                    <button className="first-note" onClick={createNewNote}>Create New</button>
                </div>
            }
        </main>
    )
}