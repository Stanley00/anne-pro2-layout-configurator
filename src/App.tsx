import { useEffect, useState } from 'react'
import Keyboard from './comps/Keyboard'
import KeyList from './comps/KeyList'
import Settings from './comps/Settings'
import { createCrc32 } from './utils'
import { defaultLayoutData } from './utils/const'
import { LayerType, LayoutInfo } from './utils/types'

function App() {
  const [layoutInfo, setLayoutInfo] = useState<LayoutInfo>({
    name: 'QWERTY',
    model: 5,
    device: 1,
    type: 'layout',
    crc: 'a2799e46',
    data: defaultLayoutData,
  })
  const [layer, setLayer] = useState<LayerType>('layer1')
  const [selectedKey, setSelectedKey] = useState<number | undefined>(undefined)

  const setKey = (key: number) => {
    if (selectedKey != undefined) {
      const layers = layoutInfo.data
      const currLayer = layoutInfo.data[layer]
      const nextState = {
        ...layoutInfo,
        data: {
          ...layers,
          [layer]: [
            ...currLayer.slice(0, selectedKey),
            key,
            ...currLayer.slice(selectedKey + 1),
          ],
        },
      }
      setLayoutInfo(nextState)
    }
  }

  useEffect(() => {
    const crc = createCrc32(layoutInfo)
    if (layoutInfo.crc != crc) {
      setLayoutInfo({ ...layoutInfo, crc })
    }
  }, [layoutInfo])

  return (
    <div>
      <div className="text-center">
        <h1>Anne Pro 2 layer Configurator</h1>
        <Settings
          layer={layer}
          layoutInfo={layoutInfo}
          onChangeLayer={setLayer}
          onResetLayout={(layout: LayoutInfo) =>
            setLayoutInfo(layout ?? { ...layoutInfo, data: defaultLayoutData })
          }
          onChangeName={(name: string) =>
            setLayoutInfo({ ...layoutInfo, name })
          }
        />
      </div>
      <Keyboard
        layout={layoutInfo.data}
        layer={layer}
        selectedKey={selectedKey}
        onKeySelect={(_: any, idx: number) =>
          setSelectedKey(selectedKey === idx ? undefined : idx)
        }
      />
      <KeyList onKeySelect={setKey} />
    </div>
  )
}

export default App
