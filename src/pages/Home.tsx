import { useState, useEffect } from "react";
import dog from "../assets/cuteDog.jpeg";
import { Slider } from "../components/ui/slider";
import { Button } from "../components/ui/button";

function Home() {
  const [count, setCount] = useState(0);
  const [imageSize, setImageSize] = useState(100);
  const [displaySize, setDisplaySize] = useState(100);
  const [sliderValue, setSliderValue] = useState(100);

  // 슬라이더 값 변경 핸들러
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setSliderValue(value);

    // 이미지 크기 설정
    const reversedSize = 210 - value;
    setImageSize(reversedSize);

    setDisplaySize(value);
  };

  // 이미지 크기 변경
  useEffect(() => {
    const randomInterval = setInterval(() => {
      if (Math.random() < 0.1) {
        const randomSize = Math.floor(Math.random() * 150) + 50;
        setImageSize(randomSize);
      }
    }, 2000);

    return () => clearInterval(randomInterval);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (Math.random() < 0.3) {
        setImageSize((prev) =>
          Math.max(10, Math.min(200, prev + (Math.random() > 0.5 ? 10 : -10)))
        );
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [sliderValue]);

  return (
    <>
      <h1 className="text-pink-500">Mara Project test with cimaron</h1>

      <div className="mb-4">
        <label htmlFor="image-size" className="block text-gray-700">
          이미지 크기 조절: {displaySize}%{" "}
          {imageSize !== displaySize && "(실제: ???%)"}
        </label>
        <Slider
          id="image-size"
          min={10}
          max={200}
          value={[sliderValue]}
          onChange={handleSliderChange}
          className="w-full mt-2"
        />
        <small className="text-gray-500">← 작게 | 크게 →</small>
      </div>

      <img
        src={dog}
        alt="cute dog"
        className={`w-${imageSize} max-w-2xl transition-transform duration-800 ease-in-out transform ${
          imageSize > 150 ? "rotate-180" : ""
        }`}
      />

      <div className="mt-4">
        <Button onClick={() => setCount(count + 1)}>+1</Button>
        <Button onClick={() => setCount(count - 1)}>-1</Button>
        <Button onClick={() => setCount(0)}>Reset</Button>
      </div>
      <p>Count: {count}</p>
      <h4>어서오십시오. 첫 AWS 웹 서버 호스팅 완료! with cimaron!</h4>
    </>
  );
}

export default Home;
