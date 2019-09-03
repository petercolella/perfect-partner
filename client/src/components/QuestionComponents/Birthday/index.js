import React, { Component } from 'react';
import API from '../../../utils/API';
import Header from '../../Header';
import DateQuestionDialog from '../DateQuestionDialog';
import getTime from 'date-fns/getTime';

const getUTCDate = (date = new Date()) => {
  const dateFromString = new Date(date);
  return new Date(
    getTime(dateFromString) + dateFromString.getTimezoneOffset() * 60 * 1000
  );
};

const getLocalDate = (UTCDate = new Date()) => {
  const dateFromString = new Date(UTCDate);
  return new Date(
    getTime(dateFromString) - dateFromString.getTimezoneOffset() * 60 * 1000
  );
};

// const [selectedDate, setSelectedDate] = React.useState(new Date());

// function handleDateChange(date) {
//   setSelectedDate(date);
// }

class Birthday extends Component {
  state = {
    User: {},
    title: 'Birthday',
    question: "what is your partner's birthday?",
    userField: new Date(),
    nextQuestionLink: '/anniversary'
  };

  componentDidMount() {
    const path = this.props.location.pathname;
    this.props.setPreviousPath(path);
    this.loadUserInfo();
  }

  loadUserInfo = () => {
    const id = sessionStorage.getItem('currentUserId');
    if (id) {
      API.getUser(id).then(res => {
        console.log(`
Birthday Component (loadUserInfo => getUser):

res.data.birthDate:
${res.data.birthDate}
        `);
        this.setState(
          {
            User: res.data,
            userField: res.data.birthDate ? res.data.birthDate : new Date()
          },
          function() {
            console.log(`
Birthday Component (loadUserInfo => setState):

this.state.userField:
${this.state.userField}

this.state.User.birthDate:
${this.state.User.birthDate}
            `);
          }
        );
      });
    }
  };

  handleFormSubmit = event => {
    const jsonDate = this.state.userField ? this.state.userField : null;
    const localJsonDate = jsonDate ? getLocalDate(jsonDate).toJSON() : null;
    console.log(`
Birthday Component (handleFormSubmit):

this.state.userField: ${this.state.userField}

jsonDate: ${jsonDate}

localJsonDate: ${localJsonDate}
                `);
    event.preventDefault();
    API.updateUser(this.state.User._id, {
      birthDate:
        new Date(this.state.userField).toDateString() !==
        new Date().toDateString()
          ? this.state.userField
          : null
    }).then(this.loadUserInfo);
  };

  handleUserDateInputChange = name => event => {
    const jsonDate = event ? event.toJSON() : null;
    const localJsonDate = jsonDate ? getLocalDate(jsonDate).toJSON() : null;
    // if (event === 'Invalid Date') {
    //   console.log('inside');
    //   error = true;
    // } else {
    //   error = false;
    // }
    this.setState({
      [name]: localJsonDate
    });
    console.log(`
Birthday Component (handleUserDateChange):

event: ${event}

jsonDate: ${jsonDate}

localJsonDate: ${localJsonDate}
    `);
  };

  render() {
    return (
      <>
        <Header />
        <div className="bkgd-image">
          <div className="container invisible">
            <div className="row mb-3">
              <div className="col-md-4 col-sm-12">
                <img id="header-img" alt="logo" src="/img/logo_p.png" />
              </div>
            </div>
          </div>
          <DateQuestionDialog
            handleFormSubmit={this.handleFormSubmit}
            handleUserDateInputChange={this.handleUserDateInputChange}
            // selectedDate={selectedDate}
            // handleDateChange={handleDateChange}
            question={this.state.question}
            date={getUTCDate(this.state.userField)}
            userField={this.state.userField}
            link={this.state.nextQuestionLink}
            title={this.state.title}
            firstName={this.state.User.firstName}
          />
        </div>
      </>
    );
  }
}

export default Birthday;
