import './App.css';
import Navbar from './navbar/Navbar';
import Homepage from './homepage/Homepage';
import { Routes, Route } from 'react-router-dom';
import Pricing from './pricing/Pricing';
import About from './about/About';
import Contact from './contact/Contact';
import Footer from './footer/Footer';
import Howitworks from './howitworks/HowItworks';
import Plandetails from './plandetails/Plandetails';
import PremiumCalculator from './premiumcalculator/PremiumCalculator';
import LifeSecureIcon from './assets/LifeSecureIcon.png';
import HomeButton from './assets/HomeButton.jpg';
import { useState } from 'react';
import UserProfile from './userprofile/UserProfile';

function App() {

  const [atHome, setAthome] = useState(true);

  const MainContent = (
    <div>
      <Navbar />
      <div>
      <div className='main-container'>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/pricing" element={<Pricing />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/howitworks" element={<Howitworks />} />
          <Route path="/plandetails" element={<Plandetails />} />
          <Route path="/premiumcalculator" element={<PremiumCalculator />} />
          <Route path="/user" element={<UserProfile />} />
        </Routes>
      </div>
      {<Footer />}
      </div>
    </div>
  )

  return (
    <div className='app-container'>
      {atHome ?
        <div className='home-page-icon-container'>
          <h1>Life Secure</h1>
          <img className='home-icon1' src={LifeSecureIcon} />
          <img className='home-icon2' src={HomeButton} onClick={() => setAthome(false)} />
        </div>
        : MainContent
      }
    </div>
  );
}

export default App;
