import CommitMap from './CommitMap';
import { Buttons } from './Buttons.tsx';

export function AppContainer() {
  return (
    <div className="app-container">
      <h1>Git Map Art</h1>
      <CommitMap />
      <Buttons />
    </div>
  );
}
