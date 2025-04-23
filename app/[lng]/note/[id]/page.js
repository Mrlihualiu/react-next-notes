import Note from '@/components/Note/Note'
import { getNote } from '@/lib/redis'

export default async function Page ({ params }) {
  // 动态路由获取id，并获取对应笔记数据
  const { id, lng } = await params
  const note = await getNote(id)

  if (!note) {
    return {
      notFound: true,
    }
  }
  return <Note noteId={id} note={note} lng={lng} />
}
