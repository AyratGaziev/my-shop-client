import React from "react";
import { useSelector } from "react-redux";
import { Link, RouteComponentProps } from "react-router-dom";
import { RootState } from "../../redux/store/store";
import "./Order.css";

type OrderParamsType = {
    id: string;
};

const Order: React.FC<RouteComponentProps<OrderParamsType>> = ({ match }) => {
    const { id } = match.params;
    const allOrders = useSelector((state: RootState) => state.orders);

    const selectedOrder =
        allOrders.length > 0
            ? allOrders.find((order) => order._id === id)
            : null;

    const orderList = selectedOrder
        ? selectedOrder.products.map((product) => {
              return (
                  <div key={product.prodId} className="order__list-item">
                      <Link
                          to={`/productOverview/${product.prodId}`}
                          className="order__list-name">
                          {product.name}
                      </Link>
                      <div className="order__list-count">
                          {product.count} шт.
                      </div>
                      <div className="order__list-price">{product.price} ₽</div>
                  </div>
              );
          })
        : null;

    return (
        <div className="order">
            <h2 className="order__title">Заказ #{id}</h2>
            <div className="order__list">{orderList}</div>
            <div className="order__total">Итого: {selectedOrder?.total} ₽</div>
        </div>
    );
};

export default Order;
