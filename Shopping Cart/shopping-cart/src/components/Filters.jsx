import { useId, useState } from 'react'
import './filters.css'
import { useFilters } from '../hooks/useFilters.jsx'
export function Filters(){

    const { filters, setFilters} = useFilters()

    const [minPrice, setMinPrice] = useState(0)
    const minPriceFildterId = useId()
    const categoryuFilterId = useId()

    const handleMinPriceChange = (e) =>{
        setMinPrice(e.target.value)
        setFilters(prevState =>({
            ...prevState,
            minPrice: e.target.value
        }))
    }


    const handleCategoryChange = (e) =>{
        setFilters(prevState =>({
            ...prevState,
            category: e.target.value
        }))
    }

    return (
        <section className="filters">
            <div>
                <label htmlFor={minPriceFildterId}>Price</label>
                <input 
                    type="range" 
                    id={minPriceFildterId}
                    min='0' 
                    max='1000'
                    onChange={handleMinPriceChange}
                    value={filters.minPrice}
                    />
                    
                    <span>${filters.minPrice}</span>
            </div>
            <div>
                <label htmlFor={categoryuFilterId}>Categories</label>
                <select id={categoryuFilterId} onChange={handleCategoryChange}>

                    <option value="all">All</option>
                    <option value="laptops">Laptops</option>
                    <option value="smarthphones">Smart Phones</option>

                </select>
            </div>
        </section>
    )
}