import { useState } from 'react'
import './App.css'
import { createContext } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { Payment } from './Payment';

export const ALL_DATA = createContext(null);

function App() {

  const [amount, setAmount] = useState('');
  const navigate = useNavigate();
  return (
    <ALL_DATA.Provider value={{ amount, setAmount }}>
      <Routes>
        <Route path="*" element={<Navigate to="/donate" replace />} />
        <Route path="donate" element={ <Payment/> } />
      </Routes>
    </ALL_DATA.Provider>
  )
}

export default App
