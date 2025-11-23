import { BrowserRouter } from "react-router-dom"
import Body from "./Components/Layouts/Body"
import Header from "./Components/Layouts/Header"
function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <Body />
      </BrowserRouter>

    </>
  )
}

export default App
