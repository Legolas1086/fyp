import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Credential from '../cred'

describe('snapshot testing',()=>{
    test("renders approve the request compnenet",()=>{
        const fragment = render(
            <BrowserRouter>
            <Credential />
            </BrowserRouter>
        ).asFragment();
    expect(fragment).toMatchSnapshot()
    })
});