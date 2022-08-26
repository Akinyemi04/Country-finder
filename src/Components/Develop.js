import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import { develop } from '../store'

const Develop = (props) => {
    const dispatch = useDispatch()
    const {id} = useParams()
    const native = useSelector((val)=>{
      return(val.Develop.native)
    })
    const currency = useSelector((val)=>{
      return(val.Develop.currency)
    })
    const background = useSelector((val)=>{return val.Home.background_home})
    const text = useSelector((val)=>{return val.Home.text})
    const shadow = useSelector((val)=>{return val.Home.develop_shadow})
  return (
    <div className='Develop' style={{backgroundColor:background}}>
      <aside className='side'>
      <NavLink to='/' className='button' style={{color:text,backgroundColor:background,boxShadow:shadow}}>
      <FontAwesomeIcon icon={faArrowLeft} />
        <span>Back</span>
      </NavLink>
        { props.data !== null &&
          props.data[0].map((val,index)=>{
            if(id === val.name.common){
              const data = Object.keys(val.name.nativeName)
              console.log(data[0])
              dispatch(develop.fill(data[0]))
              const full =Object.keys(val.currencies)
              dispatch(develop.full(full[0]))
              console.log(val)
              return(
                <div key={index}>
                  <main key={index}>
                    <img src={val.flags.png} alt="bad internet" />
                    <section>
                      <h3 style={{color:text}}>{val.name.common}</h3>
                      <p style={{color:text}}>Native name : <span>{val.name.nativeName[native].common}</span></p>
                      <p style={{color:text}}>Population: <span>{val.population}</span></p>
                      <p style={{color:text}}>Region:  <span>{val.region}</span></p>
                      <p style={{color:text}}>Sub Region :  <span>{val.subregion}</span></p>
                      <p style={{color:text}}>capital: <span>{val.capital}</span></p>
                      <footer style={{color:text}}>
                        { val.borders &&<>
                        Border Countries : {
                          val.borders.map((val,index)=>{
                            return(
                              <span style={{color:text,boxShadow:shadow}} key={index}>{val}</span>
                            )
                          })
                        }
                        </>
                    }
                    
                  </footer>
                    </section>
                    <aside>
                      <p style={{color:text}}>  Top Level Domain : <span>{val.tld}</span></p>
                      <p style={{color:text}}>Currencies : <span>{val.currencies[currency].name}</span></p>
                      <p style={{color:text}}>languages : <span>{val.languages.spa}</span></p>
                    </aside>
                  </main>
                  
                </div>
              )
            }
            else{
              
            }
          })
        }
      </aside>
    </div>
  )
}

export default Develop