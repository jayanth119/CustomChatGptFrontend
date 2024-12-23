import { FC } from 'react';

interface DetailCardProps {
    name: string;
    title: string;
    img: string;
}
const DetailCard :FC<DetailCardProps> =  function detailCard({ name , title  , img} ) {
    return (
        <div className="py-8 px-8 max-w-sm mx-auto space-y-2 bg-white rounded-xl shadow-lg sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:gap-x-6">
            <img className="block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0" src={img}  alt="Image" />
            <div className="text-center space-y-2 sm:text-left">
                <div className="space-y-0.5">
                    <p className="text-lg text-black font-semibold">
                        {name}
                    </p>
                    <p className="text-slate-500 font-medium">
                        {title}
                    </p>
                </div>
                <button className="px-4 py-1 text-sm text-red-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-green-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2">Click</button>
            </div>
        </div>
    );
}

export default DetailCard; 