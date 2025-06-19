import { FC } from 'react'
import styles from './Loader.module.scss'

interface LoaderProps {
  text?: string
}

const Loader: FC<LoaderProps> = ({ text }) => {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.portalLoader}>
        <div className={styles.portalInner}></div>
        <div className={styles.portalCore}></div>
      </div>
      {text && <p className={styles.loaderText}>{text}</p>}
    </div>
  )
}

export default Loader
