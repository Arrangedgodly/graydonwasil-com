import { Shell } from './components/Shell';

/* Routing does not swap pages here — every URL renders the same shell, and the
 * path decides which slide the deck is parked on and whether a deeper view is
 * layered over it. Rendering Shell unconditionally keeps the deck mounted, so
 * moving between slides animates instead of remounting. */
function App() {
  return <Shell />;
}

export default App;
