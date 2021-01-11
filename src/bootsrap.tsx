import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

function Bootstrap(){
    console.log('rendered');
    ReactDOM.render(
        <React.StrictMode>
            <App/>
        </React.StrictMode>,
        document.getElementById('root')
    );
}

export default Bootstrap;
