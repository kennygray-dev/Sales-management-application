import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';



function Contact() {
  return ( 
    <div className="contact" id="contact">
        <h2>Make an enquiry</h2>
        <p>Send us an email or give us a call, We will respond to you shortly.</p>
        <div className="contact-buttons-container">
          <a href="mailto:ddakestelresources@gmail.com"><button>
          <FontAwesomeIcon icon={faEnvelope} className='contact-icon'/>
          <p>Send a mail</p></button></a>
          <a href="tel:+2347033562495"><button> <FontAwesomeIcon icon={faPhone} className='contact-icon'/>
          <p>Give us a call</p></button></a>
        </div>
       
    </div>
   );
}

export default Contact;