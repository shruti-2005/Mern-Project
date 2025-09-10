import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { useAuth } from "../store/auth";
import {toast} from "react-toastify";



//const { storeTokenInLS } = useAuth();

export const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { storeTokenInLS,API } = useAuth();   // ✅ get from context

  const URL = `${API}/api/auth/login`;

  const handleInput = (e) => {
    console.log(e);
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  // handle form on submit
  const handleSubmit = async(e) => {
    e.preventDefault(); //from preventing refreshing the page when clicked on submit
    console.log(user);

    try{
     const response = await fetch(URL,
      {
        method:"POST",
        headers:{
          'Content-Type':"application/json"
        },

        body:JSON.stringify(user),
  });

  console.log("login form response:",response)

   const res_data = await response.json();
   console.log("response data:",res_data);

  if(response.ok){
     console.log("✅ firing toast.success...");
  toast.success("Login successful");
  storeTokenInLS(res_data.token); //update context+local storage
  setUser({ email:"",password:""});
  navigate("/");
   }else{
    console.log("❌ firing toast.error...");

  toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
  console.log("invalid credentials");
}
    } catch(error){
      console.log(error);
       toast.error("Something went wrong. Please try again.");
    }
  };

  

  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="login-image reg-img">
                <img
                  src="image/images/login.png"
                  alt="let's fill the login form"
                  width="400"
                  height="500"
                />
              </div>
              {/* our main login code  */}
              <div className="registration-form">
                <h1 className="main-heading mb-3">login form</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  
                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="text"
                      name="email"
                      value={user.email}
                      onChange={handleInput}
                      placeholder="email"
                      id="email"
                      required autoComplete="off"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleInput}
                      placeholder="password"
                      id="password"
                      required autoComplete="off"
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-submit">
                    Login Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};