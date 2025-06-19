import { Loader } from '@/widgets'
import { CategoryItem, CategoryType } from '@shared/types/categoriesTypes'
import { Character } from '@shared/types/Character'
import { Location } from '@shared/types/Location'
import { useFetchData } from '@shared/utils/useFetchData'
import { FC } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import styles from './Details.module.scss'

interface Props {
  category: CategoryType
}

const Details: FC<Props> = ({ category }) => {
  const { id } = useParams<{ id: string }>()

  const pageNumber = Math.ceil(Number(id) / 20)

  const { items, isLoading, error } = useFetchData(category, pageNumber)

  const item = items.find(item => item.id === Number(id))

  const isCharacter = (item: CategoryItem): item is Character => {
    return (item as Character).image !== undefined
  }

  const isLocation = (item: CategoryItem): item is Location => {
    return (item as Location).dimension !== undefined
  }

  if (isLoading) return <Loader text='Загрузка данных...' />
  if (error) return <div>Ошибка загрузки данных: {error}</div>
  if (!item) return <div>Элемент не найден 0_о</div>

  return (
    <div className={styles.details}>
      <NavLink to={`/${category}`} className={styles.backLink}>
        Вернуться к {category}
      </NavLink>
      <div className={styles.content}>
        {isCharacter(item) && (
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
        )}

        {isLocation(item) && (
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
        )}

        {!isCharacter(item) && !isLocation(item) && (
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
        )}
      </div>
    </div>
  )
}

export default Details
