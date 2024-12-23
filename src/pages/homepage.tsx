import { FC } from 'react';
import DetailCard from '../components/detailCard';

const HomePage :FC =  function HomePage( ) {
    return (
       <>
       <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
         <DetailCard name={'Code Genx'} title={'Code Generation  Task '} img={'./src/assets/codeGenx.png'} />
            <DetailCard name={'Doc Sumex'} title={'Document Summarization Task ! '} img={'./src/assets/codeGenx.png'} />
            <DetailCard name={'Web Intx'} title={'Web Interation  Task '} img={'./src/assets/codeGenx.png'} />
            <DetailCard name={'Gen Query'} title={'General queries  Task '} img={'./src/assets/codeGenx.png'}/>
                

       </div>
       </> 
    );
}

export default HomePage; 