import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Chat from '../card'

describe('snapshot testing',()=>{
    test("renders approve the request compnenet",()=>{
        const fragment = render(
            <BrowserRouter>
            <Chat />
            </BrowserRouter>
        ).asFragment();
    expect(fragment).toMatchSnapshot()
    })
});