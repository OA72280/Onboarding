import React, {Component} from 'react';
import './TaskBox.css'

import {Row, Col} from 'reactstrap';

import BigCalendar from 'react-big-calendar'
import '../node_modules/react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment'

const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer

// import firebase from './base';

class TaskBox extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dates: [],
    }
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

    const dummyEvents = [
      {
        allDay: true,
        end: new Date('March 8, 2019 11:59:00'),
        start: new Date('March 8, 2019 11:59:00'),
        title: 'I9 Paper',
      },
      {
        allDay: true,
        end: new Date('March 22, 2019 11:13:00'),
        start: new Date('March 22, 2019 11:13:00'),
        title: 'Dell Technolgies Advantage',
      },
    ];
  
    return (
      // <div className="clientBox z-depth-5">

        <Row>
          <Col md="1"/>
          <Col md="10">
            <BigCalendar
              localizer={localizer}
              // toolbar={false}
              selectable
              events={dummyEvents}
              style={calendarStyles}
              defaultDate={new Date()}
              eventPropGetter={(this.eventStyleGetter)}
              // onSelectEvent={event => alert(event.title)}
            />
          </Col>
          <Col md="1"/>
        </Row>
        

      // </div>
    );
  }
}

export default TaskBox;