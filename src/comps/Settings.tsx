import { useRef } from 'react'
import { defaultLayoutData, layerNames } from '../utils/const'
import { LayerType, LayoutInfo } from '../utils/types'
import Help from './Help'

const Settings = ({
  layer,
  layoutInfo,
  onChangeLayer,
  onResetLayout,
  onChangeName,
}: {
  layer: LayerType
  layoutInfo: LayoutInfo
  onChangeLayer: Function
  onResetLayout?: Function
  onChangeName?: Function
}) => {
  const fileRef = useRef<HTMLInputElement>(null)
  const downloadRef = useRef<HTMLAnchorElement>(null)

  return (
    <div>
      {Object.keys(defaultLayoutData).map((type, idx) => (
        <input
          key={idx}
          type="button"
          value={layerNames[type]}
          className={layer == type ? 'selected' : ''}
          onClick={() => onChangeLayer(type)}
        />
      ))}
      <input
        type="button"
        value="Load"
        onClick={() => fileRef.current?.click()}
      />
      <input
        ref={fileRef}
        type="file"
        style={{ display: 'none' }}
        onChange={(e) => {
          if (e.target.files) {
            const file = e.target.files[0]
            if (file.name.match(/\.json$/)) {
              const reader = new FileReader()
              reader.onload = () => {
                const data: LayoutInfo = JSON.parse(reader.result as string)
                if (data.type != 'layout') return
                onResetLayout && onResetLayout(data)
                e.target.value = ''
              }
              reader.readAsText(file)
            }
          }
        }}
      />
      <input
        type="text"
        value={layoutInfo.name}
        onChange={(e) => onChangeName && onChangeName(e.target.value)}
      />
      <input
        type="button"
        value="Save"
        onClick={() => {
          const dataStr =
            'data:text/json;charset=utf-8,' +
            encodeURIComponent(JSON.stringify(layoutInfo))
          if (downloadRef.current) {
            downloadRef.current.href = dataStr
            downloadRef.current.click()
          }
        }}
      />
      <a
        ref={downloadRef}
        style={{ display: 'none' }}
        download={layoutInfo.name + '.json'}
      />
      <input
        type="button"
        value="Reset"
        onClick={() => onResetLayout && onResetLayout()}
      />
      <Help />
    </div>
  )
}

export default Settings
