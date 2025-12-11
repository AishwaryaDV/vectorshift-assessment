// textNode.js

import { useState, useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';
import { BiText, BiBulb, BiXCircle } from 'react-icons/bi';
import { useStore } from '../store';

export const TextNode = ({ id, data, selected }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [nodeName, setNodeName] = useState(data?.nodeName || 'Text_1');
  const [variables, setVariables] = useState([]);
  const [dimensions, setDimensions] = useState({ height: 200 });
  const textareaRef = useRef(null);

  // Get delete function from store
  const setNodes = useStore((state) => state.onNodesChange);

  // Purple theme colors
  const baseColor = '#6366f1'; // rgb(99, 102, 241)
  const lightColor = '#e0e7ff';
  const borderColor = selected ? '#6366f1' : '#a5b4fc';

  // Extract variables from text (e.g., {{ variableName }})
  useEffect(() => {
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const matches = [...currText.matchAll(regex)];
    const uniqueVars = [...new Set(matches.map(match => match[1]))];
    setVariables(uniqueVars);
  }, [currText]);

  // Auto-resize based on content
  useEffect(() => {
    if (textareaRef.current) {
      // Reset height to auto to get accurate scrollHeight
      textareaRef.current.style.height = 'auto';

      // Calculate height based on actual content (scrollHeight)
      const scrollHeight = textareaRef.current.scrollHeight;
      const minTextHeight = 60;
      const textareaHeight = Math.max(minTextHeight, scrollHeight);

      // Calculate total node height
      // Header (~70px) + Name section (~55px) + Suggestion (~40px if shown) + Textarea label (~25px) + Variables (~35px) + Padding
      const baseHeight = nodeName === 'Text_1' ? 250 : 210; // Account for suggestion box
      const totalHeight = baseHeight + textareaHeight;

      setDimensions({
        height: totalHeight
      });

      // Update textarea height directly
      textareaRef.current.style.height = `${textareaHeight}px`;
    }
  }, [currText, nodeName]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  // Handle node deletion
  const handleDelete = (e) => {
    e.stopPropagation();
    const changes = [{ id, type: 'remove' }];
    setNodes(changes);
  };

  return (
    <div style={{
      width: 320,
      minHeight: dimensions.height,
      border: `2px solid ${borderColor}`,
      padding: '0',
      background: 'white',
      borderRadius: '4px',
      boxShadow: selected ? '0 0 0 3px rgba(99, 102, 241, 0.2)' : '0 4px 12px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden'
    }}>
      {/* Handles */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{
          background: baseColor,
          width: '12px',
          height: '12px',
          border: '2px solid #fff',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
        }}
      />

      {variables.map((variable, index) => {
        const totalVars = variables.length;
        const position = totalVars === 1 ? 50 : (100 / (totalVars + 1)) * (index + 1);
        return (
          <Handle
            key={variable}
            type="target"
            position={Position.Left}
            id={`${id}-${variable}`}
            style={{
              top: `${position}%`,
              background: baseColor,
              width: '12px',
              height: '12px',
              border: '2px solid #fff',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
            }}
          />
        );
      })}

      {/* Header and Description in purple box */}
      <div style={{
        background: lightColor,
        padding: '14px',
        borderBottom: `1px solid ${borderColor}`
      }}>
        {/* Header with icon, title, and delete button */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '8px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BiText size={20} color={baseColor} />
            <span style={{ fontWeight: '700', fontSize: '15px', color: '#1e293b' }}>
              Text
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
            <BiXCircle size={22} />
          </button>
        </div>

        {/* Description - no border, same box as header */}
        <div style={{
          fontSize: '11px',
          color: '#64748b',
          lineHeight: '1.4',
          paddingLeft: '28px'
        }}>
          Create text templates with dynamic variables
        </div>
      </div>

      {/* Content area */}
      <div style={{ padding: '14px' }}>

        {/* Node naming input */}
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block' }}>
            <span style={{
              fontSize: '12px',
              fontWeight: '600',
              color: '#64748b',
              display: 'block',
              marginBottom: '6px'
            }}>
              Name
            </span>
            <input
              type="text"
              value={nodeName}
              onChange={(e) => setNodeName(e.target.value)}
              placeholder="Text_1"
              className="node-name-input"
              style={{
                width: '100%',
                padding: '8px 10px',
                border: `1px solid ${borderColor}`,
                borderRadius: '6px',
                fontSize: '13px',
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
        {nodeName === 'Text_1' && (
          <div style={{
            background: lightColor,
            padding: '8px 10px',
            borderRadius: '6px',
            marginBottom: '12px',
            border: `1px solid ${borderColor}`,
            display: 'flex',
            alignItems: 'flex-start',
            gap: '8px'
          }}>
            <BiBulb size={15} color={baseColor} style={{ marginTop: '1px', flexShrink: 0 }} />
            <div style={{ fontSize: '11px', lineHeight: '1.4' }}>
              <span style={{ fontWeight: '700', color: baseColor }}>Suggestion: </span>
              <span style={{ color: '#64748b' }}>Give the node a distinct name</span>
            </div>
          </div>
        )}

        {/* Textarea section */}
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block' }}>
            <span style={{
              fontSize: '12px',
              fontWeight: '600',
              color: '#64748b',
              display: 'block',
              marginBottom: '6px'
            }}>
              Text Content
            </span>
            <textarea
              ref={textareaRef}
              value={currText}
              onChange={handleTextChange}
              placeholder="Enter text with variables like {{ variableName }}"
              style={{
                width: '100%',
                minHeight: '60px',
                padding: '8px 10px',
                border: `1px solid ${borderColor}`,
                borderRadius: '6px',
                fontSize: '13px',
                outline: 'none',
                resize: 'none',
                fontFamily: 'inherit',
                lineHeight: '1.5',
                overflow: 'hidden',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = baseColor}
              onBlur={(e) => e.target.style.borderColor = borderColor}
            />
          </label>

          {/* Variable display */}
          {variables.length > 0 && (
            <div style={{
              marginTop: '10px',
              fontSize: '11px',
              color: '#64748b',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px'
            }}>
              <span style={{ fontWeight: '600' }}>Variables:</span>
              {variables.map(v => (
                <span
                  key={v}
                  style={{
                    background: lightColor,
                    color: baseColor,
                    padding: '3px 8px',
                    borderRadius: '4px',
                    fontWeight: '600'
                  }}
                >
                  {v}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
