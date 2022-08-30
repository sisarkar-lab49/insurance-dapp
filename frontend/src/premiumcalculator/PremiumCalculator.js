import { Button, MenuItem, Select, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { buyPolicy, calculatePremium, connectWallet, getCurrentWalletConnected, getGweiForDollar, loadContractBalance } from '../api/Interact';
import './PremiumCalculator.css';
import CircularProgress from '@mui/material/CircularProgress';
import PopupModal from '../popupmodal/PopupModal';

const PremiumCalculator = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location?.search)
    const plan = queryParams.get("plan");
    const [tenure, setTenure] = useState(10);
    const [premiumFrequency, setPremiumFrequency] = useState(1);
    const [sumInsured, setSumInsured] = useState();
    const [age, setAge] = useState(18);
    const [walletAddress, setWallet] = useState("");
    const [premiumAmount,setPremiumAmount]= useState(0);
    const [premiumAmountWei,setPremiumAmountWei]= useState(0);
    const [balance, setBalance] = useState("No connection to the network.");
    const [buyResponseStatus,setBuyResponseStatus] = useState();
    const [buying,setBuying]=useState(false);
    const [openResponseModal,setOpenResponseModal] = useState(false);
    const sucessMessage= 'Congratulations!!! payment succesful. You are now secured with LifeSecure';

    useEffect(()=>{
        if(buyResponseStatus){
            setOpenResponseModal(true);
        }

    },[buyResponseStatus])
   
    const addWalletListener = () => {
        if (window.ethereum) {
            window.ethereum.on("accountsChanged", (accounts) => {
                if (accounts.length > 0) {
                    setWallet(accounts[0]);
                } else {
                    setWallet("");
                }
            });
        }
    }

    const onLoadFunction = async () => {
        const balance = await loadContractBalance();
        setBalance(balance);
        const { address } = await getCurrentWalletConnected();
        setWallet(address);
        addWalletListener();

    }  

    useEffect(() => {
        onLoadFunction();
    }, [])

    const connectWalletPressed = async () => {
        const walletResponse = await connectWallet();
        setWallet(walletResponse.address);
    };

    const calculateGweiForDollar = async (amount) => {
        const response = await getGweiForDollar(amount);
        return response;
    }

    const calculatePremiumForPlan = async () => {

        const premiumcalculatorInput = {
            policyName:plan.charAt(0).toUpperCase() + plan.substring(1),
            tenure:tenure,
            sumInsured:parseInt(sumInsured,10),
            premiumFrequency:premiumFrequency,
            age:age
        }      
        const response = await calculatePremium(premiumcalculatorInput);
        const amount = await calculateGweiForDollar(response);
        setPremiumAmountWei(amount);
        setPremiumAmount(response);      
    }

    const purchasePolicyForPlan = async () => {
        setBuying(true);
        const connectResponse = await connectWalletPressed();
        console.log('connect response ::',connectResponse);

        const policyRequest = {
            policyName:plan.charAt(0).toUpperCase() + plan.substring(1),
            tenure:tenure,
            sumInsured:parseInt(sumInsured,10),
            premiumFrequency:premiumFrequency,
            age:age,
            amountWei: premiumAmountWei
        }
        console.log('request for purchase premium is :::',policyRequest)
        const response = await buyPolicy(policyRequest);
        setBuying(false);
        setBuyResponseStatus(response?.status);
        console.log('buy response is ::::',response);
    }
    const onAgeChange = (event) => {
        setAge(event?.target?.value);
    }

    const handleTenureChange = (event) => {
        setTenure(event?.target?.value);
    };

    const handlePremiumFrequencyChange = (event) => {
        setPremiumFrequency(event?.target?.value);
    }

    const onSumInsuredChange = (event) => {
        setSumInsured(event?.target?.value);
    }
    console.log('sum is ',sumInsured);
    return (
        <div className='premium-calculator-container'>
            {openResponseModal && <PopupModal open={openResponseModal} message={sucessMessage}/>}
            <div className='premium-calculator-content'>
                <div className='calculator-row'>
                    <span className='calculator-row-item'>Plan</span>
                    <span className='calculator-row-item'>{plan}</span>
                </div>

                <div className='calculator-row'>
                    <span className='calculator-row-item'>Tenure</span>
                    <Select
                        style={{backgroundColor:'white'}}
                        id="Tenure"
                        value={tenure}
                        label="Tenure"
                        defaultValue={10}
                        onChange={handleTenureChange}
                        className='calculator-row-item'
                    >
                        <MenuItem value={10}>Ten years</MenuItem>
                        <MenuItem value={20}>Twenty years</MenuItem>
                        <MenuItem value={30}>Thirty years</MenuItem>
                    </Select>
                </div>

                <div className='calculator-row'>
                    <span className='calculator-row-item'>Sum insured</span>
                    <TextField style={{backgroundColor:'white'}} className='calculator-row-item' value={sumInsured} onChange={onSumInsuredChange} />
                </div>

                <div className='calculator-row'>
                    <span className='calculator-row-item'>Premium Frequency</span>
                    <Select
                        style={{backgroundColor:'white'}}
                        id="premium-frequency"
                        value={premiumFrequency}
                        label="Premium Frequency"
                        className='calculator-row-item'
                        defaultValue={1}
                        onChange={handlePremiumFrequencyChange}
                    >
                        <MenuItem value={1}>Monthly</MenuItem>
                        <MenuItem value={3}>Quarterly</MenuItem>
                        <MenuItem value={6}>Half yearly</MenuItem>
                        <MenuItem value={12}>Yearly</MenuItem>
                    </Select>
                </div>              

                <div className='calculator-row'>
                    <span className='calculator-row-item'>Insured person age</span>
                    <TextField style={{backgroundColor:'white'}} className='calculator-row-item' value={age} onChange={onAgeChange} />
                </div>
                <div className='calculator-row'>
                    <span className='calculator-row-item'>Premium Amount</span>
                    <span className='calculator-row-item'>{premiumAmount}</span>
                    
                </div>
                <div className='button-container'>
                <Button variant='contained'
                     style={{ fontSize: '1.2rem', borderRadius: '10px', padding: '10px', minHeight:'4rem',minWidth: '12rem', marginTop: '2rem' }}
                    onClick={calculatePremiumForPlan}>Calculate Premium</Button>

                <Button variant='contained' 
                  style={{ backgroundColor:buying?'white':'',fontSize: '1.2rem', borderRadius: '10px', padding: '2px',minHeight:'4rem', minWidth: '12rem', marginTop: '2rem' }}
                  onClick={purchasePolicyForPlan}>{buying?<CircularProgress/>:'Purchase'}</Button>
                </div>
            </div>

        </div>
    )
}

export default PremiumCalculator;