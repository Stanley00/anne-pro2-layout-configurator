import React from 'react'

import { keySize } from '../utils/const'

interface Prop extends React.HTMLAttributes<HTMLDivElement> {
  defaultText: string
  currentText: string
  index: number
  onKeySelect?: Function
  selected?: boolean
}

const Key = ({
  defaultText,
  currentText,
  index,
  className,
  selected,
  onKeySelect,
}: Prop) => {
  return (
    <div
      className={
        'key' +
        (keySize[index] ? ' ' + keySize[index] : '') +
        (currentText.includes('\n') ? ' with_shift' : '') +
        (currentText != defaultText ? ' modified' : '') +
        (className ? ' ' + className : '') +
        (selected ? ' selected' : '')
      }
      onClick={(e) => onKeySelect && onKeySelect(e, index)}
    >
      {currentText.split('\n').map((str, idx) => (
        <span key={idx}>{str}</span>
      ))}
    </div>
  )
}

export default Key
