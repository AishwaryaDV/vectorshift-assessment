// draggableNode.js

export const DraggableNode = ({ type, label, icon: Icon, color }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };

    return (
      <div
        className={type}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        style={{
          cursor: 'grab',
          minWidth: '70px',
          width: '70px',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          borderRadius: '8px',
          backgroundColor: 'white',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '4px',
          padding: '8px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.08)',
          transition: 'transform 0.2s, box-shadow 0.2s',
          border: `2px solid ${color || '#6366f1'}`
        }}
        draggable
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.12)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.08)';
        }}
      >
          {Icon && <Icon size={20} color={color || '#6366f1'} />}
          <span style={{
            color: '#000',
            fontSize: '10px',
            fontWeight: '600',
            textAlign: 'center',
            userSelect: 'none'
          }}>
            {label}
          </span>
      </div>
    );
  };
  