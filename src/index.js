// Only for React 18: 
import React from 'react';

import ReactDOM from 'react-dom/client';
import App from './App';

// For React 17:
// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );

ReactDOM.createRoot(document.getElementById('root')).render(<App />);