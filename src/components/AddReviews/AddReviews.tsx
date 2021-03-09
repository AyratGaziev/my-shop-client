import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewReview } from "../../redux/slices/productsSlice";
import { AppDispatch, RootState } from "../../redux/store/store";
import "./AddReviews.css";

type AddReviewsType = {
    pordId: string;
};

const AddReviews: React.FC<AddReviewsType> = ({ pordId }) => {
    const dispatch = useDispatch<AppDispatch>();

    const [advantages, setAdvantages] = useState("");
    const [limitations, setLimitations] = useState("");
    const [comments, setComments] = useState("");

    const name = useSelector((state: RootState) => state.user.username);

    const canSubmit = [advantages, limitations, comments].every(
        (value) => value !== ""
    );

    const SubmitReview = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (canSubmit) {
            try {
                const resultAction = await dispatch(
                    addNewReview({
                        advantages,
                        comments,
                        limitations,
                        name,
                        prodId: pordId
                    })
                );
                unwrapResult(resultAction);
                setAdvantages("");
                setLimitations("");
                setComments("");
            } catch (err) {
                console.error("Не удалось сохранить отзыв ", err);
            }
        }
    };

    return (
        <div className="add-reviews">
            <h2 className="add-reviews__title">Новый отзыв</h2>
            <form
                onSubmit={SubmitReview}
                className="add-reviews__form"
                id="review">
                <label>
                    Преимущества:
                    <textarea
                        form="review"
                        className="add-reviews__textarea"
                        value={advantages}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                            setAdvantages(e.target.value)
                        }
                        name="advantages"
                        id="advantages"></textarea>
                </label>
                <label>
                    Недостатки:
                    <textarea
                        form="review"
                        className="add-reviews__textarea"
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                            setLimitations(e.target.value)
                        }
                        value={limitations}
                        name="limitations"
                        id="limitations"></textarea>
                </label>
                <label>
                    Комментарии:
                    <textarea
                        form="review"
                        className="add-reviews__textarea"
                        value={comments}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                            setComments(e.target.value)
                        }
                        name="comments"
                        id="comments"></textarea>
                </label>
                <button className="add-reviews__submit" type="submit">
                    Оставить отзыв
                </button>
            </form>
        </div>
    );
};

export default AddReviews;
