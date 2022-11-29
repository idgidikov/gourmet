import React from "react"
import { defaultPicture } from "/src/common/constants";
import { Link } from "react-router-dom";
function ProfileCard({userData,userRole,setUserRole}) {
    
    if(userData?.role == 1) setUserRole("Organizer")
    if(userData?.role == 3) setUserRole("Admin")
    
  return (
    <div className="card card-side bg-base-100 shadow-xl " >
    <figure><img className='w-72' src={userData?.profile ? userData.profile : defaultPicture} alt="" /></figure>
    <div className="card-body">
        <h2 className="card-title"> Hello {userData?.username}
        </h2>
        <p ><span className="badge badge-accent">Email:</span>  {userData?.email}</p>
        <p><span className="badge badge-accent">First name:</span>  {userData?.firstName}</p>
        <p><span className="badge badge-accent">Last name:</span>  {userData?.lastName}</p>
        <p><span className="badge badge-accent">Role:</span>  {userRole}</p>
        
        
        {/* <p>{email}</p> */}
        <div className="card-actions justify-end">
          {userRole == "Organizer" ? 
          ( <><Link to='/create-contest' className="btn btn-primary">Create contest</Link>
          <Link to='/' className="btn btn-primary">Open for voting</Link></>)  : (
              <Link to='/sub' className="btn btn-primary">Create submission</Link>
            )
          }
           
            <Link to='/edit-profile' className="btn btn-primary">Edit Info</Link>
        </div>
    </div>
    </div>
  )
}

export default ProfileCard