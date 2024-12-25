import { FC } from 'react';
import DetailCard from '../components/detailCard';

const HomePage: FC = () => {
    return (
        <div className="w-screen h-screen grid grid-cols-1 content-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <DetailCard
                name={'Code Genx'}
                title={'Code Generation Task'}
                img={'./src/assets/codeGenx.png'}
                route={'/code-genx'}
            />
            <DetailCard
                name={'Doc Sumex'}
                title={'Document Summarization Task'}
                img={'./src/assets/codeGenx.png'}
                route={'/doc-sumex'}
            />
            <DetailCard
                name={'Web Intx'}
                title={'Web Interaction Task'}
                img={'./src/assets/codeGenx.png'}
                route={'/web-intx'}
            />
            <DetailCard
                name={'Gen Query'}
                title={'General Queries Task'}
                img={'./src/assets/images.jpeg'}
                route={'/gen-query'}
            />
        </div>
    );
};

export default HomePage;
