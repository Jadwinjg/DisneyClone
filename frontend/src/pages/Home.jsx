import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setMovies } from '../redux/MovieSlice';
import MovieList from '../components/subcomp/MovieList';
import Header from '../components/subcomp/Header';
import Viewers from '../components/subcomp/Viewers';

const Home = () => {
  const dispatch = useDispatch();

  const allMovies = [
    { id: 1, title: '', image: '/JADWIN/disney1/images/rec1.jpg', type: 'recommend', carding: '/JADWIN/disney1/images/rec1.jpg' },
    { id: 2, title: '', image: '/JADWIN/disney1/images/rec2.jpg', type: 'recommend', carding: '/JADWIN/disney1/images/rec2.jpg' },
    { id: 3, title: '', image: '/JADWIN/disney1/images/rec3.jpg', type: 'recommend', carding: '/JADWIN/disney1/images/rec3.jpg' },
    { id: 4, title: '', image: '/JADWIN/disney1/images/rec4.jpg', type: 'recommend', carding: '/JADWIN/disney1/images/rec4.jpg' },

    { id: 5, title: '', image: '/JADWIN/disney1/images/new1.jpg', type: 'new', carding: '/JADWIN/disney1/images/new1.jpg' },
    { id: 6, title: '', image: '/JADWIN/disney1/images/new2.jpg', type: 'new', carding: '/JADWIN/disney1/images/new2.jpg' },
    { id: 7, title: '', image: '/JADWIN/disney1/images/new3.jpg', type: 'new', carding: '/JADWIN/disney1/images/new3.jpg' },
    { id: 8, title: '', image: '/JADWIN/disney1/images/new4.jpg', type: 'new', carding: '/JADWIN/disney1/images/new4.jpg' },

    { id: 9, title: '', image: '/JADWIN/disney1/images/trend1.jpg', type: 'trending', carding: '/JADWIN/disney1/images/trend1.jpg' },
    { id: 10, title: '', image: '/JADWIN/disney1/images/trend2.jpg', type: 'trending', carding: '/JADWIN/disney1/images/trend2.jpg' },
    { id: 11, title: '', image: '/JADWIN/disney1/images/trend3.jpg', type: 'trending', carding: '/JADWIN/disney1/images/trend3.jpg' },
    { id: 12, title: '', image: '/JADWIN/disney1/images/trend4.jpg', type: 'trending', carding: '/JADWIN/disney1/images/trend4.jpg' },

    { id: 13, title: '', image: '/JADWIN/disney1/images/org1.jpg', type: 'original', carding: '/JADWIN/disney1/images/org1.jpg' },
    { id: 14, title: '', image: '/JADWIN/disney1/images/org2.jpg', type: 'original', carding: '/JADWIN/disney1/images/org2.jpg' },
    { id: 15, title: '', image: '/JADWIN/disney1/images/org3.jpg', type: 'original', carding: '/JADWIN/disney1/images/org3.jpg' },
    { id: 16, title: '', image: '/JADWIN/disney1/images/org4.jpg', type: 'original', carding: '/JADWIN/disney1/images/org4.jpg' },
  ];

  useEffect(() => {
    dispatch(setMovies(allMovies));
  }, [dispatch]);

  return (
    <div className="min-h-screen w-full bg-home-bg bg-cover bg-fixed bg-center bg-no-repeat px-5 pb-10">
      <Header />
      <Viewers />
      <MovieList title="Recommended Movies" movies={allMovies.filter(m => m.type === 'recommend')} />
      <MovieList title="New to CineHub" movies={allMovies.filter(m => m.type === 'new')} />
      <MovieList title="Trending Movies" movies={allMovies.filter(m => m.type === 'trending')} />
      <MovieList title="Original Movies" movies={allMovies.filter(m => m.type === 'original')} />
    </div>
  );
};

export default Home;
