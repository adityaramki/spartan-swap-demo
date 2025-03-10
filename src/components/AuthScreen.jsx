import React, { useState } from "react";
import { auth } from "../firebase";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendEmailVerification 
} from "firebase/auth";

const AuthScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    // Check if the email is from MSU
    if (isSignUp && !email.endsWith("@msu.edu")) {
      setError("Only MSU emails (@msu.edu) are allowed.");
      return;
    }

    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Send verification email
        await sendEmailVerification(user);
        setEmailSent(true);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#3e5545] text-white">
      <h2 className="text-3xl font-bold mb-6">{isSignUp ? "Sign Up" : "Login"}</h2>
      
      {error && <p className="text-red-500">{error}</p>}
      {emailSent && <p className="text-green-500">Verification email sent! Check your inbox.</p>}

      <form onSubmit={handleAuth} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email (must be @msu.edu)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 rounded bg-gray-800 border border-gray-700"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 rounded bg-gray-800 border border-gray-700"
          required
        />
        <button type="submit" className="p-2 bg-[#00df9a] rounded text-black">
          {isSignUp ? "Sign Up" : "Login"}
        </button>
      </form>

      <button onClick={() => setIsSignUp(!isSignUp)} className="mt-4 text-sm text-[#00df9a]">
        {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
      </button>
    </div>
  );
};

export default AuthScreen;
