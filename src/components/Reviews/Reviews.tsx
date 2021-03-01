import React from 'react';
import { ProductReviewsType } from '../../types';
import { ReactComponent as UserAvatar } from './man.svg'
import './Reviews.css'

type ReviewsPropsType = {
    reviews: ProductReviewsType
}

const Reviews: React.FC<ReviewsPropsType> = ({reviews}) => {
    
    let showReviews

    if (reviews.length !== 0) {
        showReviews = reviews.map(review => {
            return (
                <div className='review__item' key={review._id} >
                    <div className='review__name-wrapper'>
                        <UserAvatar className = 'review__avatar'/>
                        <div className='review__name'>{review.name}</div>
                    </div>

                    <h3 className = 'review__header'>Преимущества</h3>
                    <div>{review.advantages}</div>
                    <h3 className = 'review__header'>Недостатки</h3>
                    <div>{review.limitations}</div>
                    <h3 className = 'review__header'>Комментарии</h3>
                    <div>{review.comments}</div>
                </div>

            )
        })
    } else {
        showReviews = null
    }

    return (
        <div className='review'>
            <h2 className='review__title'>{reviews.length === 0 ? 'Пока нет отзывов': 'Отзывы'}</h2>
            {showReviews}
        </div>
    );
}

export default Reviews;
