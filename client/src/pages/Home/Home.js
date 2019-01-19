import React, { Component } from "react";
import API from "../../utils/API";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid"
import Profile from '../../components/Profile/Profile'
import Calendar from '../../components/Calendar/Calendar'
import Properites from '../../components/Properties/Properties'
import Articles from '../../components/Articles/Articles'
import UpcomingEvents from '../../components/UpcomingEvents/UpcomingEvents'


class Books extends Component {
  state = {
    books: [],
    title: "",
    author: "",
    synopsis: ""
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data, title: "", author: "", synopsis: "" })
      )
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Profile/>
            <Properites/>
            <Articles/>
          </Col>
          <Col size="md-6">
            <Calendar/>
            <UpcomingEvents/>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
