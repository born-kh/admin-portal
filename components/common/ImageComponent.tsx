import React from 'react'

export default function ({ src, alt, onclick }: { src: string; alt: string; onclick?: () => void }) {
  return (
    <img
      alt={alt}
      src={src}
      onClick={onclick}
      id={src}
      style={{
        maxWidth: '100%',
        maxHeight: '100%',
        justifyContent: 'center',
        display: 'flex',
        cursor: 'pointer',
      }}
    />
  )
}
