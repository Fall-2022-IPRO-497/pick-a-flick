import React from 'react';
import './recommendations_page.css'
import RecTable from './rec_table';


 function Recommendations(){
    return (
        <div>
            <h1>Your Movie Recommendations</h1>
            <RecTable/>
        </div>
    );
}

export default Recommendations;