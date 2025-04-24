'use client'

import { useState, useActionState, useEffect } from 'react'
import NotePreview from './NotePreview'
import { saveNote, deleteNote } from '../../app/[lng]/actions.js'
import SaveButton from '@/components/Common/SaveButton'
import DeleteButton from '@/components/Common/DeleteButton'

const initialState = {
  message: null,
}

export default function NoteEditor ({ noteId, initialTitle, initialBody, i18nText }) {
  const [saveState, saveFormAction] = useActionState(saveNote, initialState)
  const [delState, delFormAction] = useActionState(deleteNote, initialState)

  const [title, setTitle] = useState(initialTitle)
  const [body, setBody] = useState(initialBody)
  const isDraft = !noteId

  useEffect(() => {
    if (saveState.errors) {
      console.log(saveState.errors)
    }
  }, [saveState])

  return (
    <div className='note-editor'>
      <form className="note-editor-form" autoComplete="off">
        <div className='note-editor-menu'>
          <input type="hidden" name="noteId" value={noteId} />
          <SaveButton formAction={saveFormAction} i18nText={i18nText} />
          <DeleteButton formAction={delFormAction} isDraft={isDraft} i18nText={i18nText} />
        </div>
        <div className='note-editor-menu'>
          {saveState?.message}
        </div>
        <label className="offscreen" htmlFor="note-title-input">
          Enter a title for you note
        </label>
        <input
          id="note-title-input"
          type="text"
          name="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <label className="offscreen" htmlFor="note-body-input">
          Enter a body for you note
        </label>
        <textarea
          id="note-body-input"
          name="body"
          value={body}
          onChange={e => setBody(e.target.value)}
        />
      </form>
      <div className="note-editor-preview">
        <div className="label label--preview" role="status">
          {i18nText.preview}
        </div>
        <h1 className="note-title">{title}</h1>
        <NotePreview>{body}</NotePreview>
      </div>
    </div>
  )
}
