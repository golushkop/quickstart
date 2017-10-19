import React from 'react';
import ReactDom from 'react-dom';
import Components from './components/components';
import registerServiceWorker from './registerServiceWorker';

import 'react-select/dist/react-select.css';
// import '../public/bootstrap/css/bootstrap-theme.css';
// import '../public/bootstrap/css/bootstrap.css';

ReactDom.render((
    <div>
        <Components/>
    </div>
),
    document.getElementById('app-root'));
registerServiceWorker();
