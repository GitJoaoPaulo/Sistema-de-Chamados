import { Switch } from 'react-router-dom';
import Route from './Route';

import SignUp from '../pages/SignUp/';
import SignIn from '../pages/SignIn/';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Companies from '../pages/Companies';
import New from '../pages/New';

export default function RoutesApp() {
    return (
        <Switch>
            <Route exact path="/" component={SignIn} />
            <Route exact path="/register" component={SignUp} />
            <Route exact path="/dashboard" component={Dashboard} isPrivate />
            <Route exact path="/profile" component={Profile} isPrivate />
            <Route exact path="/companies" component={Companies} isPrivate />
            <Route exact path='/new' component={New} isPrivate/>
            <Route exact path='/new/:id' component={New} isPrivate/>
        </Switch>
    )
}