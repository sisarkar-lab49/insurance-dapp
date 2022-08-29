import { Button, Grid } from "@mui/material";
import { useLocation } from "react-router-dom";
import './UserProfile.css'

const UserProfile = () => {

    const location = useLocation();
    const { state } = location;
    console.log('location details ::', location);

    const welcomeUser = (
        <div className="welcome-user-container ">
            <h1>Welcome: John</h1>
        </div>
    )

    const userInfo = (
        <div className="user-info-container">
            <div className='calculator-row'>
                <span className='calculator-row-item'>Name</span>
                <span className='calculator-row-item'>John</span>
            </div>

            <div className='calculator-row'>
                <span className='calculator-row-item'>Last Name</span>
                <span className='calculator-row-item'>Snow</span>
            </div>

            <div className='calculator-row'>
                <span className='calculator-row-item'>User Name</span>
                <span className='calculator-row-item'>John_snow</span>
            </div>
            <div className='calculator-row'>
                <span className='calculator-row-item'>Email</span>
                <span className='calculator-row-item'>John.snow@gmail.com</span>
            </div>

            <div className='calculator-row'>
                <span className='calculator-row-item'>DOB</span>
                <span className='calculator-row-item'>07/07/1985</span>
            </div>

            <div className='calculator-row'>
                <span className='calculator-row-item'>Metamask Id</span>
                <span className='calculator-row-item'>{state?.metamaskId}</span>
            </div>
            <Button variant="contained" style={{ width: '200px' }}>Update details</Button>
        </div>
    )

    const policyInfo = (
        <div className="user-plan-container">
            {state?.plans?.map((plan, index) => {
                return (
                    <div key={index} className="plan-content">
                        <div className='calculator-row'>
                            <span className='calculator-row-item'>Current Plan</span>
                            <span className='calculator-row-item'>{plan?.policyName}</span>
                        </div>
                        <div><Button variant="contained" style={{ width: '200px' }}>Pay Premium</Button></div>
                    </div>
                )
            })}

        </div>
    )


    return (
        <div className="userprofile-container">
            {welcomeUser}
            <div className="user-data-container">
                {userInfo}
                {policyInfo}
            </div>
        </div>
    )
}
export default UserProfile;