import { useBoolean } from '@storyofams/react-helpers';

export default function useBooleanExample() {
  const [isOpen, { toggle }] = useBoolean(false);
  return (
    <div>
      <p>{isOpen ? 'open' : 'closed'}</p>
      <button onClick={toggle}>Toggle</button>
    </div>
  );
}
