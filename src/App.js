import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Auth from './components/Auth';
import Chat from './components/Chat';
import Header from './components/Header';
import Listing from './components/Listing';

function App() {
  const {isLogin} = useSelector((state) => state.auth);
  useEffect(() => {
    if(isLogin){
      //Todo: Check if registration_token is not sent to server or exceed 30 days. create new one and send to server
      // await generateNewToken(sendTokenToServer);
    }
  }, [isLogin]);
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/auth">
          <Auth />
        </Route>
        <Route path="/chat">
          <Chat />
        </Route>
        <Route path="/">
          <Listing />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
