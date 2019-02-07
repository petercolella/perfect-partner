import React, {Component} from 'react';
import API from '../../utils/API'
import Dashboard from './Dashboard/Dashboard'
import Nav from "./Landing";

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
    // shadow card card-body mb-2
    render(){
        return(
            <div className="container-fluid">

                <div className="row dashbkgrd">

                </div>
                <div className="row">
                    <div className="col-md-4 dashboard-rght">
                        <div className="row">
                            <div className="col-md-4  avatar-center dash">
                                <img alt="" src={this.state.User.imageUrl}/>
                            </div>
                            <div className="col-md-8">
                                <h1>{this.state.User.name}</h1>
                            </div>
                        </div>
                        <p><span>Partners Name:</span> {this.state.User.partnerName}</p>
                        <p><span>Phone Number:</span> {this.state.User.phone}</p>
                        <p><span>Patners Birthday:</span> {this.state.User.birthDate}</p>
                        <p><span>Your Anniversary:</span> {this.state.User.anniversaryDate}</p>

                    </div>
                    <div className="col-md-8">
                        <Dashboard user={this.state.User}  nudges = {this.state.nudges}/>
                    </div>
                </div>


            </div>
        )
    }
}
export default MainBody