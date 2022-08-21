import { defaultLayoutData, USB_HID_KEY_CODE } from '../utils/const'
import { LayoutData } from '../utils/types'
import Key from './Key'

const Keyboard = ({
  layout,
  layer,
  selectedKey,
  onKeySelect,
}: {
  layout: LayoutData
  layer: string
  selectedKey?: number
  onKeySelect?: Function
}) => {
  return (
    <div className="keyboard-base">
      {layout[layer].map((key, idx) => (
        <Key
          key={idx}
          index={idx}
          defaultText={USB_HID_KEY_CODE[defaultLayoutData[layer][idx]]}
          currentText={USB_HID_KEY_CODE[key]}
          onKeySelect={onKeySelect}
          selected={selectedKey == idx}
        />
      ))}
    </div>
  )
}

export default Keyboard
