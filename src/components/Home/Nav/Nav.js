import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { setUser } from '../../../ducks/reducer'
import { connect } from 'react-redux'
import axios from 'axios'

class Nav extends Component {
    constructor(props){
        super(props);

        this.handleLogout = this.handleLogout.bind(this)
    }

    checkUserLogin(){
        axios.get('/auth/me')
        .then(res => {
            this.props.setUser(
                res.data
            )
        })
    }

    componentDidMount(){
        this.checkUserLogin()
    }

    handleLogout(){
        axios.get('/logout')
        .then(res => {
           this.props.setUser(
               null
           )
        })
    }

    render(){
        return(
            <nav className = 'Nav'>
                <Link to = '/' className = 'navlink logo'> Charitable Animals </Link>
                <div className = 'middle-super'> 
                    <div className = 'middle-links'>
                        <div className = 'animal-dropdown-container'>
                            <div className = 'navlink animal-dropdown-button'> ANIMALS </div>
                            <div className = 'dropdown-bridge'></div>
                            <div className = 'animal-dropdown-content'>
                                <Link to = '/animals/all' className = 'animal-dropdown-content-links'>All Animals</Link>
                                <Link to = '/animals/critically-endangered' className = 'animal-dropdown-content-links'>Critically Endangered</Link>
                                <Link to = '/animals/extinct' className = 'animal-dropdown-content-links'> Extinct </Link>
                            </div>
                        </div> 
                        <div className = 'animal-dropdown-container'>
                            <Link to = '/news' className = 'navlink animal-dropdown-button'> NEWS</Link>
                        </div>
                    </div> 
                </div>
                {this.props.user ? <Link className = 'navlink animal-dropdown-container' to = '/user'><div> WELCOME {this.props.user.first_name}</div></Link> : <div></div>}
                {this.props.user ? <a className ='navlink login logout' onClick = {()=>this.handleLogout()}>LOGOUT</a> : <a href = { process.env.REACT_APP_LOGIN } className = 'navlink login'>LOGIN</a>}
              
            </nav>
        )
    }
}

function mapStateToProps(state){
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, {setUser})(Nav)