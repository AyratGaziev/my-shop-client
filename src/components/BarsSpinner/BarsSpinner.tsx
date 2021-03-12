import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import "./BarsSpinner.css";

const BarsSpinner: React.FC = () => {
    const reviewsLoading = useSelector(
        (state: RootState) => state.products.productOverview.reviewsLoading
    );
    const userLoading = useSelector(
        (state: RootState) => state.user.userLoading
    );
    const ordersLoading = useSelector(
        (state: RootState) => state.orders.ordersLoading
    );
    const mainLoading = useSelector(
        (state: RootState) => state.products.loading
    );

    if ((reviewsLoading || userLoading || ordersLoading) && !mainLoading) {
        return (
            <div className="bar-spinner">
                <div className="bar-spinner__wrap">
                    <div className="loadingio-spinner-bars-vs2kp1eg32f">
                        <div className="ldio-a0mhw06b3br">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </div>
                <div className="bar-spinner__bg"></div>
            </div>
        );
    } else {
        return null;
    }
};

export default BarsSpinner;
