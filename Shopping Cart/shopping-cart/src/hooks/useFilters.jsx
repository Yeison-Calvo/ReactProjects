import { FiltersContext } from '../context/filters.jsx'
import { useContext } from 'react'


export function useFilters(){
    // const [filters, setFilters] = useState({
    //   category: 'laptops',
    //   minPrice: 100
    // })
    const {filters, setFilters} = useContext(FiltersContext) // call the context we create earlier on ./context/filters.jsx this access to the value
    // the value it's asigned on the provider
  
  
    const filterProducts = (products) => {
      return products.filter(product =>{
        return (
          product.price >= filters.minPrice &&
          (
            filters.category == 'all' || product.category == filters.category
          )
        )
      })
    }
  
    return {filters, filterProducts, setFilters}
  }