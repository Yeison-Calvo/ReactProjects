import {products as initialProducts} from './mocks/products.json'
import {Header} from './components/header.jsx' 
import { useState } from 'react'
import { Products } from './components/Products.jsx'
import { Cart } from './components/Cart.jsx'
import './App.css'

import { useFilters } from './hooks/useFilters.jsx'




function App() {
  const [products] = useState(initialProducts)
  const {filterProducts} = useFilters()

  const filteredProducts= filterProducts(products)

  return (
    <>
     
      <Header/>  {/* Props drill, I need the setFilters on the component filters
      this it's sending the setFilters to the header and the header it's sending the setFilters to the filters component so the best way to make this
      it's by changing to the useContext*/}
      <Cart />
      <Products products={filteredProducts}/>
    </>
  )
}

export default App
