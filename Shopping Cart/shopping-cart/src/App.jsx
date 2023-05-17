import {products as initialProducts} from './mocks/products.json'
import {Header} from './components/header.jsx' 
import { useState } from 'react'
import { Products } from './components/Products.jsx'
import './App.css'


function useFilters(){
  const [filters, setFilters] = useState({
    category: 'laptops',
    minPrice: 100
  })


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

  return {filterProducts, setFilters}
}


function App() {
  const [products] = useState(initialProducts)
  const {filterProducts, setFilters} = useFilters()

  const filteredProducts= filterProducts(products)

  return (
    <>
     
      <Header changeFilters={setFilters}/>  {/* Props drill, I need the setFilters on the component filters
      this it's sending the setFilters to the header and the header it's sending the setFilters to the filters component */}
      <Products products={filteredProducts}/>
    </>
  )
}

export default App
