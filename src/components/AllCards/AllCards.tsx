import React, {useEffect, useState} from 'react';
import './AllCards.css'
import Card from '../Card/Card';
import {ProductsListType} from '../../types'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { getSomeProducts } from '../../redux/slices/productsSlice';
import Spinner from '../Spinner/Spinner';

const AllCards: React.FC = () => {
  
  const products = useSelector((state: RootState): ProductsListType => state.products)
  const dispatch = useDispatch()
  const [start, setStart] = useState<number>(0)
  console.log(start);
  

  useEffect(() => {    
    dispatch(getSomeProducts({limit: 8, start: start})) 
  }, [start, dispatch])

  const cardList = products.map(product => <Card key={product._id} product={product} />)
  

  return (
    <>
      <div className="cards">
          {cardList.length !== 0 ? cardList : <Spinner/>}      
      </div>
      {cardList.length !== 0
        ? <button
          className="cards__btn"
          onClick={() => setStart(prevCount => prevCount + 8)}>Показать еще</button>
        : null}
    </>      
  );
}

export default AllCards;
