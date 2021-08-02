import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SongsComponent from './SongsComponent';

describe('<SongsComponent />', () => {
  test('it should mount', () => {
    render(<SongsComponent />);
    
    const songsComponent = screen.getByTestId('SongsComponent');

    expect(songsComponent).toBeInTheDocument();
  });
});