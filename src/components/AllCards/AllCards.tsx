import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getSomeProducts, setStart } from '../../redux/slices/productsSlice';
import { RootState } from '../../redux/store/store';
import { ProductsListType } from '../../types';
import Card from '../Card/Card';
import Spinner from '../Spinner/Spinner';
import './AllCards.css'

type AllCardsPropsType = { 
    category: 'allProducts' | 'notebooks' | 'phones' | 'tvs'
}

const AllCards: React.FC<AllCardsPropsType> = ({category}) => {

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


    const cardList = products.map(product => <Card key={product._id} product={product} />)

    return (
    <>
        <div className="cards">
            {cardList}
            {loading === true ? <Spinner/> : null}      
        </div>
        {(status !== 'done' && loading === false)
            ? <button
                className="cards__btn"
                onClick={() => dispatch(setStart(category))}>Показать еще</button>
            : null
        }
    </>      
    );
}

export default AllCards;
