import { DetailCard } from '@/entities'
import { Loader } from '@/widgets'
import { CategoryType } from '@shared/types/categoriesTypes'
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

  if (isLoading) return <Loader text='Загрузка данных...' />
  if (error) return <div>Ошибка загрузки данных: {error}</div>
  if (!item) return <div>Элемент не найден 0_о</div>

  return (
    <div className={styles.details}>
      <NavLink to={`/${category}`} className={styles.backLink}>
        Вернуться к {category}
      </NavLink>
      <div className={styles.content}>
        <DetailCard item={item} />
      </div>
    </div>
  )
}

export default Details
