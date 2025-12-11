// numberNode.js - Demonstrates number input type with constraints

import { Position } from 'reactflow';
import { createNode } from './BaseNode';
import { BiHash } from 'react-icons/bi';

export const NumberNode = createNode({
  title: 'Number',
  description: 'Perform numerical operations',
  defaultName: 'Number_1',
  icon: BiHash,
  handles: [
    {
      type: 'source',
      position: Position.Right,
      id: 'value'
    }
  ],
  fields: [
    {
      type: 'number',
      name: 'value',
      label: 'Value',
      min: 0,
      max: 100,
      step: 0.1
    },
    {
      type: 'select',
      name: 'operation',
      label: 'Op',
      options: [
        { value: 'multiply', label: 'Multiply' },
        { value: 'divide', label: 'Divide' },
        { value: 'add', label: 'Add' },
        { value: 'subtract', label: 'Subtract' }
      ]
    }
  ],
  getInitialState: (id, data) => ({
    value: data?.value || 1,
    operation: data?.operation || 'multiply'
  })
});
