'use client'

import React, { useTransition } from 'react'
import { useRouter } from 'next/navigation'

export default function SidebarImport ({ i18nText }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const onChage = async (e) => {
    const fileInput = e.target
    if (!fileInput || fileInput.files.length === 0) {
      console.warn('file is empty')
      return
    }
    const file = fileInput.files[0]
    const formData = new FormData()
    formData.append('file', file)
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
      if (!response.ok) {
        console.error('something went wrong')
        return
      }
      const data = await response.json()
      if (!data.id) {
        console.error('something went wrong')
        return
      }
      startTransition(() => {
        router.push(`/note/${data.id}`)
      })
      startTransition(() => {
        router.refresh()
      })
    } catch (error) {
      console.error('something went wrong')
    }

    // 重置 file input
    e.target.type = "text";
    e.target.type = "file";
  }
  return (
    <form method="post" encType="multipart/form-data">
      <div style={{ textAlign: "center" }}>
        <label htmlFor="file" style={{ cursor: 'pointer' }}>{i18nText.importMD}</label>
        <input
          type="file"
          id="file"
          name="file"
          multiple
          style={{ position: "absolute", clip: "rect(0 0 0 0)" }}
          onChange={onChage}
          accept='.md, .markdown'
        />
      </div>
    </form>
  )
}
