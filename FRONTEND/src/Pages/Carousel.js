import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';
import Room1 from '../images/room-4.jpeg'
import Room2 from '../images/room-5.jpeg'
import Room3 from '../images/room-6.jpeg'
const items = [
  {
    src:  <Room1 />,
    
    header: 'Single Room'
    
  },
  {
    src:  <Room2 />,
    header: 'Single Room'

  },
  {
    src:  <Room3 />,
    header: 'Single Room'
  }
];

const Example = () => <UncontrolledCarousel items={items} />;

export default Example;