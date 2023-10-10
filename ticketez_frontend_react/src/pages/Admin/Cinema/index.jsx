import React from 'react';

import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminCinema() {
    const notify = () => {
        // toast.error('Wow so easy!');
        // toast.info('Lorem ipsum dolor'); // same as toast(message, {type: "info"});
        // toast.error('Lorem ipsum dolor');
        // toast.success('Lorem ipsum dolor');
        // toast.success('Lorem ipsum dolor', {
        //     theme: 'colored',
        // });
        // toast.warn('Lorem ipsum dolor');
        // toast.warn('Lorem ipsum dolor', {
        //     theme: 'dark',
        // });
        // toast('Hello', {
        //   pauseOnFocusLoss: false
        // })
        
    };

    return (
        <div>
            <button onClick={notify}>Notify!</button>
        </div>
    );
}

export default AdminCinema;
