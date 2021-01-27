import { renderHook } from '@testing-library/react-hooks';
import useTitle from './useTitle';

const beforeTitle = 'My page title';
const afterTitle = 'My other page title';

describe('[hooks] useTitle', () => {
  it('should be defined', () => {
    expect(useTitle).toBeDefined();
  });

  it('should update document title', () => {
    const hook = renderHook(useTitle, {
      initialProps: beforeTitle,
    });

    expect(document.title).toBe(beforeTitle);

    hook.rerender(afterTitle);

    expect(document.title).toBe(afterTitle);
  });

  it('should reset document title to the title it was before on unmount', () => {
    renderHook(useTitle, { initialProps: beforeTitle });
    expect(document.title).toBe(beforeTitle);

    const hook = renderHook(
      ({ title, resetAfter }) => useTitle(title, resetAfter),
      { initialProps: { title: afterTitle, resetAfter: true } },
    );

    expect(document.title).toBe(afterTitle);

    hook.unmount();

    expect(document.title).toBe(beforeTitle);
  });
});
