import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {useRoutes} from "react-router-dom";
import {routes as r} from "./router";

function App() {
  const [count, setCount] = useState(0)
  const routes = useRoutes(r.authorized);
  return (
    <>
        {routes}
    </>
  )
}

export default App
