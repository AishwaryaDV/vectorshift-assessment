// transformNode.js - Demonstrates textarea for multi-line input

import { Position } from 'reactflow';
import { createNode } from './BaseNode';
import { BiTransfer } from 'react-icons/bi';

export const TransformNode = createNode({
  title: 'Transform',
  description: 'Transform text data',
  defaultName: 'Transform_1',
  icon: BiTransfer,
  handles: [
    {
      type: 'target',
      position: Position.Left,
      id: 'input'
    },
    {
      type: 'source',
      position: Position.Right,
      id: 'output'
    }
  ],
  fields: [
    {
      type: 'select',
      name: 'transformType',
      label: 'Type',
      options: [
        { value: 'uppercase', label: 'UPPERCASE' },
        { value: 'lowercase', label: 'lowercase' },
        { value: 'trim', label: 'Trim' },
        { value: 'reverse', label: 'Reverse' }
      ]
    },
    {
      type: 'textarea',
      name: 'template',
      label: 'Template',
      rows: 3,
      style: { fontSize: '11px' }
    }
  ],
  getInitialState: (id, data) => ({
    transformType: data?.transformType || 'uppercase',
    template: data?.template || 'Output: {{value}}'
  })
});
