import React, {Component} from 'react';
import './TaskBox.css'

import {Row, Col} from 'reactstrap';
import {firestore} from './base';

import BigCalendar from 'react-big-calendar'
import '../node_modules/react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment'

const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer

class CalendarPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dates: [
        {
          allDay: true,
          end: new Date('April 8, 2019 11:59:00'),
          start: new Date('April 8, 2019 11:59:00'),
          title: 'I9 Paper',
        },
        {
          allDay: true,
          end: new Date('April 22, 2019 11:13:00'),
          start: new Date('April 22, 2019 11:13:00'),
          title: 'Dell Technolgies Advantage',
        },
      ],
    }
  }

  componentWillMount = () => {
    this.getCalendarEvents()
  }

  getCalendarEvents = () => {
    let self = this
    firestore.collection(this.props.teamID).doc(this.props.uid).onSnapshot((doc) => {
      Object.keys(doc.data().tasks).map((data) => {
        let task = doc.data().tasks[data]

        let tmp = this.state.dates
        tmp.push({
          title: task.taskName,
          start: new Date(task.dueDate.seconds * 1000),
          end: new Date(task.dueDate.seconds * 1000),
        })

        self.setState({
          dates: tmp
        })

        return null
      })
    });
  }
  
  eventStyleGetter = () => {
    return {
      style: {
        backgroundColor: '#ff9900',
      }
    };
  };


  render() {
    const calendarStyles = {
      height: "60em",
    };

    // const dummyEvents = [
    //   {
    //     allDay: true,
    //     end: new Date('April 8, 2019 11:59:00'),
    //     start: new Date('April 8, 2019 11:59:00'),
    //     title: 'I9 Paper',
    //   },
    //   {
    //     allDay: true,
    //     end: new Date('April 22, 2019 11:13:00'),
    //     start: new Date('April 22, 2019 11:13:00'),
    //     title: 'Dell Technolgies Advantage',
    //   },
    // ];
  
    return (
        <Row>
          <Col md="1"/>
          <Col md="10">
            <BigCalendar
              localizer={localizer}
              // toolbar={false}
              selectable
              events={this.state.dates}
              style={calendarStyles}
              defaultDate={new Date()}
              eventPropGetter={(this.eventStyleGetter)}
              // onSelectEvent={event => alert(event.title)}
            />
          </Col>
          <Col md="1"/>
        </Row>
      );
  }
}

export default CalendarPage;