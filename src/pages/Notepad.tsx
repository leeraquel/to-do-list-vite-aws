import { useState, useEffect, useRef } from "react";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";

function Notepad() {
  const [notes, setNotes] = useState<string>("");
  const [savedNotes, setSavedNotes] = useState<string[]>([]);
  const [title, setTitle] = useState<string>("");
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });
  const [isEscaping, setIsEscaping] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 로컬 스토리지에서 메모 불러오기
  useEffect(() => {
    const savedData = localStorage.getItem("notepadData");
    if (savedData) {
      setSavedNotes(JSON.parse(savedData));
    }
  }, []);

  // 로컬 스토리지에 메모 저장
  const saveNote = () => {
    if (notes.trim() && title.trim()) {
      const newNote = `${title}: ${notes}`;
      const updatedNotes = [...savedNotes, newNote];
      setSavedNotes(updatedNotes);
      localStorage.setItem("notepadData", JSON.stringify(updatedNotes));
      setNotes("");
      setTitle("");
      setIsEscaping(false);
    }
  };

  // 메모 삭제
  const deleteNote = (index: number) => {
    const updatedNotes = savedNotes.filter((_, i) => i !== index);
    setSavedNotes(updatedNotes);
    localStorage.setItem("notepadData", JSON.stringify(updatedNotes));
  };

  const escapeFromMouse = () => {
    if (!containerRef.current || isEscaping) return;

    setIsEscaping(true);

    const containerRect = containerRef.current.getBoundingClientRect();
    const buttonWidth = 100;
    // const buttonHeight = 40;

    const maxLeft = containerRect.width - buttonWidth - 20;
    const maxTop = 300;

    const randomLeft = Math.floor(Math.random() * maxLeft);
    const randomTop = Math.floor(Math.random() * maxTop);

    setButtonPosition({ top: randomTop, left: randomLeft });

    setTimeout(() => {
      setIsEscaping(false);
    }, 300);
  };

  return (
    <div
      ref={containerRef}
      className="p-5 max-w-2xl mx-auto relative min-h-[600px]"
    >
      <h1 className="text-gray-800 border-b-2 border-gray-200 pb-2">메모장</h1>

      <div className="mb-5">
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요"
          className="w-full p-2 mb-2 rounded border border-gray-300"
        />
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="내용을 입력하세요"
          className="w-full h-40 p-2 rounded border border-gray-300 resize-y"
        />
        <Button
          onClick={saveNote}
          variant="default"
          onMouseEnter={escapeFromMouse}
          className={`bg-green-500 text-white p-2 mt-2 rounded`}
          style={{
            top: isEscaping ? buttonPosition.top : "auto",
            left: isEscaping ? buttonPosition.left : "auto",
          }}
        >
          저장하기
        </Button>
      </div>

      <div>
        <h2 className="text-gray-600 border-b border-gray-200 pb-1">
          저장된 메모
        </h2>
        {savedNotes.length === 0 ? (
          <p className="text-gray-500">저장된 메모가 없습니다.</p>
        ) : (
          <ul className="list-none p-0">
            {savedNotes.map((note, index) => (
              <li
                key={index}
                className="p-4 bg-gray-100 mb-2 rounded shadow-sm flex justify-between"
              >
                <span>{note}</span>
                <Button
                  onClick={() => deleteNote(index)}
                  className="bg-red-500 text-white p-1 rounded"
                >
                  삭제
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Notepad;
