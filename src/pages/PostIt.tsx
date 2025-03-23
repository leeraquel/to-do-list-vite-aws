import React, { useState } from 'react';

interface PostItProps {
  initialText?: string;
  color?: string;
}

const PostIt: React.FC<PostItProps> = ({ initialText = '', color = '#FFEB3B' }) => {
  const [text, setText] = useState(initialText);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: '200px',
        height: '200px',
        backgroundColor: color,
        padding: '15px',
        boxShadow: '2px 2px 8px rgba(0, 0, 0, 0.3)',
        cursor: isDragging ? 'grabbing' : 'grab',
        transform: 'rotate(-1deg)',
        fontFamily: '"Comic Sans MS", cursive, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1000
      }}
    >
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="메모를 입력하세요..."
        style={{
          flex: 1,
          background: 'transparent',
          border: 'none',
          outline: 'none',
          resize: 'none',
          fontSize: '16px',
          fontFamily: 'inherit',
          color: '#333'
        }}
      />
      <div
        style={{
          fontSize: '10px',
          textAlign: 'right',
          opacity: 0.7,
          marginTop: '5px'
        }}
      >
        {new Date().toLocaleDateString()}
      </div>
    </div>
  );
};

export default PostIt;
