import { Container } from 'react-bootstrap'
import { HashRouter as Router, Route } from 'react-router-dom'
import Head from './components/Head';

import Home from './screens/Home';
import SubscriptionPlan from './screens/SubscriptionPlan';
import LoginManager from './screens/LoginManager';
import RegisterScreen from './screens/RegisterScreen';
import PaymentScreen from './screens/PaymentScreen'
import SelectedSubscriptionScreen from './screens/SelectedSubscription';
import BecomePro from './screens/BecomePro';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen1';

function App() {
  return (
    <Router>
      <Head />
        <main>
          <Container className="py-3">
          <Route path='/' component={Home} exact />
          <Route path='/subscription/:id' component={SubscriptionPlan} />
          <Route path='/login' component={LoginManager} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile/' component={ProfileScreen} />
          <Route path='/selected/:id' component={SelectedSubscriptionScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/placeorder' component={BecomePro} />
          <Route path='/order/:id' component={OrderScreen} />         
          </Container>
        </main>
    </Router>
  )
}

export default App;
