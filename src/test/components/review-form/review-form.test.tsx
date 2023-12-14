import {fireEvent, render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {describe, expect, it} from 'vitest';
import ReviewForm from '../../../components/review-form/review-form.tsx';
import {AuthorizationStatus} from '../../../const.ts';
import {withStore} from '../../utils/mock-component.tsx';

describe('Component: ReviewForm', () => {
  it('should render form for authenticated users', () => {
    const { withStoreComponent } = withStore(
      <ReviewForm
        authorizationStatus={AuthorizationStatus.Auth}
        offerId={'idTest'}
        minCommentLength={50}
        maxCommentLength={300}
      />
    );
    render(withStoreComponent, {wrapper: MemoryRouter});

    expect(screen.getByLabelText('Your review')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Tell how was your stay, what you like and what can be improved')).toBeInTheDocument();
  });

  it('should not render form for non-authenticated users', () => {
    const { withStoreComponent } = withStore(
      <ReviewForm
        authorizationStatus={AuthorizationStatus.NoAuth}
        offerId={'idTest'}
        minCommentLength={50}
        maxCommentLength={300}
      />
    );
    render(withStoreComponent, {wrapper: MemoryRouter});
    expect(screen.queryByLabelText('Your review')).not.toBeInTheDocument();
  });

  it('should enable submit button when form is valid', () => {
    const { withStoreComponent } = withStore(
      <ReviewForm
        authorizationStatus={AuthorizationStatus.Auth}
        offerId={'idTest'}
        minCommentLength={50}
        maxCommentLength={300}
      />
    );
    render(withStoreComponent, {wrapper: MemoryRouter});

    fireEvent.change(screen.getByRole('textbox'),
      {target: { value: 'The house is very good, very happy, hygienic and simple living conditions around it are also very good. I hope to have the opportunity to come back. Thank you.' }}
    );
    fireEvent.click(screen.getAllByRole('radio')[4]);

    expect(screen.getByText('Submit')).not.toBeDisabled();
  });
});
