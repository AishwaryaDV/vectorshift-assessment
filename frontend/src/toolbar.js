// toolbar.js

import { useState } from 'react';
import { DraggableNode } from './draggableNode';
import { SubmitButton } from './submit';
import {
  BiImport,
  BiBrain,
  BiExport,
  BiText,
  BiFilterAlt,
  BiHash,
  BiGitBranch,
  BiTransfer,
  BiMerge
} from 'react-icons/bi';

export const PipelineToolbar = ({ showToast }) => {
    const [activeTab, setActiveTab] = useState('general');

    const tabs = [
      { id: 'general', label: 'General' },
      { id: 'llm', label: 'LLM' },
      { id: 'custom', label: 'Custom' }
    ];

    const nodesByTab = {
      general: [
        { type: 'customInput', label: 'Input', icon: BiImport, color: '#6366f1' },
        { type: 'text', label: 'Text', icon: BiText, color: '#6366f1' },
        { type: 'customOutput', label: 'Output', icon: BiExport, color: '#6366f1' }
      ],
      llm: [
        { type: 'llm', label: 'LLM', icon: BiBrain, color: '#6366f1' }
      ],
      custom: [
        { type: 'filter', label: 'Filter', icon: BiFilterAlt, color: '#6366f1' },
        { type: 'number', label: 'Number', icon: BiHash, color: '#6366f1' },
        { type: 'conditional', label: 'Conditional', icon: BiGitBranch, color: '#6366f1' },
        { type: 'transform', label: 'Transform', icon: BiTransfer, color: '#6366f1' },
        { type: 'merge', label: 'Merge', icon: BiMerge, color: '#6366f1' }
      ]
    };

    return (
        <div style={{
          padding: '12px 20px',
          background: '#f8fafc',
          borderBottom: '2px solid #e2e8f0',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
        }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '10px'
            }}>
              <h2 style={{
                color: '#000',
                margin: '0',
                fontSize: '16px',
                fontWeight: '700'
              }}>
                Node Palette
              </h2>
              <SubmitButton showToast={showToast} />
            </div>

            {/* Tabs */}
            <div style={{
              display: 'flex',
              gap: '8px',
              marginBottom: '12px'
            }}>
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '6px 16px',
                    fontSize: '13px',
                    fontWeight: '600',
                    color: activeTab === tab.id ? '#000' : '#64748b',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: activeTab === tab.id ? '2px solid #000' : '2px solid transparent',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    marginBottom: '-2px'
                  }}
                  onMouseEnter={(e) => {
                    if (activeTab !== tab.id) {
                      e.target.style.color = '#000';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== tab.id) {
                      e.target.style.color = '#64748b';
                    }
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Node Grid */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              justifyContent: 'flex-start',
              minHeight: '70px'
            }}>
              {nodesByTab[activeTab].map(node => (
                <DraggableNode
                  key={node.type}
                  type={node.type}
                  label={node.label}
                  icon={node.icon}
                  color={node.color}
                />
              ))}
            </div>
        </div>
    );
};
