import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getEndangeredAnimals } from '../../ducks/reducer'
import { Link } from 'react-router-dom'

class Endangered extends Component {
    
   componentDidMount(){
       this.props.getEndangeredAnimals()
   } 

    render(){
        let endangered = this.props.animals.map((val,i)=>{
            let url = val.name.split(' ').join('_')
            return (
                <div className = 'endangered-animals' key = {i}>
                    <div className = 'endangered-animal' key = {i}>
                        <Link to = {`/animal/${url}`}><div className = 'animal-pic'>
                            <img src = {val.pic1} alt = '' className = 'image'/>
                        </div></Link>
                        <div className = 'animal-name'>
                            {val.name}
                        </div>
                    </div>
                </div>
            )
        })

        return(
            <div className = 'endangered-container'>
                <div className = 'endangered-title'>
                    <h1> Endangered Animals </h1>
                </div>
                <div className = 'endangered-desc'>
                    <h1> This page contains all animals listed under Critically Endangered and Endangered </h1>
                </div>
                <div className = 'endangered-animals'>
                    {endangered}
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
export default connect(mapStateToProps, {getEndangeredAnimals})(Endangered)