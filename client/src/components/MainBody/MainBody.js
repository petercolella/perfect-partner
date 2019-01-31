import React, {Component} from 'react';
import API from '../../utils/API'
import Dashboard from './Dashboard/Dashboard'

class MainBody extends Component {
    state = {
        users: [],
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
        API.getUsers().then(res =>
            this.setState({ users: res.data, name: "", phone: "", nudgeFrequency: "", partnerName: "", anniversaryDate: "", birthDate: "" })
        );
    };

    render(){
        return(
            <div>
                <Dashboard users = {this.state.users} nudges = {this.state.nudges}/>
            </div>
        )
    }
}
export default MainBody