import { $api } from '@shared/api'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Character } from '../types/Character'
import { Episode } from '../types/Episode'
import { Location } from '../types/Location'

export function useFetchData(endpoint: string, pageNumber: number) {
  const [items, setItems] = useState<(Location | Episode | Character)[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState<boolean>(false)

  useEffect(() => {
    setItems([])
  }, [endpoint])

  useEffect(() => {
    setIsLoading(true)
    setError(null)

    $api
      .get(`/${endpoint}`, {
        params: {
          page: pageNumber,
        },
      })
      .then(res => {
        setItems(prev => [...new Set([...prev, ...res.data.results])])
        setHasMore(res.data.results.length > 0)
        setIsLoading(false)
      })
      .catch(error => {
        if (axios.isCancel(error)) return
        console.error('Ошибка получения данных: ', error)
        setError(error)
      })
  }, [endpoint, pageNumber])
  return { items, isLoading, error, hasMore }
}
