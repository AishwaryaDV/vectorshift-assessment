// mergeNode.js - Demonstrates multiple inputs merging into one output

import { Position } from 'reactflow';
import { createNode } from './BaseNode';
import { BiMerge } from 'react-icons/bi';

export const MergeNode = createNode({
  title: 'Merge',
  description: 'Combine multiple inputs',
  defaultName: 'Merge_1',
  icon: BiMerge,
  handles: [
    {
      type: 'target',
      position: Position.Left,
      id: 'input1',
      style: { top: '25%' }
    },
    {
      type: 'target',
      position: Position.Left,
      id: 'input2',
      style: { top: '50%' }
    },
    {
      type: 'target',
      position: Position.Left,
      id: 'input3',
      style: { top: '75%' }
    },
    {
      type: 'source',
      position: Position.Right,
      id: 'merged'
    }
  ],
  fields: [
    {
      type: 'select',
      name: 'mergeStrategy',
      label: 'Strategy',
      options: [
        { value: 'concat', label: 'Concatenate' },
        { value: 'join', label: 'Join' },
        { value: 'array', label: 'Array' }
      ]
    },
    {
      type: 'text',
      name: 'separator',
      label: 'Sep'
    }
  ],
  getInitialState: (id, data) => ({
    mergeStrategy: data?.mergeStrategy || 'concat',
    separator: data?.separator || ', '
  })
});
