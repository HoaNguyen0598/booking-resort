import React from "react";
import "./App.css";

import Home from "./Pages/Home";
import Rooms from "./Pages/Rooms";
import SingleRoom from "./Pages/SingleRoom";
import Error from "./Pages/Error";
import Trip from './Pages/Trip';
import Contact from './Pages/Contact';
import BookingRoom from './Pages/BookingRoom';
import News from './Pages/News';
import NewsDetail from './Pages/NewsDetail';

import Navbar from "./Components/Navbar/Navbar";
import Footer from './Components/Footer/Footer';
import RealTime from './Components/Realtime/Realtime'
import { Switch, Route } from "react-router-dom";
import ReactNotification from 'react-notifications-component'

function App() {
  return (
    <>
      <Navbar />
      <ReactNotification />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/rooms/" component={Rooms} />
        <Route exact path="/trip/" component={Trip} />
        <Route exact path="/contact/" component={Contact} />
        <Route exact path="/tintuc/" component={News} />
        <Route exact path="/tintuc/:id" component={NewsDetail} />
        <Route exact path="/rooms/:id" component={SingleRoom} />
        <Route exact path="/rooms/bookingroom/:id" component={BookingRoom} />
        <Route component={Error} />
      </Switch>
      <Footer />
      <RealTime />
    </>
  );
}

export default App;
