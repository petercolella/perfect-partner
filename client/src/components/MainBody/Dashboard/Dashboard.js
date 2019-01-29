import React from 'react'
import TestTextButton from '../../TestTextButton';

const Dashboard = (props)=> {
       return (<table className="table table-striped">
              <thead>
                     <tr>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Birth Date</th>
                            <th>Anniversary Date</th>
                            <th>Nudge Frequency</th>
                            <th>Partner Name</th>
                            <th>Test</th>
                     </tr>
              </thead>
              <tbody>
                     {props.users.map(user =>{
                            return (
                                <tr>
                                       <td>{user.name}</td>
                                       <td>{user.phone}</td>
                                       <td>{user.birthDate}</td>
                                       <td>{user.anniversaryDate}</td>
                                       <td>{user.nudgeFrequency}</td>
                                       <td>{user.partnerName}</td>
                                       <td><TestTextButton/></td>
                                </tr>
                            )
                     })}
              </tbody>
       </table>)
};

export default Dashboard
