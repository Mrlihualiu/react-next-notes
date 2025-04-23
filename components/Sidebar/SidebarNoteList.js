import { getAllNotes } from "@/lib/redis";
import SidebarNoteListFilter from '@/components/Sidebar/SidebarNoteListFilter';
// import SidebarNoteItem from '@/components/SidebarNoteItem';
import SidebarNoteItemHeader from "./SidebarNoteItemHeader";

export default async function SidebarNoteList () {
  const notes = await getAllNotes();

  if (notes.length === 0) {
    return <div className='notes-empty'>No notes created yet!</div>
  }

  return (
    <SidebarNoteListFilter
      notes={notes.map(note => {
        const { title, updateTime } = note;
        return {
          noteId: note.id,
          note,
          header: <SidebarNoteItemHeader title={title} updateTime={updateTime} />
        }
      })}
    />
  )
}
