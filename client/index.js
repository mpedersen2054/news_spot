import 'babel-polyfill'
import 'bootstrap/dist/css/bootstrap.css'
import './src/styles/main.scss' // spot from public/bundle.js i think?
import { Container } from 'reactstrap'
import React from 'react'
import ReactDOM from 'react-dom'
// import { AppContainer } from 'react-hot-loader'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import Navigation from './src/components/Navigation'
import Footer from './src/components/Footer'
import HomePage from './src/components/HomePage'
import StoryFeed from './src/components/StoryFeed'

const PrimaryLayout = () => (
    <div className="primary-layout">
        <header>
            <Navigation />
        </header>
        <Container>
            <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/feed" component={StoryFeed} />
                <Redirect to="/" />
            </Switch>
        </Container>
        <Footer />
    </div>
)

const App = () => (
    <BrowserRouter>
        <PrimaryLayout />
    </BrowserRouter>
)

ReactDOM.render(
    <App />,
    document.getElementById('root')
)
