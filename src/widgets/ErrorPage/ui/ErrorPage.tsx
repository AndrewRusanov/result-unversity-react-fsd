import styles from './ErrorPage.module.scss'

const ErrorPage = () => {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.portalAnimation}>
        <div className={styles.portalCircle} />
        <div className={styles.portalGlow} />
      </div>
      <h1 className={styles.errorTitle}>WUBBA LUBBA DUB-DUB!</h1>
      <h2 className={styles.errorCode}>Ошибка 0_о</h2>
      <p className={styles.errorMessage}>
        Упс! Похоже, вы попали в неизвестное измерение.
      </p>
      <p className={styles.errorSubmessage}>
        Не волнуйся, Морти. Просто бери свой портальный пистолет и давай
        убираться отсюда!
      </p>
      <button className={styles.portalButton}>Портальная пушка</button>
    </div>
  )
}

export default ErrorPage
