import { useState } from 'react'
import dog from '../assets/cuteDog.jpeg'

function Home() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Mala Project test</h1>
      <img src={dog} alt="cute dog" />
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
