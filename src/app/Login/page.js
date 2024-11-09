// src/pages/login.js
import Image from 'next/image';
import logo from '../images/logo1.png';
import instagram from '../images/instagram.png';
import facebook from '../images/facebook.png';
import google from '../images/google.png';
import styles from '../styles/Login.module.css';

export default function Login() {
  const handleLogin = (event) => {
    event.preventDefault(); 
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Accedi</button>
        </form>
      </div>
      <div className={styles.right}>
        <div className={styles.logo}>
          <Image src={logo} alt="Logo" width={100} height={100} />
        </div>
        <div className={styles.nome}>Amazon <br /> Prime Video</div>
        <div className={styles.socialLogin}>
          <span>Oppure accedi con:</span>
          <div className={styles.socialIcons}>
            <a href="https://www.instagram.com/accounts/login/" target="_blank" rel="noopener noreferrer">
              <Image src={instagram} alt="Instagram" width={24} height={24} />
            </a>
            <a href="https://www.facebook.com/login/" target="_blank" rel="noopener noreferrer">
              <Image src={facebook} alt="Facebook" width={24} height={24} />
            </a>
            <a href="https://accounts.google.com/signin" target="_blank" rel="noopener noreferrer">
              <Image src={google} alt="Google" width={24} height={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
