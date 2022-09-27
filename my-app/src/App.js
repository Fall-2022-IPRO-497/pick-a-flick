import logo from './logo.svg';
import './App.css';
import Like_button from './component/Like_button'
import Dislike_button from './component/Dislike_button'
import Pass_button from './component/Pass_button'

function App() {
  return (
    <div className="App">
      <Like_button/>
      <Pass_button/>
      <Dislike_button/>
    </div>
  );
}

export default App;
