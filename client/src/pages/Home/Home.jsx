import heroSection from '../../assets/Designer.png';
import './Home.css';

const Home = () => {
  return (
    <section id="home" className="home-section">
      <div className="container">
        <div className="row d-flex align-items-center">
          {/* Image Column */}
          <div className="col-md-6">
            <img src={heroSection} alt="Hero Section" className="img-fluid" />
          </div>

          {/* Text Column */}
          <div className="col-md-6 text-column">
            <h1 className="animated-text">Your Job Hunt Ends Here<br />We Got Your Back!</h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;

