import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { UserOutlined, ClockCircleOutlined, FastForwardOutlined, CheckCircleOutlined } from '@ant-design/icons';
import './About.css';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const aboutRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      // Ensure entry is valid before setting visibility
      if (entry.isIntersecting) {
        setIsVisible(true);
      } else {
        setIsVisible(false); // Optionally reset visibility when not intersecting
      }
    });

    const currentRef = aboutRef.current; // Cache the current value of the ref

    if (currentRef) {
      observer.observe(currentRef); // Start observing if the ref is valid
    }
   
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef); // Cleanup: stop observing when unmounted
      }
    };
  }, []);

  const fadeInFromLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };

  const fadeInFromBottom = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div id="about" className="about-section" ref={aboutRef}>
      <motion.div
        className="row"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={fadeInFromLeft}
        transition={{ duration: 0.6 }}
      >
        <div className="col-md-6">
          <h2 className="about-title">About Us</h2>
          <p className="about-text">
            We are dedicated to connecting labor with employment opportunities. Our mission is to provide efficient staffing solutions tailored to your needs. With a focus on quality and reliability, we ensure a seamless experience for both employers and employees. Our extensive network of skilled workers is ready to meet your demands and exceed expectations.
          </p>
        </div>
        <div className="col-md-6">
          <div className="why-us">
            <div className="row">
              {[{
                icon: <UserOutlined className="big-icon" />,
                text: "Skilled Workers"
              }, {
                icon: <ClockCircleOutlined className="big-icon" />,
                text: "24/7 Availability"
              }, {
                icon: <FastForwardOutlined className="big-icon" />,
                text: "Quick Response"
              }, {
                icon: <CheckCircleOutlined className="big-icon" />,
                text: "No Bureaucracy",
                subText: "Our HR handles all documents"
              }].map((item, index) => (
                <motion.div
                  key={index}
                  className="col-6 col-md-6"
                  initial="hidden"
                  animate={isVisible ? "visible" : "hidden"}
                  variants={fadeInFromBottom}
                  transition={{ duration: 0.6, delay: 0.2 * index }}
                >
                  <div className="icon-text">
                    {item.icon}
                    <p>{item.text}</p>
                    {item.subText && <p className="sub-text">{item.subText}</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;

