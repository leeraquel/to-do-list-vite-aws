import React, { useState } from "react";
import { Textarea } from "../components/ui/textarea";

interface PostItProps {
  initialText?: string;
  color?: string;
}

const PostIt: React.FC<PostItProps> = ({ initialText = "" }) => {
  const [text, setText] = useState(initialText);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
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
      className={`absolute w-52 h-52 bg-yellow-300 p-4 shadow-lg cursor-${
        isDragging ? "grabbing" : "grab"
      } transform rotate-[-1deg] font-comic flex flex-col z-50`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="메모를 입력하세요..."
        className="flex-1 bg-transparent border-none outline-none resize-none text-lg font-inherit text-gray-800"
      />
      <div className="text-xs text-right opacity-70 mt-1">
        {new Date().toLocaleDateString()}
      </div>
    </div>
  );
};

export default PostIt;
