import NoteEditor from '@/components/Note/NoteEditor'
import { getNote } from '@/lib/strapi'
import { getTranslation } from "@/app/i18n/index.js";

export default async function EditPage ({ params }) {
  const { id, lng } = await params;  // Destructure after awaiting
  const noteId = id || '';
  const note = await getNote(noteId);

  if (note === null) {
    return (
      <div className="note--empty-state">
        <span className="note-text--empty-state">
          Click a note on the left to view something! 🥺
        </span>
      </div>
    )
  }

  const { t } = await getTranslation(lng)
  const i18nText = {
    save: t('save'),
    saving: t('saving'),
    preview: t('preview'),
    done: t('done'),
    delete: t('delete')
  }

  return <NoteEditor noteId={noteId} initialTitle={note.title} initialBody={note.content} i18nText={i18nText} />
}
