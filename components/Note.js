import dayjs from 'dayjs';
import NotePreview from '@/components/NotePreview';
import EditButton from '@/components/EditButton';

export default function Note ({ noteId, note }) {
  const { title, content, createdAt } = note;
  const date = dayjs(createdAt).format('YYYY-MM-DD HH:mm:ss');

  return (
    <div className='note'>
      <div className='note-header'>
        <h1 className='note-title'>{title}</h1>
        <div className='note-menu' role="menubar">
          <small className='note-update-at' role="status">
            Last Updated on {date}
          </small>
          <EditButton noteId={noteId} role="menuitem">Edit</EditButton>
        </div>
      </div>
      <NotePreview>{content}</NotePreview>
    </div>
  )
}
