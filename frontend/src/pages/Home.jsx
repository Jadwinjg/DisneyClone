import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setMovies } from '../redux/MovieSlice';
import MovieList from '../components/subcomp/MovieList';
import Header from '../components/subcomp/Header';
import Viewers from '../components/subcomp/Viewers';

const Home = () => {
  const dispatch = useDispatch();

  const allMovies = [
  { id: 1, title: '', image: '/images/rec1.jpg', type: 'recommend', carding: '/images/rec1.jpg' },
  { id: 2, title: '', image: '/images/rec2.jpg', type: 'recommend', carding: '/images/rec2.jpg' },
  { id: 3, title: '', image: '/images/rec3.jpg', type: 'recommend', carding: '/images/rec3.jpg' },
  { id: 4, title: '', image: '/images/rec4.jpg', type: 'recommend', carding: '/images/rec4.jpg' },

  { id: 5, title: '', image: '/images/new1.jpg', type: 'new', carding: '/images/new1.jpg' },
  { id: 6, title: '', image: '/images/new2.jpg', type: 'new', carding: '/images/new2.jpg' },
  { id: 7, title: '', image: '/images/new3.jpg', type: 'new', carding: '/images/new3.jpg' },
  { id: 8, title: '', image: '/images/new4.jpg', type: 'new', carding: '/images/new4.jpg' },

  { id: 9, title: '', image: '/images/trend1.jpg', type: 'trending', carding: '/images/trend1.jpg' },
  { id: 10, title: '', image: '/images/trend2.jpg', type: 'trending', carding: '/images/trend2.jpg' },
  { id: 11, title: '', image: '/images/trend3.jpg', type: 'trending', carding: '/images/trend3.jpg' },
  { id: 12, title: '', image: '/images/trend4.jpg', type: 'trending', carding: '/images/trend4.jpg' },

  { id: 13, title: '', image: '/images/org1.jpg', type: 'original', carding: '/images/org1.jpg' },
  { id: 14, title: '', image: '/images/org2.jpg', type: 'original', carding: '/images/org2.jpg' },
  { id: 15, title: '', image: '/images/org3.jpg', type: 'original', carding: '/images/org3.jpg' },
  { id: 16, title: '', image: '/images/org4.jpg', type: 'original', carding: '/images/org4.jpg' },
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
