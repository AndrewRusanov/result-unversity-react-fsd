import { Character } from './Character'
import { Episode } from './Episode'
import { Location } from './Location'

export type CategoryType = 'character' | 'location' | 'episode'

export type CategoryItem = Character | Episode | Location
