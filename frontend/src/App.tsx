import './App.css'
import { Container } from '@mantine/core'
import Main from './components/Main'

function App() {
  return (
    <div>
      <Container style={{ paddingTop: 100, paddingBottom: 40 }}>
        <Main />
      </Container>
    </div>
  );
}

export default App;
