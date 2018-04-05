import React, { Component } from 'react'
import { Parallax } from 'react-parallax'

class About extends Component {
    
    render(){
        return(
            <div className = 'main-about'>
                <div className = 'about-title'>
                    About
                </div>
                <div className = 'about-desc'>
                    <div className = 'about-sub'>
                        About the website
                    </div>
                    <div className = 'about-desc'>
                        This site allows you to learn about some of the amazing animals the world has (or in some cases had) to offer. You're able to look at amazing pictures along with some facts about the animal. You can then log in to subscribe and donate to help the conservation, preservation and education of these amazing animals. The website allows you to subscribe and set an exact amount to each animal and then pay the sum. The specific amounts entered will then be sent to the appropriate animal.
                        <br></br><br></br>If you would like to login with test data you can use the information: 
                        <b> Email:</b> test@test.com  and <b> Password: </b> TestPassword1!
                    </div> 
                    <div className = 'about-sub'>
                        About the Dev
                    </div>
                    <div className = 'about-desc'>
                        I am a full-stack developer who made this website for my first project while attending DevMountain. I've loved animals since I was very small and they remain a big passion of mine. I thought I could fuel my passion for helping animals through web development and thus this site was created. 
                    </div>
                </div>
            </div>
        )
    }
}

export default About