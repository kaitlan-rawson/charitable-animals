import React, { Component } from 'react'
import { Parallax } from 'react-parallax'

class Title extends Component {

    render(){
        return(
             <Parallax bgImage = 'http://hddesktopwallpapers.in/wp-content/uploads/2015/09/hd-waterfall-wallpaper.jpg' strength = {700} className = 'above-fold'>
                    <div className = 'title'> 
                        Charitable Animals
                    </div>
            </Parallax>

        )
    }
}

export default Title