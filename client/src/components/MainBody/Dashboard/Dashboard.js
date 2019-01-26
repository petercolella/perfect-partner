import React from 'react'


const Dashboard = (props)=> (
       <div className="container-fluid">
           {props.users.map(user => (
               <li key={user._id}>
                   <p>Name: {user.name}</p>
                   <p>Phone: {user.phone}</p>
                   <p>Nudge Frequency: {user.nudgeFrequency}</p>
                   <p>Partner Name: {user.partnerName}</p>
                   <p>Anniversary Date: {user.anniversaryDate}</p>
                   <p>Birth Date: {user.birthDate}</p>
               </li>
           ))}
       </div>
);

export default Dashboard
