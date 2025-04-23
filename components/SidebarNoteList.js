import { getAllNotes } from "@/lib/redis";
import SidebarNoteListFilter from '@/components/SidebarNoteListFilter';
import SidebarNoteItem from '@/components/SidebarNoteItem';

export default async function SidebarNoteList () {
  const notes = await getAllNotes();

  if (notes.length === 0) {
    return <div className='notes-empty'>No notes created yet!</div>
  }

  return (
    <SidebarNoteListFilter>
      {notes.map((note) => (
        <SidebarNoteItem key={note.id} noteId={note.id} note={note} />
      ))}
    </SidebarNoteListFilter>
  )
}
