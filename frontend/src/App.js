import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { useToast } from './toast';

function App() {
  const { showToast, ToastContainer } = useToast();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'white',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      <PipelineToolbar showToast={showToast} />
      <PipelineUI />
      <ToastContainer />
    </div>
  );
}

export default App;
