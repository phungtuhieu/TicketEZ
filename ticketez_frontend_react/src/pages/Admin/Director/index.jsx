import React, { useEffect, useState } from 'react';
import axios from 'axios';
import axiosClient from '~/api/global/axiosClient';

const AdminDirector = () => {
   
    // useEffect(() => {

    //     async function abc (){
    //         const res = await axiosClient.get('upload')
    //         console.log(res);
    //     }

    //         abc();
    // },[])
 

    return <div><img src="http://localhost:8081/api/upload/1.jpg" alt="Ảnh" /></div>;
};
export default AdminDirector;
