import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import {NavLink} from 'react-router-dom'
import { faAngleDown} from '@fortawesome/free-solid-svg-icons'
import { indexer } from '../store'
import { useDispatch, useSelector } from 'react-redux'


const Home = (props) => {
  const dispatch = useDispatch()
  const region = useSelector((val)=>{return val.index.region})
  //const background = useSelector((val)=>{return val.Home.color})
  const shadow =useSelector((val)=>{return val.Home.box_shadow})
  const big_background=useSelector((val)=>{return val.Home.background_home})
  const country_bg =useSelector((val)=>{return val.Home.country_color})
  const text =useSelector((val)=>{return val.Home.text})
  const data = useSelector((val)=>{
    if(val.Home.data !== null){
    return val.Home.data[0]}
  })
  const flex=  useSelector((val)=>{return val.index.display})
  const searching =  useSelector((val)=>{return val.index.search})
  const error = useSelector((val)=>{return val.index.error})
  function navigate(e){
    const key = e.target
    const action = key.dataset.action
    switch(action){
      case'Africa':
        dispatch(indexer.change('Africa'))
        break;
        case'America':
        dispatch(indexer.change('Americas'))
        break;
        case'Asia':
        dispatch(indexer.change('Asia'))
        break;
        case'Europe':
        dispatch(indexer.change('Europe'))
        break;
        case'Oceania':
        dispatch(indexer.change('Oceania'))
        break;
        default:
          break;
    }
  }

  function Display(){
    if(region === null && searching ===null){
      return(
          <main>
            {data.map((value,index)=>{
              return(
              <NavLink to={`/${value.region}/${value.name.common}`} key={index} className='country' style={{backgroundColor:country_bg,boxShadow:shadow}}>
                  <img src={value.flags.png} alt="check connection" /> 
                  <section style={{backgroundColor:country_bg}}>
                    <h2 style={{color:text}}> {value.name.common}</h2>
                    <p style={{color:text}}>Population : <span>{value.population}</span></p>
                    <p style={{color:text}}>Region: <span>{value.region}</span></p>
                    <p style={{color:text}}>Capital:<span> {value.capital}</span></p>
                  </section>
              </NavLink>
            )})}
          </main>
      )
    }
    else if (region !== null && searching ===null){
      return(
        <main>{
          data.map((value,index)=>{
            if(value.region === region){
              return(
                <NavLink to={`/${value.region}/${value.name.common}`} key={index} className='country' style={{backgroundColor:country_bg,boxShadow:shadow}}>
                <img src={value.flags.png} alt="check connection" /> 
                <section style={{backgroundColor:country_bg}}>
                  <h2 style={{color:text}}> {value.name.common}</h2>
                  <p style={{color:text}}>Population : <span>{value.population}</span></p>
                  <p style={{color:text}}>Region: <span>{value.region}</span></p>
                  <p style={{color:text}}>Capital:<span> {value.capital}</span></p>
                </section>
            </NavLink>
              )
            }
            else{
              return(<span key={index} style={{display:'none'}}>Gold</span>)
            }
          })
        }
        </main>
      )
    }
    else{
      return(
        <main>{
          data.map((value,index)=>{
            //console.log('timer')
            if(value.name.common === searching){
              dispatch(indexer.errorFix())
              return(
                <NavLink to={`/${value.region}/${value.name.common}`} key={index} className='country' style={{backgroundColor:country_bg,boxShadow:shadow}}>
                <img src={value.flags.png} alt="check connection" /> 
                <section style={{backgroundColor:country_bg}}>
                  <h2 style={{color:text}}> {value.name.common}</h2>
                  <p style={{color:text}}>Population : <span>{value.population}</span></p>
                  <p style={{color:text}}>Region: <span>{value.region}</span></p>
                  <p style={{color:text}}>Capital:<span> {value.capital}</span></p>
                </section>
            </NavLink>
              )
            }
            else{
              return(<span key={index} style={{display:'none'}}>Gold</span>)
            }
            
          })
        }
        {error && 
        <div className='error'>
          <p style={{color:text}}>Can't Find {searching} perhaps: </p>
          <ul>
            <li style={{color:text}}>Try Starting Your Search With A Capital Letter</li>
            <li style={{color:text}}>Check For Excessive Space In Your Search</li>
            <li style={{color:text}}>If Your Search Must Have Spacing You Can Try Searching With Uppercase Starting Both Words </li>
            <li style={{color:text}}>example Ivory Coast</li>
            <li style={{color:text}}>Errors Such As This May Occur Again When Searching Causing The Screen To Go  Blank <br />
            ReCheck Your Spellings And It will Come Up
            </li>
            
          </ul>
        </div>}
        </main>
      )
     
    }
  }
  return (
    <div className="home" style={{backgroundColor:big_background}}>
      <main>
      <header>
        <div style={{backgroundColor:country_bg,color:text}}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <input onKeyDown={(e)=>{
            if (e.code === 'Enter'){
              console.log(e.target.value)
              dispatch(indexer.search(e.target.value))
            } ;
        }} style={{backgroundColor:country_bg,color:text}}  className='find' type="text" placeholder='Search For A Country' />
        </div>
        <aside className='aside'>
          <p onClick={()=>{
            dispatch(indexer.display())
          }}style={{backgroundColor:country_bg,color:text}}>Search By Region  <FontAwesomeIcon icon={faAngleDown}/></p>
          <ul style={{backgroundColor:country_bg,color:text,display:flex}} onClick={navigate}>
            <li data-action='Africa'>Africa</li>
            <li data-action='America'>America</li>
            <li data-action='Asia'>Asia</li>
            <li data-action='Europe'>Europe</li>
            <li data-action='Oceania'>Oceania</li>
          </ul>
        </aside>
      </header>
       {data   && Display()}
       {props.state &&
        <div className='pending'>
          <p>Loading... Please Wait</p>
        </div>
       }
       </main>
    </div>
  );
}

export default Home;