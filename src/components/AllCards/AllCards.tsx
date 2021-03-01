import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, RouteComponentProps} from 'react-router-dom';
import { getSomeProducts, setStart } from '../../redux/slices/productsSlice';
import { RootState } from '../../redux/store/store';
import { ProductsListType, ProductCategoryType } from '../../types';
import Card from '../Card/Card';
import Spinner from '../Spinner/Spinner';
import './AllCards.css'

type AllCardsParamsType = { 
    category: ProductCategoryType,
    searchText?: string
}

const AllCards: React.FC<RouteComponentProps<AllCardsParamsType>> = ({ match }) => {
    
    const { category } = match.params

    const products = useSelector((state: RootState): ProductsListType => state.products[category].products)
    const status = useSelector((state: RootState): string => state.products[category].loadingStatus)
    const loading = useSelector((state: RootState): boolean => state.products.loading)
    const start = useSelector((state: RootState): number => state.products[category].start)
    
    const dispatch = useDispatch()
    
    const limit = 4

    useEffect(() => {
        
        if ((category !== 'search') && (products.length === 0 || (status !== 'done' && start === products.length))) {     
            dispatch(getSomeProducts({limit, start, category})) 
        } else if (match.params.searchText && (products.length === 0 || (status !== 'done' && start === products.length))) {
            console.log('Work searchText AllCards');
            dispatch(getSomeProducts({limit, start, category, searchText: match.params.searchText})) 
        }
    }, [start, products.length, match.params.searchText])

    let cardList

    if (products.length > 0) {
        cardList = products.map(product => {
            return (
                <Link key={product._id}
                    className='card__link'
                    to={`/productOverview/${product._id}`}>
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

export default AllCards;