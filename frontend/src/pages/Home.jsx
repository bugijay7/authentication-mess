import { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Example: fetch user data if token/session is available
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/auth/home', {
          withCredentials: true // if using cookies/session
        });
        setUser(res.data);
      } catch (error) {
        console.error('Not logged in or error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="home-container">
      <h1>Welcome to the Messenger App</h1>
      {user ? (
        <p>Hello, {user.username}!</p>
      ) : (
        <p>Please <a href="./login">log in</a> or <a href="./register">register</a> if you dont have an account to continue.</p> 
      )}
    </div>
  );
};

export default Home;
