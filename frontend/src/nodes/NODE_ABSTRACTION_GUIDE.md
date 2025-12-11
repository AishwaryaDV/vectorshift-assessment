# Node Abstraction Guide

## Overview

This directory contains a flexible node abstraction system built on top of ReactFlow. The `BaseNode` component and `createNode` factory function allow you to create new nodes declaratively with minimal code.

## Benefits

1. **Code Reduction**: Creating a new node requires only a configuration object (~20-30 lines) instead of ~50+ lines of component code
2. **Consistency**: All nodes share the same base styling and structure
3. **Maintainability**: Styling changes can be applied globally through BaseNode
4. **Flexibility**: Supports multiple field types, handles, and custom styling

## Architecture

### BaseNode Component
The core component that renders nodes based on configuration. It handles:
- State management for all fields
- Rendering of handles (connection points)
- Rendering of various field types
- Consistent styling

### createNode Factory
A factory function that takes a configuration object and returns a React component.

## Creating a New Node

### Basic Example

```javascript
import { Position } from 'reactflow';
import { createNode } from './BaseNode';

export const MyNode = createNode({
  title: 'My Node',
  handles: [
    { type: 'target', position: Position.Left, id: 'input' },
    { type: 'source', position: Position.Right, id: 'output' }
  ],
  fields: [
    { type: 'text', name: 'myField', label: 'My Field' }
  ],
  getInitialState: (id, data) => ({
    myField: data?.myField || 'default'
  })
});
```

## Configuration Schema

### Required Properties

#### `title` (string)
The node's display title shown in the header.

#### `handles` (array)
Array of handle configurations. Each handle object supports:
- `type`: 'source' | 'target'
- `position`: Position.Left | Position.Right | Position.Top | Position.Bottom
- `id`: string (will be prefixed with node id automatically)
- `style`: optional custom CSS styles (e.g., `{ top: '50%' }`)

#### `fields` (array)
Array of field configurations. Each field object requires:
- `type`: 'text' | 'textarea' | 'select' | 'number' | 'checkbox' | 'static'
- `name`: unique identifier for the field
- `label`: display label

Field-specific properties:
- **text**: `style` (optional CSS)
- **textarea**: `rows` (number), `style`
- **select**: `options` (array of `{ value, label }`)
- **number**: `min`, `max`, `step`, `style`
- **checkbox**: `style`
- **static**: `content` (string or JSX), `style`

#### `getInitialState` (function)
Function that returns the initial state object for all fields.
- Parameters: `(id, data)`
- Returns: object with field names as keys

### Optional Properties

#### `style` (object)
Custom CSS styles to merge with default container styles. Defaults:
```javascript
{
  width: 200,
  height: 80,
  border: '1px solid black',
  padding: '8px',
  background: 'white',
  borderRadius: '4px'
}
```

## Field Types Reference

### Text Input
```javascript
{
  type: 'text',
  name: 'myText',
  label: 'My Text',
  style: { width: '100px' } // optional
}
```

### Textarea
```javascript
{
  type: 'textarea',
  name: 'longText',
  label: 'Long Text',
  rows: 3,
  style: { fontSize: '11px' }
}
```

### Select Dropdown
```javascript
{
  type: 'select',
  name: 'choice',
  label: 'Choice',
  options: [
    { value: 'opt1', label: 'Option 1' },
    { value: 'opt2', label: 'Option 2' }
  ]
}
```

### Number Input
```javascript
{
  type: 'number',
  name: 'count',
  label: 'Count',
  min: 0,
  max: 100,
  step: 1
}
```

### Checkbox
```javascript
{
  type: 'checkbox',
  name: 'enabled',
  label: 'Enabled'
}
```

### Static Content
```javascript
{
  type: 'static',
  name: 'info',
  content: 'This is static text',
  style: { color: '#666', fontSize: '10px' }
}
```

## Example Nodes

### Simple Input/Output Node
```javascript
export const SimpleNode = createNode({
  title: 'Simple',
  handles: [
    { type: 'target', position: Position.Left, id: 'in' },
    { type: 'source', position: Position.Right, id: 'out' }
  ],
  fields: [
    { type: 'text', name: 'value', label: 'Value' }
  ],
  getInitialState: () => ({ value: '' })
});
```

### Multi-Handle Node
```javascript
export const SplitterNode = createNode({
  title: 'Splitter',
  handles: [
    { type: 'target', position: Position.Left, id: 'input' },
    { type: 'source', position: Position.Right, id: 'out1', style: { top: '33%' } },
    { type: 'source', position: Position.Right, id: 'out2', style: { top: '66%' } }
  ],
  fields: [],
  getInitialState: () => ({}),
  style: { height: 100 }
});
```

### Complex Configuration Node
```javascript
export const ProcessorNode = createNode({
  title: 'Processor',
  handles: [
    { type: 'target', position: Position.Left, id: 'input' },
    { type: 'source', position: Position.Right, id: 'output' }
  ],
  fields: [
    {
      type: 'select',
      name: 'mode',
      label: 'Mode',
      options: [
        { value: 'fast', label: 'Fast' },
        { value: 'accurate', label: 'Accurate' }
      ]
    },
    {
      type: 'number',
      name: 'threshold',
      label: 'Threshold',
      min: 0,
      max: 1,
      step: 0.1
    },
    {
      type: 'checkbox',
      name: 'verbose',
      label: 'Verbose Output'
    }
  ],
  getInitialState: (id, data) => ({
    mode: data?.mode || 'fast',
    threshold: data?.threshold || 0.5,
    verbose: data?.verbose || false
  }),
  style: { height: 140 }
});
```

## Demo Nodes

This directory includes 5 demo nodes showcasing different capabilities:

1. **FilterNode** - Multiple outputs, text + select fields
2. **NumberNode** - Number input with constraints, mathematical operations
3. **ConditionalNode** - Checkbox field, multiple inputs/outputs for branching logic
4. **TransformNode** - Textarea field, custom dimensions
5. **MergeNode** - Multiple inputs merging to single output

## Migrating Existing Nodes

To convert an existing node to use this abstraction:

1. Identify the node's handles and their positions
2. Identify the fields and their types
3. Extract the initial state logic
4. Create a configuration object
5. Replace the component with `createNode(config)`

See the refactored versions of InputNode, OutputNode, LLMNode, and TextNode for examples.

## Best Practices

1. **Keep nodes focused**: Each node should do one thing well
2. **Use meaningful IDs**: Handle IDs should be descriptive (e.g., 'system', 'prompt', not 'h1', 'h2')
3. **Adjust height**: If you have many fields, increase the height in the style config
4. **Position handles carefully**: For multiple handles, use the `style` property to set positions
5. **Provide sensible defaults**: Use getInitialState to set good default values

## Future Enhancements

Potential improvements to the abstraction:
- Custom field types via plugins
- Built-in validation
- Field dependencies (show/hide based on other fields)
- Custom render functions for complex UIs
- Theme support
- Accessibility improvements
