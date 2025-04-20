import { useState, useEffect, useRef } from 'react';

function Notepad() {
    const [notes, setNotes] = useState<string>('');
    const [savedNotes, setSavedNotes] = useState<string[]>([]);
    const [title, setTitle] = useState<string>('');
    const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });
    const [isEscaping, setIsEscaping] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // 로컬 스토리지에서 메모 불러오기
    useEffect(() => {
        const savedData = localStorage.getItem('notepadData');
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
            localStorage.setItem('notepadData', JSON.stringify(updatedNotes));
            setNotes('');
            setTitle('');
            setIsEscaping(false);
        }
    };

    // 메모 삭제
    const deleteNote = (index: number) => {
        const updatedNotes = savedNotes.filter((_, i) => i !== index);
        setSavedNotes(updatedNotes);
        localStorage.setItem('notepadData', JSON.stringify(updatedNotes));
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
            style={{ 
                padding: '20px', 
                maxWidth: '800px', 
                margin: '0 auto',
                position: 'relative',
                minHeight: '600px'
            }}
        >
            <h1 style={{ color: '#333', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>메모장</h1>
            
            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="제목을 입력하세요"
                    style={{ 
                        width: '100%', 
                        padding: '10px', 
                        marginBottom: '10px',
                        borderRadius: '4px',
                        border: '1px solid #ddd' 
                    }}
                />
                <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="내용을 입력하세요"
                    style={{ 
                        width: '100%', 
                        height: '150px', 
                        padding: '10px',
                        borderRadius: '4px',
                        border: '1px solid #ddd',
                        resize: 'vertical'
                    }}
                />
                <button 
                    onClick={saveNote}
                    onMouseEnter={escapeFromMouse}
                    style={{
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        padding: '10px 15px',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        marginTop: '10px',
                        position: isEscaping ? 'absolute' : 'relative',
                        top: isEscaping ? buttonPosition.top : 'auto',
                        left: isEscaping ? buttonPosition.left : 'auto',
                        transition: 'all 0.2s ease-out',
                        zIndex: 100
                    }}
                >
                    저장하기
                </button>
            </div>

            <div>
                <h2 style={{ color: '#555', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>저장된 메모</h2>
                {savedNotes.length === 0 ? (
                    <p style={{ color: '#888' }}>저장된 메모가 없습니다.</p>
                ) : (
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {savedNotes.map((note, index) => (
                            <li 
                                key={index}
                                style={{ 
                                    padding: '15px', 
                                    backgroundColor: '#f9f9f9', 
                                    margin: '10px 0',
                                    borderRadius: '4px',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <span>{note}</span>
                                <button 
                                    onClick={() => deleteNote(index)}
                                    style={{
                                        backgroundColor: '#f44336',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        padding: '5px 10px'
                                    }}
                                >
                                    삭제
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default Notepad; 