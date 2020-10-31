import React from 'react'

export default function ({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      alt={alt}
      src={src}
      style={{
        maxWidth: '100%',
        maxHeight: '100%',
      }}
    />
  )
}
