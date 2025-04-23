import NoteEditor from '@/components/Note/NoteEditor'

export default async function EditPage ({ params }) {
  const { lng } = await params
  return <NoteEditor note={null} initialTitle="Untitled" initialBody="" lng={lng} />
}
