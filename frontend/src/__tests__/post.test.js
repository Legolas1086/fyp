import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Post from '../post'
const mockedNavigate = jest.fn("1");
jest.mock('react-router-dom', ()=>({
    ...jest.requireActual('react-router-dom'),
    useLocation: ()=>mockedNavigate,
}))
describe('snapshot testing',()=>{
    test("renders approve the request compnenet",()=>{
        const fragment = render(
            <BrowserRouter>
            <Post props={{loggedin:true}}/>
            </BrowserRouter>
        ).asFragment();
    expect(fragment).toMatchSnapshot()
    })
});