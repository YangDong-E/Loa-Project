import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from '../layout'
import Home from '../pages/home'
import Character from '../pages/character'
import Calculator from '../pages/calculator'
import Auctions from '../pages/auctions'
import Raids from '../pages/raid'

const Router = () => {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/character" element={<Character />}></Route>
                    <Route path="/calculator" element={<Calculator />}></Route>
                    <Route path="/auctions" element={<Auctions />}></Route>
                    <Route path="/raid" element={<Raids />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router
