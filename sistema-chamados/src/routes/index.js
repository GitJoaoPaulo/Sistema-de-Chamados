import { Switch } from 'react-router-dom';
import Route  from './Route';

import SignUp from '../pages/SignUp/index';
import SignIn from '../pages/SignIn/index';
import Dashboard from '../pages/Dashboard';

export default function RoutesApp(){
    return(
        <Switch>
            <Route exact path="/" component={SignIn} />
            <Route exact path="/register" component={SignUp} />
            <Route exact path="/dashboard" component={Dashboard} isPrivate/>
        </Switch>
    )
}