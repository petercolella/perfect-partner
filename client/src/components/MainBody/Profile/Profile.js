import React from "react";

const Profile = () => (
    <div className="widget">
        <form onSubmit={this.handleSubmit}>
            <label>What is your partner name?</label>
            <input type="text" onChange={this.handleChange}/>
            <label>What is your partner phone number</label>
            <input type="text" onChange={this.handleChange}/>
            <button>Submit</button>
        </form>
    </div>
);

export default Profile;
