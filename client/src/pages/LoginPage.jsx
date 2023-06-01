import { Link } from "react-router-dom";
import { useState } from "react";

export default function LoginPage() {

const [email, setEmail] = useState("");
const[password, setPassword] = useState("");


  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-6">Login</h1>
        <form className="max-w-md mx-auto">
          <input type="email" placeholder="your@email.com" value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
          <button className="primary mt-4">Login</button>
          <div className="text-center py-2 text-black-500">
          {"Don't have an account yet?"} <Link className="underline text-bn ml-2" to={"/register"}>Register now</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
