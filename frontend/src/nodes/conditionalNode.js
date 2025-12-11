// conditionalNode.js - Demonstrates checkbox and conditional logic

import { Position } from 'reactflow';
import { createNode } from './BaseNode';
import { BiGitBranch } from 'react-icons/bi';

export const ConditionalNode = createNode({
  title: 'Conditional',
  description: 'Route data based on conditions',
  defaultName: 'Conditional_1',
  icon: BiGitBranch,
  handles: [
    {
      type: 'target',
      position: Position.Left,
      id: 'condition'
    },
    {
      type: 'target',
      position: Position.Left,
      id: 'value',
      style: { top: '66%' }
    },
    {
      type: 'source',
      position: Position.Right,
      id: 'true',
      style: { top: '33%' }
    },
    {
      type: 'source',
      position: Position.Right,
      id: 'false',
      style: { top: '66%' }
    }
  ],
  fields: [
    {
      type: 'checkbox',
      name: 'invertCondition',
      label: 'Invert Logic'
    },
    {
      type: 'static',
      name: 'info',
      content: 'Routes based on condition',
      style: { fontSize: '10px', color: '#666' }
    }
  ],
  getInitialState: (id, data) => ({
    invertCondition: data?.invertCondition || false
  })
});
