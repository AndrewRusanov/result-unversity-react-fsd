import { CategoryItem } from '@shared/types/categoriesTypes'
import { Character } from '@shared/types/Character'
import { Episode } from '@shared/types/Episode'
import { Location } from '@shared/types/Location'
import { FC } from 'react'
import styles from './CategoryCard.module.scss'

interface Props {
  item: Location | Episode | Character
}

const CategoryCard: FC<Props> = ({ item }) => {
  const isCharacter = (item: CategoryItem): item is Character => {
    return (item as Character).image !== undefined
  }

  const isEpisode = (item: CategoryItem): item is Episode => {
    return (item as Episode).air_date !== undefined
  }

  if (isCharacter(item)) {
    return (
      <>
        <img src={item.image} alt={item.name} className={styles.image} />
        <h2 className={styles.subtitle}>{item.name}</h2>
        <p>Вид: {item.species}</p>
      </>
    )
  }

  if (isEpisode(item)) {
    return (
      <>
        <h2 className={styles.subtitle}>{item.name}</h2>
        <p className={styles.text}>Эпизод: {item.episode}</p>
        <p className={styles.text}>Дата выхода: {item.air_date}</p>
      </>
    )
  }

  if (!isCharacter(item) && !isEpisode(item)) {
    return (
      <>
        <h2 className={styles.subtitle}>{item.name}</h2>
        <p className={styles.text}>Тип: {item.type}</p>
        <p className={styles.text}>
          Измерение: {item.dimension || 'Неизвестно'}
        </p>
      </>
    )
  }
}

export default CategoryCard
