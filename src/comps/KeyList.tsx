import { useEffect, useState } from 'react'
import { LCS } from '../utils'
import { HID_CODE_COMMENT, USB_HID_KEY_CODE } from '../utils/const'

const KeyList = ({ onKeySelect }: { onKeySelect: Function }) => {
  const [search, setSearch] = useState('')
  const [filterList, setFilterList] = useState<
    {
      key: string
      idx: number
      len: number
    }[]
  >([])

  useEffect(() => {
    const newList = USB_HID_KEY_CODE.map((key, idx) => ({
      key,
      idx,
      len: LCS.size(key.toLowerCase(), search.toLowerCase()),
    }))
    setFilterList(newList.sort((a, b) => b.len - a.len))
  }, [search])

  return (
    <div className="keyboard-x">
      <div>
        <input
          placeholder="Search key"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="keylist">
        {filterList.map(
          ({ key, idx }) =>
            key &&
            key != '' && (
              <div
                key={idx}
                className={
                  'key u125' +
                  (key.includes('\n')
                    ? ' with_shift'
                    : key.length > 4
                    ? ' small_text'
                    : '')
                }
                title={HID_CODE_COMMENT[idx] ?? ''}
                onClick={() => onKeySelect && onKeySelect(idx)}
              >
                {key.split('\n').map((str, idx) => (
                  <span key={idx}>{str}</span>
                ))}
              </div>
            )
        )}
      </div>
    </div>
  )
}

export default KeyList
