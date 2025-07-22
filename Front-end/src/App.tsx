import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import { AppProvider } from './context/AppContext';
// import Message from './components/Message';


function App() {
  return (
    <div>
      <AppProvider>
        <Header />
        {/* <Message /> */}
        <Outlet />
      </AppProvider>
    </div>
  )
}

export default App
