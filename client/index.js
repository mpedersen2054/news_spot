
import 'bootstrap/dist/css/bootstrap.css'
import { Container } from 'reactstrap'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import HomePage from './src/components/HomePage'
import StoryFeed from './src/components/StoryFeed'
import Navigation from './src/components/Navigation'

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
