import React, { Component } from 'react'
import { connect } from 'react-redux'
import { checkSubscribedAnimals, checkUserSubscribedAnimals, unsubscribe, addFavAnimal } from '../../ducks/reducer'
import axios from 'axios'
import Modal from './Modal'

class Animal extends Component {
    constructor(props){
        super(props);

        this.state = {
            animal: {},
            subscription: false,
            showModal: false,
        }

        this.closeModal = this.closeModal.bind(this)
    }

    componentDidMount(){
        axios.get('/api/animal/' + this.props.match.params.name)
            .then(res=>{
                this.setState({
                    animal: res.data
                })
            })
            .catch(console.log)

        if (this.props.user){
            this.props.checkSubscribedAnimals()
            }
        }
    

    componentWillReceiveProps(nextProps){
        if(!this.props.user && nextProps.user) {
          this.props.checkUserSubscribedAnimals()
        }
    }

    handleSubscribe(){
        if (this.props.user){
            this.props.addFavAnimal(this.state.animal.id)
        } else {
            this.setState({
                showModal: true
            })
        }
    }

    handleUnsubscribe(){
        if (this.props.user){
            this.props.unsubscribe(this.state.animal.id)
        }
    }

    closeModal(){
        this.setState({
            showModal: false
        })
    }

    render(){
        let {animal} = this.state
        let subscribed = this.props.subscribedAnimals.includes(this.state.animal.id)
        return(
            <section className = 'animal-main'>
                {animal.name}
                <img src = {animal.pic1} alt = '' className = 'animal-main-img'/>
                <section className = 'animal-facts-container'>
                    {animal.desc1}
                    <div className = 'animal-facts'>
                        <img src = {animal.pic2} alt = '' className = 'animal-image'/>
                        <div className = 'animal-desc'>{animal.desc2}</div>
                    </div>
                    <div className = 'animal-facts'>
                        <img src = {animal.pic3} alt = '' className = 'animal-image'/>
                        <div className = 'animal-desc'>{animal.desc3}</div>
                    </div>
                    <div className = 'animal-facts'>
                        <img src = {animal.pic4} alt = '' className = 'animal-image'/>
                        <div className = 'animal-desc'>{animal.desc4}</div>
                    </div>
                    {this.state.showModal ?  <Modal close = {this.closeModal}/> : null}
                    {subscribed ? 
                        <button className = 'unsubscribe-button' onClick = {()=>{this.handleUnsubscribe()}}> Unsubscribe </button> : 
                        <button className = 'subscribe-button' onClick = {()=>{this.handleSubscribe()}}> Subscribe </button>}
                </section>
            </section>
        )
    }
}

function mapStateToProps(state){
    return {
        user: state.user,
        subscribedAnimals: state.subscribedAnimals,
    }
}

export default connect(mapStateToProps, {checkSubscribedAnimals, checkUserSubscribedAnimals, unsubscribe, addFavAnimal})(Animal)