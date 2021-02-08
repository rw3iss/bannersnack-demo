import { Switch, Route } from 'react-router-dom';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import ForgotPassword from './ForgotPassword/ForgotPassword';
import ResetPassword from './ResetPassword/ResetPassword';
import Dashboard from './Dashboard/Dashboard';
import Logout from './Logout/Logout';
import NotFound from './NotFound/NotFound';

export default function Routes() {
    return (
        <Switch>
            
            <Route path="/" exact component={Dashboard} />

            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />

            <Route path="/signup" component={Signup} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/reset-password" component={ResetPassword} />
            <Route path="/logout" component={Logout} />
            
            {/* Todo: make these <AuthenticatedRoute/> */}
            
            <Route path="/dashboard" component={Dashboard} />

            <Route path="*" component={NotFound} />
            
        </Switch>
    );
}
