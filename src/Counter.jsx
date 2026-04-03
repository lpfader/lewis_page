import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <h2>Counter: {count}</h2>
      <button onClick={handleClick}>Increase</button>
    </div>
  );
}

export default Counter;