import axios from 'axios';
import React from 'react';



const axiousSecure = axios.create({
  baseUrl:'https://y-ruby-three.vercel.app/'
})
const UseAxiousSecure = () => {
  return axiousSecure;
};
export default UseAxiousSecure;