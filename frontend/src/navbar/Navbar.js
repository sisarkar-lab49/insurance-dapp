import './Navbar.css';
import { Button } from '@mui/material';
import { NavLink } from "react-router-dom";
import { connectWallet, getCurrentWalletConnected, getSubscriptionForUser, loadContractBalance } from '../api/Interact';
import { useEffect, useState } from 'react';
import metamask from '../assets/Robin.png';

const Navbar = () => {

    const [accountAddr, setAccountAddr] = useState();
    console.log('address:::',accountAddr);

    const getSubscriptionDetails = async () => {
        const response = await getSubscriptionForUser(accountAddr?.address);
        console.log('subscription is ::::',response);
    }

    const addWalletListener = () => {
        if (window.ethereum) {
            window.ethereum.on("accountsChanged", (accounts) => {
                if (accounts.length > 0) {
                    // setWallet(accounts[0]);
                } else {
                    // setWallet("");
                }
            });
        }
    }

    const onLoadFunction = async () => {
        const balance = await loadContractBalance();
        const { address } = await getCurrentWalletConnected();
        addWalletListener();
    }


    useEffect(() => {
        onLoadFunction()
    }, [])

    const connectWalletPressed = async () => {
        const walletResponse = await connectWallet();
        setAccountAddr(walletResponse);
        console.log('waleet details:::', walletResponse);
    };

    const loginToMetamask = () => {
        connectWalletPressed();
    }


    return (
        <div className="navbarContainer">
            <div>
                <span className='headerName'>LifeSecure</span>
            </div>
            <div className='navMenuContainer'>
                <NavLink to="/" style={({ isActive }) => ({
                    color: isActive ? 'blue' : 'black',
                    textDecoration: 'none'
                })}>
                    <span className='navMenu'>Home</span>
                </NavLink>
                <NavLink to="/pricing" style={({ isActive }) => ({
                    color: isActive ? 'blue' : 'black',
                    textDecoration: 'none'
                })}>
                    <span className='navMenu'>Pricing</span>
                </NavLink>
                <NavLink to="/about" style={({ isActive }) => ({
                    color: isActive ? 'blue' : 'black',
                    textDecoration: 'none'
                })}>
                    <span className='navMenu'>About us</span>
                </NavLink>
                <NavLink to="/contact" style={({ isActive }) => ({
                    color: isActive ? 'blue' : 'black',
                    textDecoration: 'none'
                })}>
                    <span className='navMenu'>Contact</span>
                </NavLink>

                <NavLink to="/howitworks" style={({ isActive }) => ({
                    color: isActive ? 'blue' : 'black',
                    textDecoration: 'none'
                })}>
                    <span className='navMenu'>How it works</span>
                </NavLink>

            </div>
            <div className='navLoginContainer'>
                {accountAddr ?
                    <div className='icon-container'>
                        <img className='icon-image' alt='user' src={metamask} onClick={getSubscriptionDetails} />
                    </div> 
                    : <Button style={{ whiteSpace: 'nowrap', minWidth: 'auto' }} variant='contained' onClick={loginToMetamask}>Login</Button>
                }

            </div>
        </div>
    )
}
export default Navbar;