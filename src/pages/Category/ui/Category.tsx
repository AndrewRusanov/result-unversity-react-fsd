import { CategoryCard } from '@/entities'
import { useFetchData } from '@/shared/utils/useFetchData'
import { Loader } from '@/widgets'
import { CategoryType } from '@shared/types/categoriesTypes'
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
                <CategoryCard item={item} />
              </NavLink>
            )
          }
          return (
            <NavLink
              key={item.id}
              to={`/${category}/${item.id}`}
              className={styles.card}
            >
              <CategoryCard item={item} />
            </NavLink>
          )
        })}
      </div>
    </div>
  )
}

export default Category
