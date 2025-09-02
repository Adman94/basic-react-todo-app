import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../styles/Counter.css";
import {
  increment,
  decrement,
  incrementByAmount,
  decrementByAmount,
  multiplyByAmount,
  divideByAmount,
  reset,
} from "./counterSlice";

const Counter = () => {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState(0);
  const addValue = Number(incrementAmount) || 0;

  const resetAll = () => {
    setIncrementAmount(0);
    dispatch(reset());
  };

  return (
    <section>
      <p>Basic Redux Counter</p>
      <p>{count}</p>
      <div>
        <div className="addRemove">
          <button onClick={() => dispatch(increment())}>+ 1</button>
          <button onClick={() => dispatch(decrement())}>- 1</button>
        </div>
        <div>
          <input
            value={incrementAmount}
            onChange={(e) => setIncrementAmount(e.target.value)}
            type="text"
          />
        </div>
        <div className="byAmounts">
          <button onClick={() => dispatch(incrementByAmount(addValue))}>
            Add Amount
          </button>
          <button onClick={() => dispatch(decrementByAmount(addValue))}>
            Remove Amount
          </button>
          <button onClick={() => dispatch(multiplyByAmount(addValue))}>
            Multiply Amount
          </button>
          <button onClick={() => dispatch(divideByAmount(addValue))}>
            Divide Amount
          </button>
        </div>
        <button className="resetAll" onClick={resetAll}>
          reset
        </button>
      </div>
    </section>
  );
};

export default Counter;
