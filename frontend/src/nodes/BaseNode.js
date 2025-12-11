// BaseNode.js - A flexible abstraction for creating ReactFlow nodes

import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { BiBulb, BiXCircle } from 'react-icons/bi';
import { useStore } from '../store';

/**
 * BaseNode - A configurable base component for creating nodes
 *
 * @param {Object} config - Node configuration
 * @param {string} config.title - Node title/label
 * @param {string} config.description - Node description
 * @param {Array} config.handles - Handle configurations
 * @param {Array} config.fields - Field configurations
 * @param {Object} config.style - Custom styles for the container
 * @param {Function} config.getInitialState - Function to get initial state from data
 */
export const BaseNode = ({ id, data, config, selected }) => {
  // Initialize state for all fields
  const initialState = config.getInitialState ? config.getInitialState(id, data) : {};
  const [state, setState] = useState(initialState);
  const [nodeName, setNodeName] = useState(data?.nodeName || config.defaultName || config.title);

  // Get delete function from store
  const nodes = useStore((state) => state.nodes);
  const setNodes = useStore((state) => state.onNodesChange);

  // Generic handler for field changes
  const handleFieldChange = (fieldName, value) => {
    setState(prev => ({ ...prev, [fieldName]: value }));
  };

  // Handle node deletion
  const handleDelete = (e) => {
    e.stopPropagation();
    const changes = [{ id, type: 'remove' }];
    setNodes(changes);
  };

  // Use purple shades for all nodes
  const baseColor = '#6366f1'; // rgb(99, 102, 241)
  const lightColor = '#e0e7ff'; // Very light purple
  const borderColor = selected ? '#6366f1' : '#a5b4fc'; // Darker when selected

  // Default container style
  const defaultStyle = {
    width: 300,
    minHeight: 'auto',
    border: `2px solid ${borderColor}`,
    padding: '0',
    background: 'white',
    borderRadius: '4px',
    boxShadow: selected ? '0 0 0 3px rgba(99, 102, 241, 0.2)' : '0 4px 12px rgba(0, 0, 0, 0.1)',
    overflow: 'visible',
    ...config.style
  };

  // Render a field based on its configuration
  const renderField = (field) => {
    const value = state[field.name] ?? '';

    switch (field.type) {
      case 'text':
        return (
          <label key={field.name} style={{ display: 'block', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: '600', color: '#64748b', display: 'block', marginBottom: '5px' }}>
              {field.label}
            </span>
            <input
              type="text"
              value={value}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              style={{
                width: '100%',
                padding: '7px 9px',
                border: '1px solid #cbd5e1',
                borderRadius: '6px',
                fontSize: '12px',
                outline: 'none',
                transition: 'border-color 0.2s',
                ...field.style
              }}
              onFocus={(e) => e.target.style.borderColor = baseColor}
              onBlur={(e) => e.target.style.borderColor = borderColor}
            />
          </label>
        );

      case 'textarea':
        return (
          <label key={field.name} style={{ display: 'block', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: '600', color: '#64748b', display: 'block', marginBottom: '5px' }}>
              {field.label}
            </span>
            <textarea
              value={value}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              rows={field.rows || 2}
              style={{
                width: '100%',
                padding: '7px 9px',
                border: '1px solid #cbd5e1',
                borderRadius: '6px',
                fontSize: '12px',
                outline: 'none',
                resize: 'vertical',
                fontFamily: 'inherit',
                ...field.style
              }}
              onFocus={(e) => e.target.style.borderColor = baseColor}
              onBlur={(e) => e.target.style.borderColor = borderColor}
            />
          </label>
        );

      case 'select':
        return (
          <div key={field.name} style={{ marginBottom: '8px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '5px'
            }}>
              <span style={{ fontSize: '11px', fontWeight: '600', color: '#64748b' }}>
                {field.label}
              </span>
              <span style={{
                fontSize: '10px',
                fontWeight: '600',
                color: baseColor,
                background: lightColor,
                padding: '2px 8px',
                borderRadius: '10px',
                border: `1px solid ${borderColor}`
              }}>
                {value || field.options[0]?.label}
              </span>
            </div>
            <select
              value={value}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              className="custom-select"
              style={{
                width: '100%',
                padding: '7px 9px',
                border: `1px solid ${borderColor}`,
                borderRadius: '6px',
                fontSize: '12px',
                outline: 'none',
                backgroundColor: 'white',
                cursor: 'pointer',
                fontWeight: '500',
                ...field.style
              }}
              onFocus={(e) => e.target.style.borderColor = baseColor}
              onBlur={(e) => e.target.style.borderColor = borderColor}
            >
              {field.options.map(opt => (
                <option key={opt.value} value={opt.value} style={{
                  padding: '7px',
                  fontSize: '12px'
                }}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        );

      case 'number':
        return (
          <label key={field.name} style={{ display: 'block', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: '600', color: '#64748b', display: 'block', marginBottom: '5px' }}>
              {field.label}
            </span>
            <input
              type="number"
              value={value}
              onChange={(e) => handleFieldChange(field.name, parseFloat(e.target.value))}
              min={field.min}
              max={field.max}
              step={field.step}
              style={{
                width: '90px',
                padding: '7px 9px',
                border: '1px solid #cbd5e1',
                borderRadius: '6px',
                fontSize: '12px',
                outline: 'none',
                ...field.style
              }}
              onFocus={(e) => e.target.style.borderColor = baseColor}
              onBlur={(e) => e.target.style.borderColor = borderColor}
            />
          </label>
        );

      case 'checkbox':
        return (
          <label key={field.name} style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '8px',
            cursor: 'pointer',
            fontSize: '12px',
            color: '#475569'
          }}>
            <input
              type="checkbox"
              checked={value}
              onChange={(e) => handleFieldChange(field.name, e.target.checked)}
              style={{
                marginRight: '8px',
                width: '16px',
                height: '16px',
                cursor: 'pointer',
                accentColor: baseColor,
                ...field.style
              }}
            />
            {field.label}
          </label>
        );

      case 'static':
        return (
          <div key={field.name} style={{ marginBottom: '4px', ...field.style }}>
            {field.content}
          </div>
        );

      default:
        return null;
    }
  };

  // Render a handle based on its configuration
  const renderHandle = (handle, index) => {
    return (
      <Handle
        key={`${handle.type}-${handle.id || index}`}
        type={handle.type}
        position={handle.position}
        id={handle.id ? `${id}-${handle.id}` : `${id}-${handle.type}-${index}`}
        style={handle.style || {}}
      />
    );
  };

  return (
    <div style={defaultStyle}>
      {/* Render handles */}
      {config.handles && config.handles.map((handle, idx) => renderHandle(handle, idx))}

      {/* Header and Description in purple box */}
      <div style={{
        background: lightColor,
        padding: '12px',
        borderBottom: `1px solid ${borderColor}`
      }}>
        {/* Header with icon, title, and delete button */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: config.description ? '7px' : '0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
            {config.icon && <config.icon size={18} color={baseColor} />}
            <span style={{ fontWeight: '700', fontSize: '14px', color: '#1e293b' }}>
              {config.title}
            </span>
          </div>
          <button
            onClick={handleDelete}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '0',
              display: 'flex',
              alignItems: 'center',
              color: '#64748b',
              transition: 'color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#ef4444'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}
          >
            <BiXCircle size={20} />
          </button>
        </div>

        {/* Description - no border, same box as header */}
        {config.description && (
          <div style={{
            fontSize: '10px',
            color: '#64748b',
            lineHeight: '1.4',
            paddingLeft: '25px'
          }}>
            {config.description}
          </div>
        )}
      </div>

      {/* Content area */}
      <div style={{ padding: '12px' }}>

        {/* Node naming input */}
        <div style={{ marginBottom: '8px' }}>
          <label style={{ display: 'block' }}>
            <span style={{
              fontSize: '11px',
              fontWeight: '600',
              color: '#64748b',
              display: 'block',
              marginBottom: '5px'
            }}>
              Name
            </span>
            <input
              type="text"
              value={nodeName}
              onChange={(e) => setNodeName(e.target.value)}
              placeholder={config.defaultName || config.title}
              className="node-name-input"
              style={{
                width: '100%',
                padding: '7px 9px',
                border: `1px solid ${borderColor}`,
                borderRadius: '6px',
                fontSize: '12px',
                outline: 'none',
                background: 'white',
                fontWeight: '500'
              }}
              onFocus={(e) => e.target.style.borderColor = baseColor}
              onBlur={(e) => e.target.style.borderColor = borderColor}
            />
          </label>
        </div>

        {/* Suggestion box - only show if name is default */}
        {nodeName === (config.defaultName || config.title) && (
          <div style={{
            background: lightColor,
            padding: '7px 9px',
            borderRadius: '6px',
            marginBottom: '10px',
            border: `1px solid ${borderColor}`,
            display: 'flex',
            alignItems: 'flex-start',
            gap: '7px'
          }}>
            <BiBulb size={14} color={baseColor} style={{ marginTop: '1px', flexShrink: 0 }} />
            <div style={{ fontSize: '10px', lineHeight: '1.4' }}>
              <span style={{ fontWeight: '700', color: baseColor }}>Suggestion: </span>
              <span style={{ color: '#64748b' }}>Give the node a distinct name</span>
            </div>
          </div>
        )}

        {/* Render fields */}
        <div style={{ fontSize: '12px' }}>
          {config.fields && config.fields.map(field => renderField(field))}
        </div>
      </div>
    </div>
  );
};

/**
 * createNode - Factory function to create a node component from a configuration
 *
 * @param {Object} config - Node configuration (same as BaseNode config)
 * @returns {Function} React component
 */
export const createNode = (config) => {
  return (props) => <BaseNode {...props} config={config} />;
};
