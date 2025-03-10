import React, { useState, useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import AuthScreen from "./components/AuthScreen";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import Buy from "./components/Buy";
import Footer from "./components/Footer";

function App() {
  const [user, setUser] = useState(null);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser && currentUser.emailVerified) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
     
    });

    return () => unsubscribe();
  }, []);



  return (
    <div className="App">
      {user ? (
        <>
          <Navbar />
          <Main />
          <Buy />
          <Footer />
        </>
        
      ) : (
        <AuthScreen />
      )}
    </div>
  );
}

export default App;
