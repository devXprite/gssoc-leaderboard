import { CgSpinner } from 'react-icons/cg';

const loading = () => {
    return (
            <div className="mt-44 md:mt-64 text-center">
                <CgSpinner className="mx-auto animate-spin text-6xl text-primary-500 md:text-7xl" />
                <p className=" mt-3 animate-pulse font-medium md:text-xl">Please Wait...</p>
            </div>
    );
};

export default loading;
