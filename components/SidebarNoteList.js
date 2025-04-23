import SidebarNoteItem from '@/components/SidebarNoteItem';
import { getAllNotes } from "@/lib/redis";

export default async function SidebarNoteList () {
  const notes = await getAllNotes();

  if (notes.length === 0) {
    return <div className="notes-empty">
      {'No notes created yet'}
    </div>
  }

  return <ul className="notes-list">
    {notes.map((note) => {
      return <li className="notes-list-item" key={note.id}>
        <SidebarNoteItem noteId={note.id} note={note} />
      </li>
    })}
  </ul>
}
