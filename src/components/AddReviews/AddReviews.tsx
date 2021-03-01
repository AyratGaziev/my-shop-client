import { unwrapResult } from '@reduxjs/toolkit';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewReview } from '../../redux/slices/productsSlice';
import { AppDispatch } from '../../redux/store/store';
import './AddReviews.css'

type AddReviewsType = {
    pordId: string
}

const AddReviews: React.FC<AddReviewsType> = ({pordId}) => {
    
    const dispatch = useDispatch<AppDispatch>()

    const [name, setName] = useState('')
    const [advantages, setAdvantages] = useState('')
    const [limitations, setLimitations] = useState('')
    const [comments, setComments] = useState('')   

    const canSubmit = [name, advantages, limitations, comments].every(value => value !== '')


    const SubmitReview = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (canSubmit) {
            try {
                const resultAction = await dispatch(addNewReview({
                    advantages,
                    comments,
                    limitations,
                    name,
                    prodId: pordId
                }))
                unwrapResult(resultAction)
                setName('')
                setAdvantages('')
                setLimitations('')
                setComments('')
            } catch (err) {
                console.error('Failed to save the review: ',err)
            }
        }      
    }
  

    return (
        <div className='add-reviews'>
            <h2 className="add-reviews__title">Новый отзыв</h2>
            <form
                onSubmit = {SubmitReview}
                className='add-reviews__form'
                id='review'>
                <label>
                    Имя: 
                    <input
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                        className="add-reviews__name"
                        value ={name}
                        name='username'
                        id='name'
                        type="text" />
                </label>
                <label>
                    Преимущества: 
                    <textarea
                        form='review'
                        className='add-reviews__textarea'
                        value = {advantages}
                        onChange = {(e: React.ChangeEvent<HTMLTextAreaElement>) => setAdvantages(e.target.value)}
                        name="advantages"
                        id="advantages"></textarea>
                </label>
                <label>
                    Недостатки:
                    <textarea
                        form='review'
                        className='add-reviews__textarea'
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setLimitations(e.target.value)}
                        value={limitations}
                        name="limitations" id="limitations"></textarea>
                </label>
                <label>
                    Комментарии:
                    <textarea
                        form='review'
                        className='add-reviews__textarea'
                        value={comments}
                        onChange = {(e: React.ChangeEvent<HTMLTextAreaElement>) => setComments(e.target.value)}
                        name="comments" id="comments"></textarea>
                </label>  
                <button className='add-reviews__submit' type="submit">Оставить отзыв</button>
            </form>

        </div>
    );
}

export default AddReviews;
