import { Character } from '@/shared/types/Character'
import { Episode } from '@/shared/types/Episode'
import { useFetchData } from '@/shared/utils/useFetchData'
import { Loader } from '@/widgets'
import { CategoryItem, CategoryType } from '@shared/types/categoriesTypes'
import { FC, useCallback, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Category.module.scss'

interface Props {
  category: CategoryType
}

const Category: FC<Props> = ({ category }) => {
  const [pageNumber, setPageNumber] = useState<number>(1)
  const observer = useRef<IntersectionObserver | null>(null)

  const { items, isLoading, error, hasMore } = useFetchData(
    category,
    pageNumber
  )

  const lastNodeRef = useCallback(
    (node: HTMLAnchorElement | null) => {
      if (isLoading) return
      if (observer.current) {
        observer.current.disconnect()
      }

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber(prev => prev + 1)
        }
      })
      if (node) {
        observer.current.observe(node)
      }
    },
    [isLoading, hasMore]
  )

  const isCharacter = (item: CategoryItem): item is Character => {
    return (item as Character).image !== undefined
  }

  const isEpisode = (item: CategoryItem): item is Episode => {
    return (item as Episode).air_date !== undefined
  }

  if (isLoading) return <Loader text='Загрузка данных...' />
  if (error) return <div>Ошибка загрузки данных: {error}</div>

  return (
    <div className={styles.category}>
      <h1 className={styles.title}>
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </h1>
      <div className={styles.grid}>
        {items.map((item, index) => {
          if (items.length - 5 === index + 1) {
            return (
              <NavLink
                ref={lastNodeRef}
                key={item.id}
                to={`/${category}/${item.id}`}
                className={styles.card}
              >
                {isCharacter(item) && (
                  <>
                    <img
                      src={item.image}
                      alt={item.name}
                      className={styles.image}
                    />
                    <h2 className={styles.subtitle}>{item.name}</h2>
                    <p>Вид: {item.species}</p>
                  </>
                )}
                {isEpisode(item) && (
                  <>
                    <h2 className={styles.subtitle}>{item.name}</h2>
                    <p className={styles.text}>Эпизод: {item.episode}</p>
                    <p className={styles.text}>Дата выхода: {item.air_date}</p>
                  </>
                )}
                {!isCharacter(item) && !isEpisode(item) && (
                  <>
                    <h2 className={styles.subtitle}>{item.name}</h2>
                    <p className={styles.text}>Тип: {item.type}</p>
                    <p className={styles.text}>
                      Измерение: {item.dimension || 'Неизвестно'}
                    </p>
                  </>
                )}
              </NavLink>
            )
          }
          return (
            <NavLink
              key={item.id}
              to={`/${category}/${item.id}`}
              className={styles.card}
            >
              {isCharacter(item) && (
                <>
                  <img
                    src={item.image}
                    alt={item.name}
                    className={styles.image}
                  />
                  <h2 className={styles.subtitle}>{item.name}</h2>
                  <p>Вид: {item.species}</p>
                </>
              )}
              {isEpisode(item) && (
                <>
                  <h2 className={styles.subtitle}>{item.name}</h2>
                  <p className={styles.text}>Эпизод: {item.episode}</p>
                  <p className={styles.text}>Дата выхода: {item.air_date}</p>
                </>
              )}
              {!isCharacter(item) && !isEpisode(item) && (
                <>
                  <h2 className={styles.subtitle}>{item.name}</h2>
                  <p className={styles.text}>Тип: {item.type}</p>
                  <p className={styles.text}>
                    Измерение: {item.dimension || 'Неизвестно'}
                  </p>
                </>
              )}
            </NavLink>
          )
        })}
      </div>
    </div>
  )
}

export default Category
