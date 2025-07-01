import ClipLoader from 'react-spinners/ClipLoader';
import './Loader.sass';

const Loader = () => {
    return (
        <div className="loader">
            <ClipLoader color="#ffffff" size={50} />
        </div>
    );
};

export default Loader;
