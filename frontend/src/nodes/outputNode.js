// outputNode.js

import { Position } from 'reactflow';
import { createNode } from './BaseNode';
import { BiExport } from 'react-icons/bi';

export const OutputNode = createNode({
  title: 'Output',
  description: 'Display or export results from your workflow',
  defaultName: 'Output_1',
  icon: BiExport,
  handles: [
    {
      type: 'target',
      position: Position.Left,
      id: 'value'
    }
  ],
  fields: [
    {
      type: 'select',
      name: 'outputType',
      label: 'Type (Dropdown)',
      options: [
        { value: 'Text', label: 'Text' },
        { value: 'File', label: 'Image' }
      ]
    }
  ],
  getInitialState: (id, data) => ({
    outputType: data?.outputType || 'Text'
  })
});
