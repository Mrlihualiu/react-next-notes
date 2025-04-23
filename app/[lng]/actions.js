'use server'

import { redirect } from 'next/navigation'
import { addNote, updateNote, delNote } from '@/lib/redis'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { sleep } from '@/lib/utils'

const schema = z.object({
  title: z.string().min(1),
  content: z.string().min(1, '请填写内容').max(100, '内容不能超过100字')
})

export async function saveNote (prevState, formData) {
  const title = formData.get('title')
  const body = formData.get('body')
  const noteId = formData.get('noteId')

  const data = {
    title,
    content: body,
    updateTime: new Date()
  }
  const validated = schema.safeParse(data)
  if (!validated.success) {
    return {
      message: validated.error.issues.length > 0 ? validated.error.issues[0].message : 'save failed',
      errors: validated.error.issues
    }
  }

  await sleep(2000)


  if (noteId) {
    updateNote(noteId, JSON.stringify(data))
    revalidatePath('/', 'layout')
  } else {
    await addNote(JSON.stringify(data))
    revalidatePath('/', 'layout')
  }
  return {
    message: 'Add success'
  }
}

export async function deleteNote (prevState, formData) {
  const noteId = formData.get('noteId')

  delNote(noteId)
  revalidatePath('/', 'layout')
  redirect('/')
}
