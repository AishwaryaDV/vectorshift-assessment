// llmNode.js

import { Position } from 'reactflow';
import { createNode } from './BaseNode';
import { BiBrain } from 'react-icons/bi';

export const LLMNode = createNode({
  title: 'LLM',
  description: 'Process text using a Large Language Model',
  defaultName: 'LLM_1',
  icon: BiBrain,
  handles: [
    {
      type: 'target',
      position: Position.Left,
      id: 'system',
      style: { top: `${100/3}%` }
    },
    {
      type: 'target',
      position: Position.Left,
      id: 'prompt',
      style: { top: `${200/3}%` }
    },
    {
      type: 'source',
      position: Position.Right,
      id: 'response'
    }
  ],
  fields: [],
  getInitialState: () => ({})
});
