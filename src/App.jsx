import Message from './Message';
import Counter from './Counter';

function App() {
  return (
    <div>
      <h1>Proof of concept</h1>
      <h2>this is a second header</h2>
        <p>This is your first custom React component.</p>
        <Message />
        <ul>
          <li>list item&nbsp;1</li>
          <li>secondary list item.</li>
        </ul>
        <Counter />
    </div>
  );
}

export default App;
