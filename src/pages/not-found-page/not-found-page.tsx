import {Helmet} from 'react-helmet-async';
import {Link} from 'react-router-dom';
import Header from '../../components/header/header.tsx';
import {AppRoute} from '../../const.ts';

import styles from './not-found-page.module.css';

interface NotFoundPageProps {
  text?: string;
}

function NotFoundPage({text = 'Something went wrong'}: Readonly<NotFoundPageProps>) {

  return (
    <div className="page page--not-found" data-testid="not-found-page">
      <Helmet>
        <title>6 Sites - 404</title>
      </Helmet>
      <Header/>

      <main className="page__main">
        <div className={styles.container}>
          <h1 className={styles.heading}>
            Oops! - 404
            <br/>
            <small className={styles.text}>{text}</small>
          </h1>
          <Link to={AppRoute.Main} className={styles.link}>Return Home</Link>
        </div>
      </main>
    </div>
  );
}

export default NotFoundPage;
