import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, RouteComponentProps } from "react-router-dom";
import {
    getSomeProducts,
    setNewSearch,
    setNewStart,
    setStart
} from "../../redux/slices/productsSlice";
import { RootState } from "../../redux/store/store";
import {
    ProductsListType,
    ProductCategoryType
} from "../../Types/ProductTypes";
import Card from "../Card/Card";
import Spinner from "../Spinner/Spinner";
import "./AllCards.css";

type AllCardsParamsType = {
    category: ProductCategoryType;
    searchText?: string;
};

const AllCards: React.FC<RouteComponentProps<AllCardsParamsType>> = ({
    match
}) => {
    const { category } = match.params;

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
            category !== "search" &&
            (products.length === 0 ||
                (status !== "done" && start === products.length))
        ) {
            dispatch(getSomeProducts({ limit, start, category, sort }));
        } else if (
            match.params.searchText &&
            (products.length === 0 ||
                (status !== "done" && start === products.length))
        ) {
            dispatch(
                getSomeProducts({
                    limit,
                    start,
                    category,
                    sort,
                    searchText: match.params.searchText
                })
            );
        }
    }, [start, products.length, match.params.searchText, sort]);

    let cardList;

    if (products.length > 0) {
        cardList = products.map((product) => {
            return (
                <Link
                    key={product._id}
                    className="card__link"
                    to={`/productOverview/${product._id}`}>
                    <Card product={product} />
                </Link>
            );
        });
    } else if (loading === false) {
        cardList = <h2>Ничего не найдено</h2>;
    }

    const sortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSort(e.target.value);
            dispatch(setNewStart(category));
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
                        checked={sort === "1"}
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
                        value="-1"
                        name="sort"
                        checked={sort === "-1"}
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

export default AllCards;
