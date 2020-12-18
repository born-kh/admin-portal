import React from 'react'
import { DOCUMENT_FILE_URL } from '@utils/constants'

export default function ImageComponent({
  ID,
  alt,
  onclick,
}: {
  ID: string | undefined
  alt: string
  onclick?: () => void
}) {
  console.log
  if (ID) {
    return (
      <img
        alt={alt}
        src={DOCUMENT_FILE_URL + ID}
        onClick={onclick}
        id={ID}
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          justifyContent: 'center',
          display: 'flex',
          cursor: 'pointer',
          verticalAlign: 'center',
        }}
      />
    )
  }
  return null
}
