import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getFavAnimals } from '../../ducks/reducer'
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout'



class User extends Component {
    constructor(props){
        super(props);
    
        this.state = {
            donateAmounts: {},
            amount: null,
            donateMonthly: false
        }
    }

    componentDidMount(){
        this.props.getFavAnimals()
    }

    handleInput(e){
        let newDonate = Object.assign({},this.state.donateAmounts)
        newDonate[e.target.name] = e.target.value[0] === '$' ? e.target.value : '$' + e.target.value 

        let total = Object.values(newDonate).reduce((sum,val)=>{
            let newVal = val.slice(1) * 1 
            return sum + newVal
        }, 0) * 100 
        
        this.setState({
            donateAmounts: newDonate, 
            amount: total,
        })
    }

    handleDonateMonthly(name){
        axios.put('/api/monthly/donation', {animalName: name} )
        .then(resp=> {
            this.setState({
                donateMonthly: true
            })
        })
    }

    //--------Stripe--------//
    onToken = token => {
        console.log('token', token);
        token.card = void 0;
        const { amount } = this.state
        axios.post('/api/payment', { token, amount})
        .then(charge => {console.log('charge response', charge.data)})
    }

    render(){
        let favAnimals = null
        if (this.props.favAnimals){
            favAnimals = this.props.favAnimals.map((val, i)=>{
            let url = val.name.split(' ').join('_')
            return (
                <div className = 'user-homepage' key = {i}>
                    <div className = 'fav-animals-content' >
                        <Link to = {`/animal/${url}`}><div className = 'animal-pic'>
                            <img src = {val.pic1} alt = '' className = 'fav-image'/>
                        </div></Link>
                        <div className = 'fav-name'>
                            {val.name}
                        </div>
                        <div>
                            <div className = 'donate-monthly'>
                            <input className = 'checkbox' type = 'checkbox' onClick = {()=>this.handleDonateMonthly(val.name)}/>
                            Donate Monthly
                            </div>
                            One-time Donation
                            <input 
                                className = 'one-time-donation'
                                name = {val.name} 
                                value = {this.state.donateAmounts[val.name] || '$'} 
                                onChange = {(e)=>this.handleInput(e)}>
                            </input>
                        </div>
                    </div>
                </div>
            )
        })} else {
            return (
                favAnimals =  <div className = 'fav-title'> You have no subscribed animals </div>
            )
        }

        return(
            <div className = 'container'>
                <div className = 'fav-title'>
                    <h1> Favorite Animals </h1>
                </div>
                <div className = 'user-homepage'>
                {favAnimals}
                </div>
                <div className = 'total'>
                    Total: ${this.state.amount / 100}

                <div><StripeCheckout 
                token = {this.onToken}
                stripeKey = {process.env.REACT_APP_STRIPE_PUBLIC_KEY}
                amount = {this.state.amount}
                name = 'Charitable Animals'
                description = 'Donate to help conservation efforts!'
                label = 'Multi-Donate'
                /></div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        favAnimals: state.favAnimals
    }    
}

export default connect(mapStateToProps, {getFavAnimals})(User)