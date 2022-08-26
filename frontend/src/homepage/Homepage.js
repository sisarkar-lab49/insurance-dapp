
import { Button } from '@mui/material';
import Banner from '../assets/Banner.png';
import './Homepage.css'
import { useNavigate } from "react-router-dom";
const Homepage = () => {

    const navigate= useNavigate();

    const onTryNow = () => {
        navigate('/pricing');
    }

    const banner = (
        <div className='bannerContainer'>
            <img className='bannerImage' alt='banner' src={Banner} />
        </div>
    )
    const planner = (
        <div className='plannerContainer'>
            <div className='planner-content'>     
                <span className='plannerText'>Insurance without middleman</span>
                <span className='plannerText'>or complicated terms</span>
                <span className='plannerText'>Instant claim settlement</span>
                <span className='teaminfo'>Hackathon project by Fantastic Four</span>
                <div className='browseButton'>
                    <Button style={{whiteSpace: 'nowrap', minWidth:'auto', borderRadius:'10px'}} variant='contained' onClick={onTryNow}>Try now</Button>
                </div>
            </div>        
        </div>
    )
    const trustText = (
        <div className='trustTextContainer'>
            <span>Trusted by individuals and teams at the world's best companies</span>
        </div>
    )

    return (
        <div className='homePage'>
            <div className='homepageContainer'>
                {planner}
                {banner}
            </div>
            {trustText}
        </div>
    )
}
export default Homepage;