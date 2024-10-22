import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import './employment.css';

const areas = [
  { title: 'Health', description: 'Providing healthcare and support to individuals, ensuring their well-being.' },
  { title: 'Restaurants & Hospitality', description: 'Serving guests and ensuring a welcoming experience in hotels, cafes, and restaurants.' },
  { title: 'Administrative Services', description: 'Managing office tasks, paperwork, and communication to keep businesses running smoothly.' },
  { title: 'Industry & Production', description: 'Operating machinery and overseeing production in various industrial settings.' },
  { title: 'Agriculture', description: 'Working in farming, harvesting, and other agricultural operations.' },
  { title: 'Logistics', description: 'Coordinating and managing the transportation of goods.' },
  { title: 'Maintenance', description: 'Ensuring equipment and facilities are well-maintained and operational.' },
  { title: 'Construction', description: 'Building infrastructure, homes, and commercial properties.' }
];

const AreaOfEmployment = () => {
    const sectionRef = useRef(null);
    const [inView, setInView] = useState(false);
  
    useEffect(() => {
      const handleScroll = () => {
        const { top, bottom } = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Check if the section is in the viewport
        if (top < windowHeight && bottom > 0) {
          setInView(true);
        } else {
          setInView(false);
        }
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
    
    return (
      <section className="employment-section" ref={sectionRef}>
        <h2 className="employment-heading">Area of Employment</h2>
        <div className="container">
          {/* First Row */}
          <div className="row">
            {areas.slice(0, 4).map((area, index) => (
              <motion.div
                className="col-md-3 col-sm-6"
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="employment-card">
                  <h3>{area.title}</h3>
                  <p>{area.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
  
          {/* Second Row */}
          <div className="row">
            {areas.slice(4).map((area, index) => (
              <motion.div
                className="col-md-3 col-sm-6"
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="employment-card">
                  <h3>{area.title}</h3>
                  <p>{area.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  };

export default AreaOfEmployment;
