import React, {Component} from 'react';
import API from '../../utils/API'
import Dashboard from './Dashboard/Dashboard'

class MainBody extends Component {
    state = {
        users: [],
        User: {},
        name: "",
        phone: "",
        nudges: [
            {name:"Romantic Text", frequency: 7},
            {name:"Buy Flowers", frequency: 4},
            {name:"Dinner Reservations", frequency: 3}
        ],
        nudgeFrequency: "",
        partnerName: "",
        anniversaryDate: "",
        birthDate: ""
    };

    componentDidMount() {
        this.loadUserInfo();
    }
    loadUserInfo = () => {
        API.getUsers().then(res => {
            this.setState({ users: res.data, User: res.data[res.data.length - 1] });
            console.log(res.data[res.data.length - 1]);
            console.log(res.data[res.data.length - 1]._id);
        });
    };

    render(){
        return(
            <div className="container shadow card card-body mb-2">
                <Dashboard user={this.state.User}  nudges = {this.state.nudges}/>
            </div>
        )
    }
}
export default MainBody