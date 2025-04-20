import { useState, useEffect } from 'react'
import dog from '../assets/cuteDog.jpeg'

function Home() {
  const [count, setCount] = useState(0)
  const [imageSize, setImageSize] = useState(100) 
  const [displaySize, setDisplaySize] = useState(100)
  const [sliderValue, setSliderValue] = useState(100)
  
  // 슬라이더 값 변경 핸들러
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    setSliderValue(value)
    
    // 이미지 크기 설정
    const reversedSize = 210 - value
    setImageSize(reversedSize)
    
    setDisplaySize(value)
  }
  
  // 이미지 크기 변경
  useEffect(() => {
    const randomInterval = setInterval(() => {
      if (Math.random() < 0.1) {
        const randomSize = Math.floor(Math.random() * 150) + 50
        setImageSize(randomSize)
      }
    }, 2000)
    
    return () => clearInterval(randomInterval)
  }, [])
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (Math.random() < 0.3) {
        setImageSize(prev => Math.max(10, Math.min(200, prev + (Math.random() > 0.5 ? 10 : -10))))
      }
    }, 500)
    
    return () => clearTimeout(timeout)
  }, [sliderValue])

  return (
    <>
      <h1 style={{ color: 'pink' }}>Mara Project test with cimaron</h1>
      
      {/* 이미지 크기 조절 컨트롤 */}
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="image-size">이미지 크기 조절: {displaySize}% {imageSize !== displaySize && "(실제: ???%)"}</label>
        <input 
          id="image-size"
          type="range" 
          min="10" 
          max="200" 
          value={sliderValue} 
          onChange={handleSliderChange}
          style={{ 
            width: '300px', 
            display: 'block', 
            margin: '10px 0',
            transform: 'scaleX(-1)'
          }}
        />
        <small style={{ color: 'gray' }}>← 작게 | 크게 →</small>
      </div>
      
      <img 
        src={dog} 
        alt="cute dog" 
        style={{ 
          width: `${imageSize}%`, 
          maxWidth: '800px',
          transition: 'width 0.8s cubic-bezier(0.68, -0.55, 0.27, 1.55)',
          transform: imageSize > 150 ? 'rotate(180deg)' : 'none',
        }} 
      />
      
      <br/>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <button onClick={() => setCount(0)}>Reset</button>
      <p>Count: {count}</p>
      <h4>어서오십시오. 첫 AWS 웹 서버 호스팅 완료! with cimaron!</h4>
    </>
  )
}

export default Home
