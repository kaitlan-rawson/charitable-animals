import React, { Component } from 'react'
import { Parallax } from 'react-parallax'

import Main from './Main/Main'
import Title from './Title/Title'
import HomeAnimals from '../Home/HomeAnimals/HomeAnimals'
import About from '../Home/About/About'

class Home extends Component {

    render(){
        return(
            <div>
                <Title/>
                <Main/>
                <HomeAnimals/>
                <About/>
            </div>
        )
    }
}

export default Home