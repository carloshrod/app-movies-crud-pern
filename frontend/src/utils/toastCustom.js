import { toast } from 'react-toastify';

export const toastLoading = () => toast.loading(
    <div className="text-center">
        Por favor, espere... <i className="fa-solid fa-hourglass fa-spin m-1" />
    </div>, { icon: false, toastId: "loadingId" })

export const toastUpdate = (loading, msg, type, theme, autoClose) => toast.update(loading, {
    render: msg,
    type: type,
    isLoading: false,
    theme: theme,
    autoClose: autoClose,
    closeOnClick: true,
    closeButton: true,
    icon: true,
})

export const toastValidate = (msg) => toast.error(
    msg,
    {
        toastId: "validate",
    });
