// filterNode.js - Demonstrates multiple handles and select options

import { Position } from 'reactflow';
import { createNode } from './BaseNode';
import { BiFilterAlt } from 'react-icons/bi';

export const FilterNode = createNode({
  title: 'Filter',
  description: 'Filter data based on conditions',
  defaultName: 'Filter_1',
  icon: BiFilterAlt,
  handles: [
    {
      type: 'target',
      position: Position.Left,
      id: 'input'
    },
    {
      type: 'source',
      position: Position.Right,
      id: 'passed',
      style: { top: '33%' }
    },
    {
      type: 'source',
      position: Position.Right,
      id: 'failed',
      style: { top: '66%' }
    }
  ],
  fields: [
    {
      type: 'select',
      name: 'filterType',
      label: 'Filter',
      options: [
        { value: 'contains', label: 'Contains' },
        { value: 'equals', label: 'Equals' },
        { value: 'startsWith', label: 'Starts With' },
        { value: 'endsWith', label: 'Ends With' }
      ]
    },
    {
      type: 'text',
      name: 'filterValue',
      label: 'Value'
    }
  ],
  getInitialState: (id, data) => ({
    filterType: data?.filterType || 'contains',
    filterValue: data?.filterValue || ''
  })
});
