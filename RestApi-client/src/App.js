import React from 'react';
import './App.css';
import { Provider } from "react-redux";
import {CategoriesConnected} from "./components/PostArticles";

import {PostArticlesConnected} from "./components/PostArticles";

import { store } from "./actions/store";

import { Container, AppBar, Typography, Button } from "@material-ui/core";
import ButterToast,{ POS_RIGHT,POS_TOP } from "butter-toast";

function App() {
  return (
    <Provider store={store}>
      <Container maxWidth="1g">
        <AppBar position="static" color="inherit">
          <Typography
            variant="h2"
            align="center">
              Articles
          </Typography>
        </AppBar>
        
        <ButterToast position={{vertical:POS_TOP,horizontal:POS_RIGHT}}/>

        <CategoriesConnected/>
        <PostArticlesConnected/>

      </Container>
    </Provider>

  );
  
}

export default App;
