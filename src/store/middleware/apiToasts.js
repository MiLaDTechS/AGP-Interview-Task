import toast from "react-hot-toast";
import * as actions from "../apiActions";

const apiToast = () => next => action => {
    if (action.type !== actions.apiCallFailed.type) return next(action);

    const { message } = action.payload;
    toast.error(message, {
        style: {
            background: '#333',
            color: '#fff',
            fontSize: 12,
            direction: 'ltr'
        },
        position: 'top-right'
    });

    next(action);
};

export default apiToast;
