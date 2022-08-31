import Privacypolicy from "./Privacypolicy";
import './Plandetails.css'
import { Button } from "@mui/material";
import PlanImage from '../assets/Platinum.png';
import { useNavigate } from "react-router-dom";

const Platinumplan = () => {

    const navigate=useNavigate();
    return (
        <div>
            <div className='plan-header-container'>
                <div className='plan-header-content'>
                    <h1>Platinum Plan Details</h1>
                </div>
            </div>
            <div className="plan-content-container">
                <div className="plan-content-image-container">
                    <img style={{ width: '100%',height:'100%' }} alt='plan details' src={PlanImage} />
                </div>
                <div className="plan-content-data-container">
                    <span>
                        Platinum plans are how they sound: top of the line. They have the lowest out-of-pocket costs but also the highest monthly premiums.If you have a serious condition and use a lot of services, platinum plans can be a good choice. But because they’re so expensive, only 1/9 of Marketplace enrollees opt for platinum plans.
                    </span>
                </div>
            </div>
            <Button variant="contained" style={{ margin: 'auto', display: 'block' }} onClick={()=>navigate('/premiumcalculator/?plan=platinum')}>Calculate Premium</Button>
            <Privacypolicy />
        </div>
    )

}
export default Platinumplan;