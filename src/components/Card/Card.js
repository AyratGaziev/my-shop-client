import React, {useState, useEffect} from 'react';
import './Card.css'
import url from '../../url';
import axios from 'axios'
import ImageItem from '../Image/ImageItem'

const Card = () => {
  

  const [data, setData] = useState([])  

  useEffect(() => {

    if (data.length === 0) {
      const fetchData = async () => {
        try {
            const response = await axios.get(`${url}/product/tv`)      
            const data = response.data
            if (!data) {
              throw new Error('Error')
            }
            setData(data)
          }
        catch (err) {
          console.log(err);
        }
      }

      fetchData()
    }    

  }, [data.length])



  let list

  if(data.length === 0) {
    list = <li>Loading....</li>
  }  

  if (data.length > 0) {
    list = data.map(item => {
      return (
        <div key={item._id} className = "container">
          <h1>{item.name}</h1>
          <h2>{`Цена: ${item.price}`}</h2>

          <div className = 'wrapper'>

            <div>{`Категория: ${item.category}`}</div>
            <div>{`Подкатегория: ${item.subcategory}`}</div>
            <div>{`Диагональ: ${item.diagonal}`}</div>
            <div>{`Смарт: ${item.smart}`}</div>
            <div>{`wifi: ${item.wifi}`}</div>
            <div className="desc">{`Описанние: ${item.description}`}</div>
          </div>
          <div>
            
          </div>
        </div>
      )
    })
  } 

  return (
    <div className="card">
      <div className="card__list">
        {list}
      </div>
      <ImageItem fullUrl={`${url}/img/products/electronics/tv/1.webp`} placeholderHeight={"350"}/>
    </div>
  );
}

export default Card;
