import { getAllNotes } from "@/lib/notes";
import SidebarNoteListFilter from '@/components/Sidebar/SidebarNoteListFilter';
// import SidebarNoteItem from '@/components/SidebarNoteItem';
import SidebarNoteItemHeader from "./SidebarNoteItemHeader";

export default async function SidebarNoteList () {
  const notes = await getAllNotes();
  console.log('notes :>> ', notes);

  if (notes.length === 0) {
    return <div className='notes-empty'>No notes created yet!</div>
  }

  return (
    <SidebarNoteListFilter
      notes={notes.map(note => {
        const { title, updatedAt } = note;
        return {
          noteId: note.uuid,
          note,
          header: <SidebarNoteItemHeader title={title} updateTime={toString(updatedAt)} />
        }
      })}
    />
  )
}
