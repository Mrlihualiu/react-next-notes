import NoteEditor from '@/components/Note/NoteEditor'
import { getTranslation } from "@/app/i18n/index.js";

export default async function EditPage ({ params }) {
  const { lng } = await params
  const { t } = await getTranslation(lng)
  const i18nText = {
    save: t('save'),
    saving: t('saving'),
    preview: t('preview'),
    done: t('done'),
    delete: t('delete')
  }

  return <NoteEditor note={null} initialTitle="Untitled" initialBody="" i18nText={i18nText} />
}
