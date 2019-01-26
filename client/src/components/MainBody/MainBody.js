import React, {Component} from 'react';
import Google from './Signin/Google'

class MainBody extends Component {
    state ={};
    render(){
        return(
            <div className="container-fluid">
                <Google/>
            </div>
        )
    }
}
export default MainBody