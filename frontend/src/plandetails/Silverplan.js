import Privacypolicy from "./Privacypolicy";
import './Plandetails.css'
import { Button } from "@mui/material";
import PlanImage from '../assets/plandetails.png';
import { useNavigate } from "react-router-dom";

const Silverplan = () => {

    const navigate= useNavigate();

    return (
        <div>
            <div className='plan-header-container'>
                <div className='plan-header-content'>
                    <h1>Silver Plan Details</h1>
                </div>
            </div>
            <div className="plan-content-container">
                <div className="plan-content-image-container">
                    <img style={{ width: '100%' }} alt='plan details' src={PlanImage} />
                </div>
                <div className="plan-content-data-container">
                    <span>
                        Silver plans are the most popular. They typically have moderate monthly premiums and out-of-pocket costs.Silver deductibles — the costs you pay yourself before your plan pays anything — are usually lower than those of Wellness plans.
                    </span>
                    <span>Good choice if: You qualify for “extra savings” — or, if not, if you’re willing to pay a slightly higher monthly premium than Wellness to have more of your routine care covered.
                    </span>
                </div>
            </div>
            <Button variant="contained" style={{ margin: 'auto', display: 'block' }} onClick={()=>navigate('/premiumcalculator/?plan=silver')}>Calculate Premium</Button>
            <Privacypolicy />
        </div>
    )

}
export default Silverplan;