import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from './components/Home/Home'
import Animal from './components/Animal/Animal'
import AllAnimals from './components/AnimalsDropdown/AllAnimals'
import Endangered from './components/Endangered/Endangered'
import Extinct from './components/Extinct/Extinct'
import User from './components/User/User'
import News from './components/News/News'



export default (
    <Switch>
        <Route exact path = '/' component = {Home}/>
        <Route path = '/animals/all' component = {AllAnimals}/>
        <Route path = '/animals/critically-endangered' component = {Endangered}/>
        <Route path = '/animals/extinct' component = {Extinct}/>
        <Route path = '/animal/:name' component = {Animal}/>
        <Route path = '/user' component = {User}/>
        <Route path = '/news' component = {News}/>
    </Switch>
)