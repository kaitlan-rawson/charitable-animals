import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getExtinctAnimals } from '../../ducks/reducer'
import { Link } from 'react-router-dom'

class Extinct extends Component {
    
    componentDidMount(){
        this.props.getExtinctAnimals()
    } 

    render(){
        let animal = this.props.animals.map((val,i)=>{
            let url = val.name.split(' ').join('_')
            return (
                <div className = 'extinct-animals' key = {i}>
                    <div className = 'extinct-content'>
                        <Link to = {`/animal/${url}`}><div className = 'animal-pic'>
                            <img src = {val.pic1} className = 'image' alt = ''/>
                        </div></Link>
                        <div className = 'extinct-name'>
                            {val.name}
                        </div>
                    </div>
                </div>
            )
        })
        
        return(
            <div className = 'extinct-container'>
                <div className = 'extinct-title'>
                    <h1> Poor bastards </h1>
                </div>
                <div className = 'extinct-animals'>
                {animal}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        animals: state.animals
    }
}

export default connect(mapStateToProps, {getExtinctAnimals})(Extinct)