import { makeCRCTable } from '.'
import { LayoutData } from './types'

export const layerNames = {
  layer1: 'Default',
  layer2: 'FN1',
  layer3: 'FN2',
  taps: 'Taps',
} as { [index: string]: string }

export const USB_HID_KEY_CODE = [
  '  ',
  '',
  '',
  '',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  '!\n1',
  '@\n2',
  '#\n3',
  '$\n4',
  '%\n5',
  '^\n6',
  '&\n7',
  '*\n8',
  '(\n9',
  ')\n0',
  'Enter',
  'ESC',
  'Backspace',
  'Tab',
  'Space',
  '_\n-',
  '+\n=',
  '{\n[',
  '}\n]',
  '|\n\\',
  '~\n#',
  ':\n;',
  '"\n\'',
  '`~',
  '<\n,',
  '>\n.',
  '?\n/',
  'CapLock',
  'F1',
  'F2',
  'F3',
  'F4',
  'F5',
  'F6',
  'F7',
  'F8',
  'F9',
  'F10',
  'F11',
  'F12',
  'Print\nScreen',
  'Scroll\nLock',
  'Pause',
  'Insert',
  'Home',
  'Page\nUp',
  'Delete',
  'End',
  'Page\nDown',
  'Right',
  'Left',
  'Down',
  'Up',
  'NumLock',
  'KP /',
  'KP *',
  'KP -',
  'KP +',
  'KP\nEnter',
  'KP 1',
  'KP 2',
  'KP 3',
  'KP 4',
  'KP 5',
  'KP 6',
  'KP 7',
  'KP 8',
  'KP 9',
  'KP 0',
  'KP .',
  '>\n<',
  'COMP\n(APP)',
  'POWER',
  'KP =',
  'F13',
  'F14',
  'F15',
  'F16',
  'F17',
  'F18',
  'F19',
  'F20',
  'F21',
  'F22',
  'F23',
  'F24',
  'Exec',
  'Help',
  'Menu',
  'Select',
  'Cancel',
  'Redo',
  'Undo',
  'Cut',
  'Copy',
  'Paste',
  'Find',
  'Mute',
  'Vol+',
  'Vol-',
  // Skip all rarely used keys, index 0x82~0xdf
]

export const USB_HID_KEY_CODE_EXTENDED_START_INDEX = 0xe0
export const USB_HID_KEY_CODE_EXTENDED = [
  'LCtrl',
  'LShift',
  'LAlt',
  'LMeta',
  'RCtrl',
  'RShift',
  'RAlt',
  'RMeta',
  // The following keys seems doesn't work
  'Play',
  'StopCD',
  'Prev',
  'Next',
  'EjectCD',
  'MVol+',
  'MVol-',
  'MMute',
  'WWW',
  'WWW\nBack',
  'WWW\nForward',
  'WWW\nStop',
  'WWW\nFind',
  'WWW\nScrollUp',
  'WWW\nScrollDown',
  'Sleep',
  'Coffee',
  'Refresh',
  'Calc',
]

USB_HID_KEY_CODE_EXTENDED.forEach(
  (c, i) => (USB_HID_KEY_CODE[USB_HID_KEY_CODE_EXTENDED_START_INDEX + i] = c)
)

//For Anne Pro 2 special key
USB_HID_KEY_CODE[240] = 'AnneBL\nToogle'
USB_HID_KEY_CODE[241] = 'AnneBL\nCycle'
USB_HID_KEY_CODE[243] = 'Anne\nBL+'
USB_HID_KEY_CODE[244] = 'Anne\nBL-'
USB_HID_KEY_CODE[246] = 'Anne\n%BAT'
USB_HID_KEY_CODE[207] = 'Anne\nGamePad'
USB_HID_KEY_CODE[200] = 'BT1'
USB_HID_KEY_CODE[201] = 'BT2'
USB_HID_KEY_CODE[202] = 'BT3'
USB_HID_KEY_CODE[203] = 'BT4'
USB_HID_KEY_CODE[192] = 'FN1'
USB_HID_KEY_CODE[193] = 'FN2'
USB_HID_KEY_CODE[194] = 'FN3'
USB_HID_KEY_CODE[168] = 'Anne\nMute'
USB_HID_KEY_CODE[169] = 'Anne\nVol+'
USB_HID_KEY_CODE[170] = 'Anne\nVol-'
USB_HID_KEY_CODE[171] = 'Anne\nPlay'
USB_HID_KEY_CODE[172] = 'Anne\nPrev'
USB_HID_KEY_CODE[173] = 'Anne\nNext'

// FOR YOU, THE HACKER: Add more key codes here
// Ex: USB_HID_KEY_CODE[255] = 'Text';

export const HID_CODE_COMMENT = {
  100: 'Non-US \\|',
  104: 'XF86Tools',
  105: 'XF86Lauchn5\nMacbook screen Brightness Down',
  106: 'XF86Launch6\nMacbook screen Brightness Up',
  107: 'XF86Launch7',
  108: 'XF86Launch8',
  109: 'XF86Launch9',
  111: 'Mic Mute',
  112: 'Touchpad toogle',
  113: 'Touchpad On',
  114: 'Touchpad Off',
  194: 'Active Tap layer',
  200: 'Bluetooth Device 1',
  201: 'Bluetooth Device 2',
  202: 'Bluetooth Device 3',
  203: 'Bluetooth Device 4',
  207: 'Active game pad mode',
  240: 'Toogle Backlight On/Off',
  241: 'Next Backlight Effect',
  243: 'Increase Backlight Brightness',
  244: 'Decrease Backlight Brghtness',
  246: 'Anne battery percent',
} as { [index: number]: string | undefined }

export const defaultLayoutData = {
  layer1: [
    41, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 45, 46, 42, 43, 20, 26, 8, 21,
    23, 28, 24, 12, 18, 19, 47, 48, 49, 57, 4, 22, 7, 9, 10, 11, 13, 14, 15, 51,
    52, 40, 225, 29, 27, 6, 25, 5, 17, 16, 54, 55, 56, 229, 224, 227, 226, 44,
    230, 192, 193, 228,
  ],
  layer2: [
    53, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 0, 0, 0, 82, 0, 0, 0, 0,
    0, 82, 0, 70, 74, 77, 0, 0, 80, 81, 79, 0, 0, 0, 80, 81, 79, 75, 78, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 73, 76, 0, 0, 0, 0, 0, 0, 192, 193, 0,
  ],
  layer3: [
    0, 200, 201, 202, 203, 0, 0, 0, 246, 241, 240, 244, 243, 0, 0, 0, 82, 0, 0,
    0, 0, 0, 82, 0, 70, 74, 77, 0, 0, 80, 81, 79, 0, 0, 0, 80, 81, 79, 75, 78,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 73, 76, 0, 0, 0, 0, 0, 0, 192, 193, 0,
  ],
  taps: [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 82, 0, 0, 0, 0, 0, 80, 81, 79,
  ],
} as LayoutData

export const keySize = {
  13: 'u2',
  14: 'u150',
  27: 'u150',
  28: 'u175',
  40: 'u225',
  41: 'u225',
  52: 'u275',
  53: 'u125',
  54: 'u125',
  55: 'u125',
  56: 'u625',
  57: 'u125',
  58: 'u125',
  59: 'u125',
  60: 'u125',
} as { [index: number]: string | undefined }

export const crcTable = makeCRCTable()
