import React from 'react';
import { withRouter } from 'react-router-dom';

function Home(props){
	return(
		<div>
			<h3>Home page</h3>
			<button type="button" onClick={goBackPage}>goBack</button>
		</div>
	);
	function goBackPage(){
		props.history.goBack();
	}
}

export default withRouter(Home);