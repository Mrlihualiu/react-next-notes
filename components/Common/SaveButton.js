import { useFormStatus } from 'react-dom'
import Image from 'next/image'

export default function SaveButton ({ formAction }) {
  const { pending } = useFormStatus()

  return (
    <button
      className="note-editor-done"
      disabled={pending}
      type="submit"
      formAction={formAction}
      role="menuitem"
    >
      <Image
        src="/checkmark.svg"
        width={14}
        height={10}
        alt=""
        role="presentation"
      />
      {pending ? 'Saving' : 'Done'}
    </button>
  )
}
