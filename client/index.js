
import 'bootstrap/dist/css/bootstrap.css'
import { Button } from 'reactstrap'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import HomePage from './src/components/HomePage'
import StoryFeed from './src/components/StoryFeed'

const PrimaryLayout = () => (
    <div className="primary-layout">
        <header>
            Our React Router 4 App
            <Button>Click</Button>
        </header>
        <main>
            <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/feed" component={StoryFeed} />
                <Redirect to="/" />
            </Switch>
        </main>
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
