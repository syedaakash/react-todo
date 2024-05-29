import Root from './modules/app/Root';
import { SWRConfig } from 'swr';
import { swrConfig } from './lib/comms_v2/swrConfig';

function App() {
  return (
    <SWRConfig value={swrConfig}>
      <Root />
    </SWRConfig>
  );
}

export default App;
