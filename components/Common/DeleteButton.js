import { useFormStatus } from 'react-dom'
import Image from 'next/image'


export default function DeleteButton ({ formAction, isDraft, i18nText }) {
  const { pending } = useFormStatus()

  return !isDraft && (
    <button
      className="note-editor-delete"
      disabled={pending}
      formAction={formAction}
      role="menuitem"
    >
      <Image
        src="/cross.svg"
        width={10}
        height={10}
        alt=""
        role="presentation"
      />
      {i18nText.delete}
    </button>
  )
}
