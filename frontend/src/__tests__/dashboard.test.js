import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from '../dashboard'

describe('snapshot testing',()=>{
    test("renders approve the request compnenet",()=>{
        const fragment = render(
            <BrowserRouter>
            <Dashboard />
            </BrowserRouter>
        ).asFragment();
    expect(fragment).toMatchSnapshot()
    })
});