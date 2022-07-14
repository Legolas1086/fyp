import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MyBooks from '../mybooks'
const mockedNavigate = jest.fn("1");
jest.mock('react-router-dom', ()=>({
    ...jest.requireActual('react-router-dom'),
    useLocation: ()=>mockedNavigate,
}))
describe('snapshot testing',()=>{
    test("renders approve the request compnenet",()=>{
        const fragment = render(
            <BrowserRouter>
            <MyBooks />
            </BrowserRouter>
        ).asFragment();
    expect(fragment).toMatchSnapshot()
    })
});