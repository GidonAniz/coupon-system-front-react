import './Contact.css';
const Contact = () => {
    return (
        <div className="contact-container">
          <h1>You can find me on:</h1>
          <ul>
            <li>
              <a href="mailto:gidon.aniz@gmail.com" target="_blank" rel="noopener noreferrer">
                <i className="fas fa-envelope"></i>Gidon.aniz@gmail.com
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/gidon-aniz-a6b8b462/" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin"></i>Linkedin.com/in/gidon-aniz
              </a>
            </li>
            <li>
              <a href="https://github.com/GidonAniz/" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github"></i>Github.com/GidonAniz
              </a>
            </li>
          </ul>
        </div>
      );
    }
    

export default Contact;