import { useContext } from "react"
import { CounterContext } from "../context/counterContext"

export const Counter = () => {
    const { counter, increment, decrement, reset } = useContext(CounterContext)
    return (
        <>
            <h1>Counter: {counter}</h1>
            <div>
                <button onClick={increment}>INCREMENT</button>
                <button onClick={decrement}>DECREMENT</button>
                <button onClick={reset}>RESET</button>
            </div>
        </>
    )
}