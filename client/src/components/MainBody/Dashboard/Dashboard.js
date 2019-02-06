import React from 'react'
import TestTextButton from '../../TestTextButton';

const Dashboard = (props)=> {
       return (

        <div>
            <h1>{props.car}</h1>
            <h1>{props.user.name}</h1>
            <p>{props.user.partnerName}</p>
            <p>{props.user.phone}</p>
            <p>{props.user.birthDate}</p>
            <p>{props.user.anniversaryDate}</p>
               <table className="table table-striped">
                      <thead>
                      <tr>
                         <th>Nudges</th>
                         <th>Frequency</th>
                         <th>Edit</th>
                         <th>Send</th>
                      </tr>
                      </thead>
                     <tbody>

                            {props.nudges.map(nudge =>{
                                   return (
                                       <tr key={nudge._id}>
                                              <td>{nudge.name}</td>
                                              <td>{nudge.frequency}</td>
                                              <td>{nudge.textMessage}</td>
                                              <td><TestTextButton phone={props.user.phone}/></td>
                                       </tr>
                                   )
                            })}
                     </tbody>
              </table>
        </div>
              )
};

export default Dashboard

// <tbody>
// {props.users.map(user =>{
//               return (
//                   <tr key={user._id}>
//                          <td>{user.name}</td>
//                          <td>{user.phone}</td>
//                          <td>{user.birthDate}</td>
//                          <td>{user.anniversaryDate}</td>
//                          <td>{user.nudgeFrequency}</td>
//                          <td>{user.partnerName}</td>
//                          <td><TestTextButton/></td>
//                   </tr>
//               )
//        })}
// </tbody>
// <thead>
// <tr>
// <th>Name</th>
// <th>Phone</th>
// <th>Birth Date</th>
// <th>Anniversary Date</th>
// <th>Nudge Frequency</th>
// <th>Partner Name</th>
// <th>Test</th>
// </tr>
// </thead>