import Privacypolicy from "./Privacypolicy";
import './Plandetails.css'
import { Button } from "@mui/material";
import PlanImage from '../assets/Green.png';
import { useNavigate } from "react-router-dom";

const Wellnessplan = () => {

    const navigate = useNavigate();

    return (
        <div>
            <div className='plan-header-container'>
                <div className='plan-header-content'>
                    <h1>Wellness Plan Details</h1>
                </div>
            </div>
            <div className="plan-content-container">
                <div className="plan-content-image-container">
                    <img style={{width: '100%',height:'100%'}} alt='plan details' src={PlanImage}/>
                </div>
                <div className="plan-content-data-container">
                    <span>With Wellness plans, you typically pay a low premium each month but higher out-of-pocket fees when you need healthcare services. Bronze plans minimize your monthly costs and are best if you don’t have a lot of health needs.</span>
                    <span>Good choice if: You want a low-cost way to protect yourself from worst-case medical scenarios, like serious sickness or injury. Your monthly premium will be low, but you’ll have to pay for most routine care yourself.
                </span>
                </div>
            </div>
            <Button variant="contained" style={{margin:'auto',display:'block'}} onClick={()=>navigate('/premiumcalculator/?plan=wellness')}>Calculate Premium</Button>
            <Privacypolicy />
        </div>
    )

}
export default Wellnessplan;