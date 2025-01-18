function LandingPage({msg}: { msg: String }) {
	return (
		<div className="layout-content">
		<img className="App-logo" src="/assets/logo.png" alt="Logo" />
		<div className="hello">
			<h1>{msg}</h1>
			<p>
				click the DOG button to navigate to the sheet data template
			</p>
		</div>
		</div>
	)
}

export default LandingPage;