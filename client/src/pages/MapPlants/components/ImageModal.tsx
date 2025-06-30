type Props = {
    image: string | null;
    onClose: () => void;
};

export const ImageModal = ({ image, onClose }: Props) => {
    if (!image) return null;

    return (
        <div className="modal" onClick={onClose}>
            <img src={image} alt="Увеличенное фото" className="modal__img" />
        </div>
    );
};
