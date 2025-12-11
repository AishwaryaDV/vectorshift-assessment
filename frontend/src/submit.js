// submit.js

import { BiRocket } from 'react-icons/bi';
import { useStore } from './store';

export const SubmitButton = ({ showToast }) => {
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);

    const isDisabled = !nodes || nodes.length === 0;

    const handleSubmit = async () => {
        try {
            // Send nodes and edges to backend
            const response = await fetch('http://127.0.0.1:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) {
                throw new Error('Failed to connect to backend');
            }

            const data = await response.json();

            // Build toast message without icons
            const message = `Pipeline Analysis Results:\n\n` +
                `Nodes: ${data.num_nodes}\n` +
                `Edges: ${data.num_edges}\n` +
                `DAG Status: ${data.is_dag ? 'Valid' : 'Invalid (contains cycles)'}\n\n` +
                `${data.is_dag ? 'Your pipeline has no circular dependencies!' : 'Warning: Your pipeline contains cycles!'}`;

            // Show success or warning toast based on DAG status
            showToast(message, data.is_dag ? 'success' : 'warning', 10000);
        } catch (error) {
            showToast(`Error: ${error.message}`, 'error');
        }
    };

    return (
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={isDisabled}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 20px',
            fontSize: '14px',
            fontWeight: '600',
            color: isDisabled ? '#cbd5e1' : '#667eea',
            background: 'transparent',
            border: `2px solid ${isDisabled ? '#cbd5e1' : '#667eea'}`,
            borderRadius: '8px',
            cursor: isDisabled ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            fontFamily: 'inherit',
            opacity: isDisabled ? 0.5 : 1
          }}
          onMouseEnter={(e) => {
            if (!isDisabled) {
              e.currentTarget.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 10px rgba(102, 126, 234, 0.3)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isDisabled) {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#667eea';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }
          }}
        >
          <BiRocket size={18} />
          Submit
        </button>
    );
}
