import {Filters} from './Filters.jsx'
export function Header(){
    return (
        <header>
            <h1>React Shop</h1>
            {/* sends the parameter changeFilters as onChange, thsi came from the drill as the setFilters */}
            <Filters/> 
        </header>
    )
}