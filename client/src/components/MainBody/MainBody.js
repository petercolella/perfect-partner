import React, {Component} from 'react';
import API from '../../utils/API'
import Dashboard from './Dashboard/Dashboard'

class MainBody extends Component {
    state = {
        users: [],
        name: "",
        phone: "",
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
            <Dashboard
                users = {this.state.users}
            />
        )
    }
}
export default MainBody