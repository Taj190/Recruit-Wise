import  { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AntDesignOutlined, UserAddOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import './Service.css';

const FeaturedServices = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    });

    const servicesSection = document.getElementById('featured-services');
    if (servicesSection) {
      observer.observe(servicesSection);
    }

    return () => {
      if (servicesSection) {
        observer.unobserve(servicesSection);
      }
    };
  }, []);

  return (
    <div id="featured-services" className="featured-services">
      <h2 className="services-title">Our Featured Services</h2>
      <h4 className="services-subtitle">What We Do</h4>
      <div className="services-container">
        <motion.div
          className={`service-card first cards first-card ${isVisible ? 'visible' : ''}`}
          initial={{ opacity: 0, y: -350 }} // Animate from the top
          animate={isVisible ? { opacity: 1, y: 20 } : { opacity: 0, y: -50 }}
          transition={{ duration: 0.6 }}
        >
          <AntDesignOutlined className="service-icon" />
          <h3>Temporary Employment</h3>
          <p>We provide flexible staffing solutions to meet your immediate needs. Our team specializes in connecting employers with temporary workers, ensuring a seamless hiring process.</p>
        </motion.div>
        <motion.div
          className={`service-card center cards ${isVisible ? 'visible' : ''}`}
          initial={{ opacity: 0, y: 350 }} // Animate from the top
          animate={isVisible ? { opacity: 1, y: -20 } : { opacity: 0, y: -50 }}
          transition={{ duration: 0.6 }}
        >
          <UserAddOutlined className="service-icon" />
          <h3>Provision of Services</h3>
          <p>We offer comprehensive service packages tailored to your specific requirements. Our dedicated team ensures you receive high-quality support every step of the way.</p>
        </motion.div>
        <motion.div
          className={`service-card third cards ${isVisible ? 'visible' : ''}`}
          initial={{ opacity: 0, x: -350 }} // Animate from the top
          animate={isVisible ? { opacity: 0.9, x: 10 } : { opacity: 0.8, y: -50 }}
          transition={{ duration: 0.6 }}
        >
          <SafetyCertificateOutlined className="service-icon" />
          <h3>Recruitment</h3>
          <p>Our expert recruitment services help you find the right talent for your organization. We focus on understanding your needs and delivering the best candidates.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default FeaturedServices;
