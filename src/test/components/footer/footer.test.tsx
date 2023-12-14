import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {describe, expect, it} from 'vitest';
import Footer from '../../../components/footer/footer.tsx';
import {AppRoute} from '../../../const.ts';

describe('Component: Footer', () => {
  it('should render correctly', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const linkElement = screen.getByRole('link', { name: /6 cities logo/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', AppRoute.Main);

    const logoImg = screen.getByAltText(/6 cities logo/i);
    expect(logoImg).toBeInTheDocument();
    expect(logoImg).toHaveAttribute('src', 'img/logo.svg');
  });
});
