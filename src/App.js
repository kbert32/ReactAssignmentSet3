import Counter from './components/Counter';
import Header from './components/Header';
import Auth from './components/Auth';
import UserProfile from './components/UserProfile';
import { useSelector } from 'react-redux';

function App() {
  const loggedIn = useSelector(state => state.auth.isAuthenticated);

  return (
    <>
      <Header />
      {!loggedIn && <Auth />}
      {loggedIn && <UserProfile />}
      <Counter />
    </>
  );
}

export default App;

//redux toolkit = npm install @reduxjs/toolkit