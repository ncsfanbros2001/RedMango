import React from 'react';
import { Header, Footer } from '../Components/Layout';
import { HomePage, MenuItemDetails, NotFound } from '../Pages';
import { Routes, Route } from 'react-router-dom';

function App() {
    return (
        <div>
            <Header />
            <div className="pb-5">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/menuItemDetails/:menuItemId" element={<MenuItemDetails />} />
                    
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
}

export default App;
