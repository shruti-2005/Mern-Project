import {NavLink,Outlet} from "react-router-dom";
import {FaRegListAlt, FaUser ,FaHome} from "react-icons/fa";
import{FaMessage} from "react-icons/fa6"
import { useAuth } from "../../store/auth";
import { Navigate } from "react-router-dom";

export const AdminLayout = () =>{
  const {user ,isLoading} = useAuth();
  console.log("admin layout",user);

  //jab tak mujhe user ka data nahi aata,neeche wale condition ko render mt kro..for that we have used setLoading use state in store/auth.jsx
if (isLoading) {
  return <h1>Loading ...</h1>;
}




if (!user.isAdmin) {
  return <Navigate to="/" />;
}



  return <>
  <header>
     <div className="container">
      <nav>
        <ul>
          <li>
            <NavLink to="/admin/users"> <FaUser /> Users
            </NavLink>
            </li>
          <li> 
            <NavLink to="/admin/contacts"> <FaMessage />
             Contacts
            </NavLink>
            </li>
          <li>
           <NavLink to="/service"> <FaRegListAlt />
             Services
            </NavLink>
          </li>
          <li>
            <NavLink to="/"> 
            <FaHome />
             Home
            </NavLink>
          </li>
        </ul>
      </nav>
     </div>
  </header>
  <Outlet/>
  </>
}
