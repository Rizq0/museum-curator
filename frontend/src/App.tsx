import "./index.css";
import { Button } from "./components/ui/button";

function App() {
  return (
    <div className="bg-lbg-purple dark:bg-dbg-purple min-h-screen min-w-[365px] flex flex-col items-center">
      <h1 className="text-3xl underline text-ltext-purple dark:text-dheadline-white">
        React App
      </h1>
      <p className="text-2xl underline text-ltext-purple dark:text-dheadline-white">
        React App with TypeScript
      </p>
      <Button>Click me</Button>
    </div>
  );
}

export default App;
