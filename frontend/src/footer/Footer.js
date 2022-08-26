
import { NavLink } from 'react-router-dom';
import './Footer.css';
const Footer = () => {

    const Copyright = (
        <div>
            <ul className='footer-content-ul'>
                <li><h3>LifeSecure</h3></li>
                <li>
                    2022@LifeSecure
                </li>
                <li>
                    All rights reserved
                </li>
            </ul>
        </div>
    )

    const Privacy = (
        <div>
            <ul className='footer-content-ul'>
                <li>Privacy policy</li>
                <li>
                    Terms of Service
                </li>
            </ul>
        </div>
    )

    const NavLinks = (
        <div>
            <ul className='footer-content-ul'>
                <li>
                    <NavLink to="/" style={({ isActive }) => ({
                        color: isActive ? 'blue' : 'black',
                        textDecoration: 'none'
                    })}>
                        Home
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/pricing" style={({ isActive }) => ({
                        color: isActive ? 'blue' : 'black',
                        textDecoration: 'none'
                    })}>
                        Pricing
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/about" style={({ isActive }) => ({
                        color: isActive ? 'blue' : 'black',
                        textDecoration: 'none'
                    })}>
                        About
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/contact" style={({ isActive }) => ({
                        color: isActive ? 'blue' : 'black',
                        textDecoration: 'none'
                    })}>
                        Contact
                    </NavLink>
                </li>
            </ul>
        </div>
    )

    return (

        <div className='footer-content'>
            {Copyright}
            {NavLinks}
            {Privacy}
        </div>

    )
}
export default Footer;