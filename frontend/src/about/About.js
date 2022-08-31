import './About.css';
import Atul from '../assets/Atul.png';
import Elena from '../assets/Elena.png';
import Siddharth from '../assets/Siddharth.png';
import Robin from '../assets/Robin.png';
import Abhishek from '../assets/Abhishek.png';

const About = () => {
    return (
        <div className='about-container'>
            <div className='about-header-container'>
                <div className='about-header-content'>
                    <h1>About us</h1>
                    <span>Making your Insurance Hassle Free!!!!</span>
                </div>
            </div>
            <h1 style={{display:'block',margin:'auto'}}>Our Team</h1>
            <div className='about-image-container'>
           
                <div className='about-image-content'>

                    <div style={{ marginTop: '10px', color: '#854066' }}>
                        <h3>Elena</h3>
                        <img alt='Elena' src={Elena} />
                    </div>
                    <div>
                        <h3 style={{ marginTop: '140px', color: '#854066' }}>Siddharth</h3>
                        <img alt='Siddharth' src={Siddharth} />
                    </div>

                    <div style={{ marginTop: '10px', color: '#854066' }}>
                        <h3>Robin</h3>
                        <img alt='Robin' src={Robin} />
                    </div>

                    <div style={{ marginTop: '140px', color: '#854066' }}>
                        <h3>Atul</h3>
                        <img alt='Atul' src={Atul} />
                    </div>

                    <div style={{ marginTop: '10px', color: '#854066' }}>
                        <h3>Abhishek</h3>
                        <img alt='Abhishek' src={Abhishek} />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default About;