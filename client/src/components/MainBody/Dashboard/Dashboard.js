import React from 'react'
import TestTextButton from '../../TestTextButton';

const Dashboard = (props)=> {
       return (

        <div>
               <div>{props.users.name}</div>
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
                                              <td><TestTextButton/></td>
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