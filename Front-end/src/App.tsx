import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import { AppProvider } from './context/AppContext';


function App() {
  return (
    <div>
      <AppProvider>
        <Header />
        <Outlet />
      </AppProvider>
    </div>
  )
}

export default App
