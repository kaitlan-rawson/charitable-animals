import React, { Component } from 'react'

import Main from './Main/Main'
import Title from './Title/Title'
import HomeAnimals from '../Home/HomeAnimals/HomeAnimals'

class Home extends Component {

    render(){
        return(
            <div>
                <Title/>
                <Main/>
                <HomeAnimals/>
            </div>
        )
    }
}

export default Home