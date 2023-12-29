import './Modal.scss';

function Modal({
        active,
        // onOpen,
        onClose,
        children,
    }) {
    const getClassName = (name = '') => {
        return 'modal' + name + (active ? ' active' : '')
    }

    return (
        <div
            className={getClassName()}
            onClick={onClose}
        >
            <div
                className={getClassName('__content')}
                onClick={(evt) => evt.stopPropagation()}
            >
                { children }
            </div>
        </div>
    );
}

export default Modal;