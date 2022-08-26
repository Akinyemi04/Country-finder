import {configureStore, createSlice} from '@reduxjs/toolkit'
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { faMoon } from '@fortawesome/free-regular-svg-icons';
const homeSlice= createSlice({
    name:'Home',
    initialState:{
    data:null,
    mode:'Dark mode',
    logo:faMoon,
    color:'white',
    country_color:'white',
    box_shadow:'1px 1px 16px rgb(172, 165, 165)',
    develop_shadow:'1px 2px 5px grey',
    text:'black',
    background_home:'rgb(173, 166, 166,0.05)'
    },
    reducers:{
        fill(state,action){
            return{
                ...state,
                data:[action.payload]
            }
        },
        change(state){
            if(state.color === 'white'){
            return{
                ...state,
                logo:faSun,
                color:'rgb(23, 25, 28,0.84)',
                country_color:'rgb(43, 45, 48,0.64)',
                text:'white',
                mode:'Light mode',
                box_shadow:'1px 1px 16px rgb(23, 25, 28)',
                background_home:'rgb(23, 25, 28)',
                develop_shadow:'1px 2px 5px rgb(92, 97, 93)'
            }
           
        }
            else{
                return{
                    ...state,
                    logo:faMoon,
                    color:'white',
                    country_color:'white',
                    text:'black',
                    mode:'Dark mode',
                    box_shadow:'1px 1px 16px rgb(172, 165, 165)',
                    background_home:'rgb(173, 166, 166,0.05)',
                    develop_shadow:'1px 2px 5px grey',
                }
            }
        }
    }
})
const indexSlice= createSlice({
    name:'index',
    initialState:{
        search:null,
        region:null,
        display:'none',
        error:true,
        vsearch:null
        
    },
    reducers:{
        change(state,action){
            return{
                ...state,
                region:action.payload,
                search: null
                
            }
        },
        display(state){
            if(state.display ==='none'){
               return{ ...state,
                display:'flex'
            }
            }
            else{
                return{
                    ...state,
                    display:'none'
                }
            }
        },
        search(state,action){
            return{
                ...state,
                region:'morocco',
                search:action.payload
            }
        },
        errorFix(state){
            return{
                ...state,
                error:false
            }
        },
        dchange(state,action){
            return{
                ...state,
                vsearch:action.payload

            }
        },
        error(state){
            return{
                ...state,
                error:true
            }
        }

    }
})
const DevelopSlice = createSlice({
    name:'Develop',
    initialState:{
        native:null,
        currency:null,
        language:null
    },
    reducers:{
        fill(state,action){
            return{
                ...state,
                native:action.payload
            }
        },
        full(state,action){
            return{
                ...state,
                currency:action.payload
            }
        },
        language(state,action){
            console.log(action.payload)
            return{
                ...state,
                language:action.payload
            }
        }
    }
})
export const Haction =homeSlice.actions
export const indexer= indexSlice.actions
export const develop = DevelopSlice.actions
const store = configureStore({reducer:{
    Home: homeSlice.reducer,
    index:indexSlice.reducer,
    Develop:DevelopSlice.reducer
}})
export default store