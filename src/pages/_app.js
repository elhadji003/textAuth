import '../app/page.module.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Cookies from 'js-cookie';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      axios.defaults.headers.common['x-auth-token'] = token;
    } else {
      delete axios.defaults.headers.common['x-auth-token'];
    }
  }, [router]);

  return <Component {...pageProps} />;
}

export default MyApp;
