import React, { useContext } from 'react';
import { postsContext } from '../../contexts/postsContext';
import Loading from './../loading/Loading';
const Diary = () => {
    const { dataPosts: { isLoading, data } } = useContext(postsContext);
    if (isLoading) {
        return <Loading />
    }
    console.log(data.posts);
    return (
        <div>
                This is Diary components
        </div>
    )
}

export default Diary;
