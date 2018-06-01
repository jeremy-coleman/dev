import * as React from 'react';
import { Route, Link } from 'react-router-dom';

export const ActiveLink = ({ to, activeOnlyWhenExact, ...rest }) => (
	<Route
		path={to}
		exact={activeOnlyWhenExact}
		children={({ match }) => (
			<Link to={to} {...rest} className={match ? 'active' : ''} />
		)}
	/>
);

