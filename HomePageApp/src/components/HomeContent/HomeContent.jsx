import React, { Suspense, useEffect, useState } from 'react';
import QuickBooking from '../QuickBooking/QuickBooking.jsx';
import RoutingContext from '../../utils/RoutingProvider.js';
const MovieCard = React.lazy(() => import('components/MovieCard'));
import './HomeContent.scss';

const dummyItem = [{ name: 'Dummy Movie' }];

const HomeContent = (props) => {
	const [movies, setMovies] = useState(dummyItem);

	useEffect(async () => {
		const resp = await fetch('http://localhost:5555/movies');
		const data = await resp.json();
		setMovies(data);
	}, []);

	const movieClicked = (item) => {
		if (typeof props.movieClicked === 'function') {
			props.movieClicked(item);
		}
	};

	const renderMovieList = () => {
		let items = movies.map((item) => {
			return (
				<div onClick={() => movieClicked(item)} key={item.name}>
					<MovieCard title={item.name} imageUrl={item.imageUrl}></MovieCard>
				</div>
			);
		});

		return items;
	};

	return (
		<div className='home-content-container'>
			<RoutingContext.Provider value={props.routing}>
				<QuickBooking></QuickBooking>
				<div className='movies-container'>
					<Suspense fallback={null}>{renderMovieList()}</Suspense>
				</div>
			</RoutingContext.Provider>
		</div>
	);
};

export default HomeContent;
