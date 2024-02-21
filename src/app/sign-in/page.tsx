"use client";
import { Button, Container, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { authenticate } from "../lib/action";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const router = useRouter();
  const [payload, setPayload] = useState({
    username: "",
    password: "",
  });
  const handleSubmit = async () => {
    // Handle sign in logic here
    const resp = await authenticate(payload)
    if(resp?.message){
      alert(resp?.message)
    }
    else{
      localStorage.setItem("token",resp?.token)
      localStorage.setItem("userId",resp?.id)
      router.push('/todo')
    }
  };
  const onChange = (e: any) => {
    setPayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <section className="h-full gradient-form bg-gray-200 md:h-screen">
      <div className="container py-12 px-6 h-full">
        <div className=" flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
          <div className="">
            <div className="block bg-white shadow-lg rounded-lg">
              <div className="lg:flex lg:flex-wrap g-0">
                <div className="px-4 md:px-0">
                  <div className="md:p-12 md:mx-6">
                    <div className="text-center">
                      <h4 className="text-xl font-semibold mt-1 mb-12 pb-1">
                        Sign In
                      </h4>
                    </div>
                    <form>
                      <p className="mb-4">
                        Please Sign Up if you do not have an account
                      </p>
                      <div className="mb-4">
                        <input
                          type="email"
                          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          placeholder="Your Email"
                          name="username"
                          value={payload.username}
                          onChange={onChange}
                        />
                      </div>
                      <div className="mb-4">
                        <input
                          type="password"
                          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          placeholder="Password"
                          name="password"
                          value={payload.password}
                          onChange={onChange}
                        />
                      </div>
                      <div className="text-center pt-1 mb-12 pb-1">
                        <button
                          className="bg-green border-green-600 text-green-600 inline-block px-6 py-2.5 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                          type="button"
                          onClick={() => handleSubmit()}
                        >
                          Sign In
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SignIn;
