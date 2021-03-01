import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link} from 'react-router-dom';
import { getSomeProducts, setStart } from '../../redux/slices/productsSlice';
import { RootState } from '../../redux/store/store';
import { ProductsListType, ProductCategoryType } from '../../types';
import Card from '../Card/Card';
import Spinner from '../Spinner/Spinner';
import './Search.css'

type AllCardsPropsType = { 
    category: ProductCategoryType
}

const Search: React.FC<AllCardsPropsType> = ({category}) => {

    const products = useSelector((state: RootState): ProductsListType => state.products[category].products)
    const status = useSelector((state: RootState): string => state.products[category].loadingStatus)
    const loading = useSelector((state: RootState): boolean => state.products.loading)
    const start = useSelector((state: RootState): number => state.products[category].start)
    
    const dispatch = useDispatch()
    
    const limit = 4

    useEffect(() => {         
        if (products.length === 0 || (status !== 'done'&& start === products.length)) {
            dispatch(getSomeProducts({limit, start, category})) 
        }
    }, [start, products.length])

    let cardList

    if (products.length > 0) {
        cardList = products.map(product => {
            return (
                <Link key={product._id}
                    className='card__link'
                    to={`/product/${product._id}/${category}`}>
                    <Card  product={product} />                
                </Link>                
            )
        } )
    } else {
        cardList = null
    }

    return (
    <div className = 'cards'>
        <div className="cards__wrapper">
            {cardList}                
        </div>
        {loading === true ? <Spinner/> : null}  
        {(status !== 'done' && loading === false)
            ? <button
                className="cards__btn"
                onClick={() => dispatch(setStart(category))}>Показать еще</button>
            : null
        }
    </div>      
    );
}

export default Search;
