import { useLocation } from 'react-router-dom';
import Goldplan from './Goldplan';
import './Plandetails.css';
import Platinumplan from './Platinumplan';
import Silverplan from './Silverplan';
import Wellnessplan from './Wellnessplan';

const Plandetails = () => {

    const location = useLocation();
    console.log('localtion is ::', location);
    const queryParams = new URLSearchParams(location?.search)
    console.log(queryParams.get("plan"));

    const displayPlan = () => {
        const queryParams = new URLSearchParams(location?.search)
        const plan = queryParams.get("plan");

        switch (plan) {
            case 'Silver':
                return <Silverplan />
            case 'Gold':
                return <Goldplan />
            case 'Platinum':
                return <Platinumplan />
            case 'Wellness':
                return <Wellnessplan />
            default: return null;
        }
    }

    return (
        <div className='plan-details-container'>
            {displayPlan()}
        </div>
    )

}
export default Plandetails;