import React, { Component } from 'react'

class Modal extends Component {
    
    handleClick(type){
        if (type === 'backdrop' ){
            this.props.close()
        }
    }

    render(){

        return(
            <div onClick = {()=>this.handleClick('backdrop')} className = 'backdropStyle' name = 'backdrop'>
                <div className = 'midModal'> 
                    <div onClick = {()=>this.handleClick('modal')} className = 'modalStyle'>
                        Please login to subscribe to this animal
                    </div>
                </div> 
            </div>
        )
    }
}


export default Modal