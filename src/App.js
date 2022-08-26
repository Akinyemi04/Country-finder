import './App.css';
import {useSelector,useDispatch} from 'react-redux'
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import { Haction } from './store';
import Develop from './Components/Develop';
import Home from './Components/Home';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useFetch from './Components/useFetch';
import { useEffect } from 'react';

function App() {
  const[value,ispending,error]=useFetch('https://restcountries.com/v3.1/all')
  const dispatch= useDispatch()
  useEffect(()=>{
    if(value){
    dispatch(Haction.fill(value))
  }
  },[value,dispatch])
  const data  = useSelector((val)=>{return val.Home.data} )
  const mode = useSelector((val)=>{
    return val.Home.mode
  })
  const logo = useSelector((val)=>{return val.Home.logo})
  const style= useSelector((val)=>{return val.Home.color})
  const text = useSelector((val)=>{return val.Home.text})
  const shadow=useSelector((val)=>{return val.Home.box_shadow})
  return (
    <BrowserRouter>
      <div className="App" >
        <header className='header'style={{backgroundColor:style,boxShadow:shadow}}>
          <h1 style={{color:text}} className='h1'>Where in the World ?</h1>
          <aside className='switcher' onClick={()=>{
            dispatch(Haction.change())
          }}>
            
            <p style={{color:text}}> <FontAwesomeIcon icon={logo} /> {mode}</p>
          </aside>
        
        </header>
        <span style={{display:'none'}}>{error}</span>
      <Routes>
        <Route exact path='/' element={<Home state={ispending}/>}></Route>
        <Route path='/:continent/:id' element={<Develop data={data}/>}></Route>
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
