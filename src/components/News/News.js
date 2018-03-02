import React from 'react'

export default function News (props){
     return (
        <div className = 'news-title'>
            Welcome to the News page. Please note this website was a project for school and this feature has not yet been implemented. 

            <div className = 'news-desc'>
            There are future plans that will show all the current news in conservation.
            </div>

            <div className = 'news-desc'>
            However, if you would like to check the latest news in Animal Conservation there are several amazing sites linked below!
            </div> 
            
            <div className = 'news-links'> <a href = 'http://wildlife.org/category/conservation/'> ❈ The Wildlife Society ❈ </a></div>
            <div className = 'news-links'><a href = 'http://wwf.panda.org/wwf_news/'> ❈ WWF ❈ </a></div>
            <div className = 'news-links'><a href = 'https://www.theguardian.com/environment/conservation'> ❈ The Guardian ❈ </a></div>
            <div className = 'news-links'><a href = 'https://theconversation.com/us/topics/wildlife-conservation-4235'> ❈ The Conversation ❈ </a></div>
            <div className = 'news-links'><a href = 'https://www.livescience.com/topics/conservation'> ❈ Live Science ❈ </a></div>

            <div className = 'news-desc'>
            There are also several amazing sites that you can watch live videos of animals! 
            </div> 
            <div className = 'news-links'> <a href = 'https://explore.org/livecams/african-wildlife/african-safari-camera'> ❈ African Wildlife ❈ </a></div>
            <div className = 'news-links'> <a href = 'http://animals.sandiegozoo.org/live-cams'> ❈ San Diego Zoo Live Cam ❈ </a></div>
            <div className = 'news-links'> <a href = 'http://www.mangolinkcam.com'> ❈ Mangolink (lists multiple cam sites) ❈ </a></div>
            


        </div>
    )
}