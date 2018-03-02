import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllAnimals } from '../../ducks/reducer'

class AllAnimals extends Component {
    
    componentDidMount(){
        this.props.getAllAnimals()
    }

    render(){

        let animal = this.props.animals.map((val,i)=>{
        let url = val.name.split(' ').join('_')

            return (
                <div className = 'animal' key = {i}>
                    <div className = 'animal-content'>
                        <Link to = {`/animal/${url}`}><div className = 'animal-pic'>
                            <img src = {val.pic1} className = 'image' alt = ''/>
                        </div></Link>
                        <div className = 'animal-name'>
                            {val.name}
                        </div>
                    </div>
                </div>
            )
        })
        
        return(
            <div className = 'all-container'>
                <div className = 'all-title'>
                    <h1> All Animals </h1>
                </div>
                <div className = 'animal'>
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

export default connect( mapStateToProps, {getAllAnimals} )(AllAnimals)