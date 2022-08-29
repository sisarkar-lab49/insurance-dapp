import Privacypolicy from "./Privacypolicy";
import './Plandetails.css'
import { Button } from "@mui/material";
import PlanImage from '../assets/Gold.png';
import { useNavigate } from "react-router-dom";

const Goldplan = () => {

    const navigate = useNavigate();
    return (
        <div>
            <div className='plan-header-container'>
                <div className='plan-header-content'>
                    <h1>Gold Plan Details</h1>
                </div>
            </div>
            <div className="plan-content-container">
                <div className="plan-content-image-container">
                    <img style={{ width: '100%',height:'100%' }} alt='plan details' src={PlanImage} />
                </div>
                <div className="plan-content-data-container">
                    <span>
                        Gold plans typically have higher monthly premiums, but lower out-of-pocket costs. These plans make sense if you regularly use healthcare services, such as for routine prescriptions or a chronic condition.
                        You might want a gold plan if you’d rather pay a higher amount upfront to have lower costs for specific services, , rather than unpredictable amounts out-of-pocket.
                    </span>
                    <span>
                        Good choice if: You’re willing to pay more each month to have more costs covered when you get medical treatment. If you use a lot of care, a Gold plan could be a good value.
                    </span>
                </div>
            </div>
            <Button variant="contained" style={{ margin: 'auto', display: 'block' }} onClick={()=>navigate('/premiumcalculator/?plan=gold')}>Calculate Premium</Button>
            <Privacypolicy />
        </div>
    )

}
export default Goldplan;