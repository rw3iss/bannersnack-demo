import { Switch, Route } from 'react-router-dom';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import ResetPassword from './ResetPassword/ResetPassword';
import Dashboard from './Dashboard/Dashboard';
import Logout from './Logout/Logout';

export default function Routes() {
    return (
        <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/reset-password" component={ResetPassword} />
            <Route path="/logout" component={Logout} />
            
            {/* Todo: make these <AuthenticatedRoute/> */}
            <Route path="/dashboard" component={Dashboard} />
        </Switch>
    );
}
