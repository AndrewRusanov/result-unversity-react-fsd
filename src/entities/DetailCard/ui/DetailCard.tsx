import { CategoryItem } from '@shared/types/categoriesTypes'
import { Character } from '@shared/types/Character'
import { Episode } from '@shared/types/Episode'
import { Location } from '@shared/types/Location'
import { FC } from 'react'
import styles from './DetailCard.module.scss'

interface Props {
  item: Location | Character | Episode
}

const DetailCard: FC<Props> = ({ item }) => {
  const isCharacter = (item: CategoryItem): item is Character => {
    return (item as Character).image !== undefined
  }

  const isLocation = (item: CategoryItem): item is Location => {
    return (item as Location).dimension !== undefined
  }

  if (isCharacter(item)) {
    return (
      <>
        <div className={styles.imageContainer}>
          <img src={item.image} alt={item.name} className={styles.image} />
        </div>
        <div className={styles.info}>
          <h1>{item.name}</h1>
          <div className={styles.status}>
            <span
              className={`${styles.statusIndicator} ${
                item.status === 'Alive'
                  ? styles.alive
                  : item.status === 'Dead'
                  ? styles.dead
                  : styles.unknown
              }`}
            />
            {item.status} - {item.species}
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Пол:</span> {item.gender}
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Вид:</span> {item.species}
          </div>
        </div>
      </>
    )
  }

  if (isLocation(item)) {
    return (
      <div className={styles.info}>
        <h1>{item.name}</h1>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Тип:</span> {item.type}
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Измерение:</span>{' '}
          {item.dimension || 'Unknown'}
        </div>
      </div>
    )
  }

  if (!isCharacter(item) && !isLocation(item)) {
    return (
      <div className={styles.info}>
        <h1>{item.name}</h1>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Эпизод:</span> {item.episode}
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Дата выхода:</span>{' '}
          {item.air_date}
        </div>
      </div>
    )
  }
}

export default DetailCard
