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

function App() {
  return (
    <div className='app-container'>
      <Navbar />
      <div className='main-container'>
        <Routes>
          <Route exact path="/" element={<Homepage/>}/>
          <Route exact path="/pricing" element={<Pricing/>}/>
          <Route exact path="/about" element={<About/>}/>
          <Route exact path="/contact" element={<Contact/>}/>
          <Route exact path="/howitworks" element={<Howitworks/>}/>
          <Route path="/plandetails" element={<Plandetails/>}/>
          <Route path="/premiumcalculator" element={<PremiumCalculator/>}/>
        </Routes>      
        </div>
        <Footer/>
    </div>
  );
}

export default App;
