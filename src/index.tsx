import { render } from 'preact'
import App from './app'
import Main from './game/main'

const root = document.getElementById('root')
if (root) {
	render(<App />, root)
	const main = new Main()
	main.start()
}
