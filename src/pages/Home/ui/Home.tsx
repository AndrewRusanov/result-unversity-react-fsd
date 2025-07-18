import { NavLink } from 'react-router-dom'
import styles from './Home.module.scss'

const Home = () => {
  return (
    <div className={styles.home}>
      <h1 className={styles.title}>
        Добро пожаловать во вселенную Rick & Morty!
      </h1>
      <p className={styles.subtitle}>
        Исследуйте мультивселенную с вашими любимыми персонажами, локациями и
        эпизодами популярного сериала "Рик и Морти".
      </p>
      <div className={styles.explore}>
        <h2 className={styles.start_exploring}>Начни путешествие</h2>
        <div className={styles.links}>
          <NavLink to='/character' className={styles.link}>
            Персонажи
          </NavLink>
          <NavLink to='/location' className={styles.link}>
            Локации
          </NavLink>
          <NavLink to='/episode' className={styles.link}>
            Эпизоды
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default Home
