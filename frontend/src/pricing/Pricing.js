
import { Button, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllPolicies } from '../api/Interact';
import CircularProgress from '@mui/material/CircularProgress';
import './Pricing.css';

const Pricing = () => {

    const [policies, setPolicies] = useState();
    const [loadingPolicy, setLoadingPolicy] = useState(true);

    const navigate = useNavigate();
    const getPolicies = async () => {
        const data = await getAllPolicies();
        setLoadingPolicy(false);
        console.log('policy data :::',data);
        setPolicies(data);
    }

    useEffect(() => {
        getPolicies();
    }, [])

    const PricingHeader = (
        <div className='pricing-header-container'>
            <div className='pricing-content'>
                <h1>Pricing</h1>
                <span>Our pricing is not expensive, but its not</span>
                <span>cheap either, its exactly what it should be</span>
            </div>
        </div>
    )

    const CompareFeatures = (
        <div className='compare-features'>
            <div className='compare-features-content'>
                <h3>Compare Features</h3>
                <div className='compare-list-header-container'>
                    {policies?.map((policy, index) => {
                        return <h3 key={index}>{policy?.name}</h3>
                    })}
                </div>
                <div className='compare-list-container'>
                    {policies?.map((policy, index) => {
                        return (
                            <ul key={index} className='compare-list'>
                                {policy?.features?.map((feature, index) => {
                                    return (
                                        <li key={index}>{feature}</li>
                                    )
                                })}
                            </ul>
                        )
                    })}
                </div>
            </div>

        </div>
    )

    const PriceTiles = (
     loadingPolicy ? 
     <div className='loading-div'><CircularProgress/> </div>:
    <Grid container spacing={1} style={{ padding: '1rem' }}>
        {policies?.map((policy, index) => {
            return (
                <Grid key={index} item lg={3} sm={6} xs={12}>
                    <div className='tile-box '>
                        <h3>{policy?.name}</h3>
                        <div>
                            <span className='dollar'>$</span>
                            <span className='amount'>{policy?.basePremium}</span>
                            <span className='month'>/month</span>
                        </div>
                        <span className='tile-text'>{policy?.description}</span>
                        <Button variant='contained' onClick={() => navigate(`/plandetails/?plan=${policy?.name}`)}>Get Started with {policy?.name}</Button>
                    </div>
                </Grid>
            )
        })}
    </Grid>
    )

return (
    <div className='pricing-container'>
        {PricingHeader}
        {PriceTiles}
        {CompareFeatures}
    </div>
)
}
export default Pricing;