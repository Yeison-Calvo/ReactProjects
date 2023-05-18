import { createContext, useState } from 'react'

// create the context
export const FiltersContext= createContext()

// create the provider, in order to provide the context

export function FiltersProvider({ children }){
    const [filters, setFilters] = useState({
        category: 'all',
        minPrice: 0
    })

    return (
        <FiltersContext.Provider value={{
            filters,
            setFilters
        }}>
            { children }
            </FiltersContext.Provider>
    )
}