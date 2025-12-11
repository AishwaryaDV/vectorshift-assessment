// index.js - Central export for all node types

// Original nodes (refactored)
export { InputNode } from './inputNode';
export { OutputNode } from './outputNode';
export { LLMNode } from './llmNode';
export { TextNode } from './textNode';

// New demo nodes
export { FilterNode } from './filterNode';
export { NumberNode } from './numberNode';
export { ConditionalNode } from './conditionalNode';
export { TransformNode } from './transformNode';
export { MergeNode } from './mergeNode';

// Base abstraction for creating custom nodes
export { BaseNode, createNode } from './BaseNode';
