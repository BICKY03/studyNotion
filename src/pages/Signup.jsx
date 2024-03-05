
import React from 'react'
import Template from '../Components/Template'
import signupImg from "../assets/signup.png"

const Signup = ({setIsLoggedIn}) => {
  return (
    <div>
       <Template
        title="Join themillions learning to code with studyNotion for free"
        desc1="Build skills for today,tomorrow,and beyond"
        desc2="Education to future-proof your career"
        image={signupImg}
        formType="signup"
        setIsLoggedIn={setIsLoggedIn}

    />
    </div>
  )
}

export default Signup
