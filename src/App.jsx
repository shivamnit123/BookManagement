import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Form from './components/formComponent/Form'
import FetchBooks from './components/FetchData/FetchBooks'
import UpdateBooks from './components/updateComponent/UpdateBooks'

function App() {

  return (
       <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/books" element={<FetchBooks />} />
        <Route path="/edit-book" element={<UpdateBooks/>}/>
      </Routes>
    </Router>

  )
  
}

export default App
