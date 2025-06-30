type Props = {
    setIsOpenModal: (value: boolean) => void;
    modalImageUrl: string;
};

const RareModal = ({ setIsOpenModal, modalImageUrl }: Props) => {
    return (
        <div className="modal" onClick={() => setIsOpenModal(false)}>
            <div
                className="modal__content"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="modal__close"
                    onClick={() => setIsOpenModal(false)}
                >
                    ×
                </button>
                <img
                    src={modalImageUrl}
                    alt="Увеличенное фото растения"
                    className="modal__image"
                />
            </div>
        </div>
    );
};

export default RareModal;
