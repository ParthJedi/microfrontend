import React, { Suspense } from 'react';
import './App.scss';
import { Switch, Route } from 'react-router-dom';
const Homepage = React.lazy(() => import('homepage/HomePage'));
const DetailsPage = React.lazy(() => import('details/DetailsPage'));
const BookPage = React.lazy(() => import('seatSelection/SeatSelection'));

const App = () => {
	return (
		<Switch>
			<Route path='/details'>
				<Suspense fallback={null}>
					<DetailsPage></DetailsPage>
				</Suspense>
			</Route>
			<Route path='/book'>
				<Suspense fallback={null}>
					<BookPage></BookPage>
				</Suspense>
			</Route>
			<Route path='/'>
				<Suspense fallback={null}>
					<Homepage></Homepage>
				</Suspense>
			</Route>
		</Switch>
	);
};

export default App;
