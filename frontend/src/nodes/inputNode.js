// inputNode.js

import { Position } from 'reactflow';
import { createNode } from './BaseNode';
import { BiImport } from 'react-icons/bi';

export const InputNode = createNode({
  title: 'Input',
  description: 'Pass data of different types to your workflow',
  defaultName: 'Input_1',
  icon: BiImport,
  handles: [
    {
      type: 'source',
      position: Position.Right,
      id: 'value'
    }
  ],
  fields: [
    {
      type: 'select',
      name: 'inputType',
      label: 'Type (Dropdown)',
      options: [
        { value: 'Text', label: 'Text' },
        { value: 'File', label: 'File' }
      ]
    }
  ],
  getInitialState: (id, data) => ({
    inputType: data?.inputType || 'Text'
  })
});
