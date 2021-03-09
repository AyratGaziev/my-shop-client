import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    getSomeProducts,
    setNewSearch,
    setStart
} from "../../redux/slices/productsSlice";
import { RootState } from "../../redux/store/store";
import {
    ProductsListType,
    ProductCategoryType
} from "../../Types/ProductTypes";
import Card from "../Card/Card";
import Spinner from "../Spinner/Spinner";
import "./Search.css";

type AllCardsPropsType = {
    category: ProductCategoryType;
};

//ЭТОТ КОМПОНЕНТ НЕ РАБОТАЕТ!!!!!!!!!!!!!

const Search: React.FC<AllCardsPropsType> = ({ category }) => {
    const products = useSelector(
        (state: RootState): ProductsListType =>
            state.products[category].products
    );
    const status = useSelector(
        (state: RootState): string => state.products[category].loadingStatus
    );
    const loading = useSelector(
        (state: RootState): boolean => state.products.loading
    );
    const start = useSelector(
        (state: RootState): number => state.products[category].start
    );

    const dispatch = useDispatch();

    const [sort, setSort] = useState("1");

    const limit = 4;

    useEffect(() => {
        if (
            products.length === 0 ||
            (status !== "done" && start === products.length)
        ) {
            dispatch(getSomeProducts({ limit, start, category, sort }));
        }
    }, [start, products.length]);

    let cardList;

    if (products.length > 0) {
        cardList = products.map((product) => {
            return (
                <Link
                    key={product._id}
                    className="card__link"
                    to={`/product/${product._id}/${category}`}>
                    <Card product={product} />
                </Link>
            );
        });
    } else if (products.length === 0) {
        cardList = <h2>Ничего не найдено</h2>;
    } else {
        cardList = null;
    }

    const sortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSort(e.target.value);
            dispatch(setNewSearch());
        }
    };

    //Вынести card__sort в отдельный компонент
    return (
        <div className="cards">
            <div className="cards__sort">
                <h2>Показать</h2>
                <form className="cards__sort-form">
                    <input
                        onChange={sortChange}
                        className="cards__sort-input"
                        type="radio"
                        value="1"
                        name="sort"
                        id="inrease"
                    />
                    <label htmlFor="inrease" className="cards__sort-label">
                        по возрастанию цены
                    </label>

                    <input
                        onChange={sortChange}
                        className="cards__sort-input"
                        type="radio"
                        value="0"
                        name="sort"
                        id="decrease"
                    />
                    <label htmlFor="decrease" className="cards__sort-label">
                        по убыванию цены
                    </label>
                </form>
            </div>

            <div className="cards__wrapper">{cardList}</div>
            {loading === true ? <Spinner /> : null}
            {status !== "done" && loading === false ? (
                <button
                    className="cards__btn"
                    onClick={() => dispatch(setStart(category))}>
                    Показать еще
                </button>
            ) : null}
        </div>
    );
};

export default Search;
