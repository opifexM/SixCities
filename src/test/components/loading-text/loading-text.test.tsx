import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import LoadingText from '../../../components/loading-text/loading-text.tsx';

describe('Component: LoadingText', () => {
  it('should render correctly', () => {
    render(<LoadingText/>);

    const loadingTextElement = screen.getByText(/Loading/i);
    expect(loadingTextElement).toBeInTheDocument();
  });
});
