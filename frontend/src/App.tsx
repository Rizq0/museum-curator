import "./index.css";
import { Button } from "./components/ui/button";
import { Layout } from "./components/Layout";

function App() {
  return (
    <>
      <Layout>
        <h1>React App</h1>
        <p>React App with TypeScript</p>
        <Button>Click me</Button>
      </Layout>
    </>
  );
}

export default App;
