import React from "react";
import "./MessagePopUp.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { clearProductMessage } from "../../redux/slices/productsSlice";
import { clearUserMessage } from "../../redux/slices/userSlice";

const MessagePopUp: React.FC = () => {
    const producstMessage = useSelector(
        (state: RootState) => state.products.message
    );
    const userMessage = useSelector((state: RootState) => state.user.message);
    const dispatch = useDispatch();
    return (
        <div
            className={
                producstMessage || userMessage !== "" ? "popup show" : "popup"
            }>
            <div
                onClick={() => {
                    if (producstMessage) {
                        dispatch(clearProductMessage());
                    } else {
                        dispatch(clearUserMessage());
                    }
                }}
                className="popup__close">
                &times;
            </div>
            {producstMessage || userMessage}
        </div>
    );
};

export default MessagePopUp;
