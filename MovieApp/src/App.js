import React, { Suspense } from 'react';
import './App.scss';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
const Homepage = React.lazy(() => import('homepage/HomePage'));
const DetailsPage = React.lazy(() => import('details/DetailsPage'));
const BookPage = React.lazy(() => import('seatSelection/SeatSelection'));

const App = () => {
	const history = useHistory();
	const location = useLocation();

	const movieClicked = (movie) => {
		history.push(`details/${movie.id}`);
	};

	return (
		<Switch>
			<Route path='/details/:id'>
				<Suspense fallback={null}>
					<DetailsPage
						location={location}
						routing={{ history, location }}
					></DetailsPage>
				</Suspense>
			</Route>
			<Route path='/book'>
				<Suspense fallback={null}>
					<BookPage></BookPage>
				</Suspense>
			</Route>
			<Route path='/'>
				<Suspense fallback={null}>
					<Homepage
						movieClicked={movieClicked}
						routing={{ history, location }}
					></Homepage>
				</Suspense>
			</Route>
		</Switch>
	);
};

export default App;
