import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getMainAnimals } from '../../../ducks/reducer'
import { Link } from 'react-router-dom'

class HomeAnimals extends Component {
    
    componentDidMount(){
       this.props.getMainAnimals()
     }

    render(){

        let mainAnimals = this.props.animals.map((val,i) =>{
        let url = val.name.split(' ').join('_')

            return (
                <div className = 'main-animal' key = {i}>
                    <div className = 'main-animal-content'>
                        <Link to = {`/animal/${url}`}><div className = 'main-animal-images'>
                            <img src = {val.pic1} alt = '' className = 'image'/>
                        </div></Link>
                        <div className = 'main-animal-name'>
                            {val.name}
                        </div>
                    </div>
                </div>
            )
        })

        return(
            <div>
                <section className = 'main-animals'>
                    {mainAnimals}
                </section>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        animals: state.animals
    }
}

export default connect( mapStateToProps, {getMainAnimals} )(HomeAnimals)