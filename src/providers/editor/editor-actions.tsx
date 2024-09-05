import { DeviceTypes, EditorElement } from './editor-provider'

export type EditorAction =
  | {
      type: 'ADD_ELEMENT'
      payload: {
        containerId: string
        elementDetails: EditorElement
      }
    }
  | {
      type: 'REORDER_CHILD_ELEMENTS'
      payload: {
        containerId: string
        startIndex: number
        endIndex: number
      }
    }
  | {
      type: 'RESIZE_ELEMENT'
      payload: {
        elementId: string;
        newStyles: {
          width?: string;
          height?: string;
          [key: string]: any;
        };
      };
    }
  | {
      type: 'UPDATE_ELEMENT'
      payload: {
        elementDetails: EditorElement
      }
    }
    | {
    type: 'UPDATE_ELEMENT'
    payload: {
      elementDetails: EditorElement // This can now include coordinates
    }
  }
  | {
    type: 'SET_COORDINATES'
    payload: {
      elementId: string;
      coordinates: { x: number; y: number };
    }
  }
  | {
      type: 'DELETE_ELEMENT'
      payload: {
        elementDetails: EditorElement
      }
    }
  | {
      type: 'CHANGE_CLICKED_ELEMENT'
      payload: {
        elementDetails?:
          | EditorElement
          | {
              id: ''
              content: []
              name: ''
              styles: {}
              type: null
            }
      }
    }
  | {
      type: 'CHANGE_DEVICE'
      payload: {
        device: DeviceTypes
      }
    }
  | {
      type: 'TOGGLE_PREVIEW_MODE'
    }
  | {
      type: 'TOGGLE_LIVE_MODE'
      payload?: {
        value: boolean
      }
    }
  | { type: 'REDO' }
  | { type: 'UNDO' }
  | {
      type: 'LOAD_DATA'
      payload: {
        elements: EditorElement[]
        withLive: boolean
      }
    }
  | {
      type: 'SET_FUNNELPAGE_ID'
      payload: {
        funnelPageId: string
      }
    }
