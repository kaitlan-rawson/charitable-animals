import axios from 'axios'

//--------State--------//
const initialState = {
    animals: [],
    user: null,
    subscribedAnimals: [],
    favAnimals: []
}

//--------Action Creators--------//
const SET_USER = 'SET_USER'
const GET_MAIN_ANIMALS = 'GET_MAIN_ANIMALS'
const GET_ALL_ANIMALS = 'GET_ALL_ANIMALS'
const GET_ENDANGERED_ANIMALS = 'GET_ENDANGERED_ANIMALS'
const GET_EXTINCT_ANIMALS = 'GET_EXTINCT_ANIMALS'
const CHECK_SUBSCRIBED_ANIMALS = 'CHECK_SUBSCRIBED_ANIMALS'
const CHECK_USER_SUBSCRIBED_ANIMALS = 'CHECK_USER_SUBSCRIBED_ANIMALS'
const GET_FAV_ANIMALS = 'GET_FAV_ANIMALS'
const UNSUBSCRIBE = 'UNSUBSCRIBE'
const ADD_FAV_ANIMAL = 'ADD_FAV_ANIMAL'

//--------Functions--------//
export function setUser(val){
    return {
        type: SET_USER,
        payload: val
    }
}

export function getMainAnimals(){
    return {
        type: GET_MAIN_ANIMALS,
        payload: axios.get('/api/main/animals')
        .then(resp=>{
            return resp.data
        })
    }
}
 
export function getAllAnimals(){
    return {
        type: GET_ALL_ANIMALS,
        payload: axios.get('/api/all/animals')
        .then(resp=>{
            return resp.data
        })
    }
}

export function getEndangeredAnimals(){
    return {
        type: GET_ENDANGERED_ANIMALS,
        payload: axios.get('/api/endangered/animals')
        .then(resp=>{
            return resp.data
        })
    }
}

export function getExtinctAnimals(val){
    return {
        type: GET_EXTINCT_ANIMALS,
        payload: axios.get('/api/extinct/animals')
        .then(resp=>{
            return resp.data
        })
    }
}

export function checkSubscribedAnimals(){
    return {
        type: CHECK_SUBSCRIBED_ANIMALS,
        payload: axios.get('/api/user/subscribed')
        .then(resp=>{
            return resp.data
        })
    }
}

export function addFavAnimal(id){
    return {
        type: ADD_FAV_ANIMAL,
        payload: axios.post('/api/animal/subscribe', {animalID: id})
        .then(resp=>{
            return resp.data
        })
    }
}

export function checkUserSubscribedAnimals(){
    return {
        type: CHECK_USER_SUBSCRIBED_ANIMALS,
        payload: axios.get('/api/user/subscribed')
        .then(resp => {
           return resp.data 
        })
    }
}

export function getFavAnimals(){
    return {
        type: GET_FAV_ANIMALS,
        payload: axios.get('/api/favAnimals')
        .then(resp => {
            return resp.data
        })
    }
}

export function unsubscribe(id){
    return {
        type: UNSUBSCRIBE,
        payload: axios.delete(`/api/delete/favAnimals/${id}`)
        .then(resp => {
            return resp.data
        })
    }
}


//--------Reducer--------//
export default function reducer(state=initialState,action){
    switch(action.type){
        case SET_USER:
            return Object.assign({}, state, {user: action.payload})
        case GET_MAIN_ANIMALS + '_FULFILLED':
            return Object.assign({}, state,{animals: action.payload})
        case GET_ALL_ANIMALS + '_FULFILLED':
            return Object.assign({}, state,{animals: action.payload})
        case GET_ENDANGERED_ANIMALS + '_FULFILLED':
            return Object.assign({}, state,{animals: action.payload})
        case GET_EXTINCT_ANIMALS + '_FULFILLED':
            return Object.assign({}, state,{animals: action.payload})
        case CHECK_SUBSCRIBED_ANIMALS + '_FULFILLED':
            return Object.assign({}, state,{subscribedAnimals: action.payload})
        case CHECK_USER_SUBSCRIBED_ANIMALS + '_FULFILLED':
            return Object.assign({}, state,{subscribedAnimals: action.payload})
        case GET_FAV_ANIMALS + '_FULFILLED':
            return Object.assign({}, state,{favAnimals: action.payload})
        case UNSUBSCRIBE + '_FULFILLED': 
            return Object.assign({}, state,{subscribedAnimals: action.payload})
        case ADD_FAV_ANIMAL + '_FULFILLED':
            
            let temp = state.subscribedAnimals.slice()
            temp.push(action.payload.animal_id)
            return Object.assign({}, state,{subscribedAnimals: temp})
        default: 
        return state
    }
}
