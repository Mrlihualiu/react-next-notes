import dayjs from 'dayjs';
import NotePreview from '@/components/Note/NotePreview';
import EditButton from '@/components/Common/EditButton';
import { getTranslation } from "@/app/i18n/index.js"

export default async function Note ({ noteId, note, lng }) {
  const { title, content, createdAt } = note;
  const date = dayjs(createdAt).format('YYYY-MM-DD HH:mm:ss');
  const { t } = await getTranslation(lng)

  return (
    <div className='note'>
      <div className='note-header'>
        <h1 className='note-title'>{title}</h1>
        <div className='note-menu' role="menubar">
          <small className='note-update-at' role="status">
            Last Updated on {date}
          </small>
          <EditButton noteId={noteId} role="menuitem">{t('edit')}</EditButton>
        </div>
      </div>
      <NotePreview>{content}</NotePreview>
    </div>
  )
}
