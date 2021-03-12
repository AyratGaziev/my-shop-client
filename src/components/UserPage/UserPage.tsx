import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./UserPage.css";
import { RootState } from "../../redux/store/store";
import { ReactComponent as EmptyCart } from "./empty-cart.svg";
import { getOrders } from "../../redux/slices/ordrersSlice";
import { Link } from "react-router-dom";

const UserPage: React.FC = () => {
    const user = useSelector((state: RootState) => state.user);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getOrders({ userId: user.id }));
    }, []);

    const orders = useSelector((state: RootState) => state.orders);

    const ordersTable =
        orders.length > 0 ? (
            <table>
                <thead>
                    <tr className="user__table-header-row">
                        <th>Номер заказа</th>
                        <th>Дата</th>
                        <th>Сумма</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => {
                        return (
                            <tr
                                className="user__table-body-row"
                                key={order._id}>
                                <td>
                                    <Link
                                        className="user__table-order-link"
                                        to={`/order/${order._id}`}>
                                        {order._id}
                                    </Link>
                                </td>
                                <td>
                                    {new Date(order.date).toLocaleDateString()}
                                </td>
                                <td className="user__sum">
                                    {order.total}&#160;₽
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        ) : null;

    const showOrders =
        orders.length > 0 ? ordersTable : <EmptyCart className="user__empty" />;

    return (
        <div className="user">
            <div className="user__info">
                <h2 className="user__name">Личный кабинет {user.username}</h2>
                <div className="user__id">id: {user.id}</div>
            </div>
            <div className="user__orders">
                <h2 className="user__orders-header">Заказы</h2>
                {showOrders}
            </div>
        </div>
    );
};

export default UserPage;
