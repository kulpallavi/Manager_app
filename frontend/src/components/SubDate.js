import React from 'react'

const SubDate = (props) => {

    const month = props.date.toLocaleString('en-US', {month: 'long'});
    const day= props.date.toLocaleString('en-US', {day: '2-digit'});
    const year= props.date.getFullYear();
 
    var date = new Date(); // Now
    date.setDate(date.getDate() + 30); // Set now + 30 days as the new date

    return (
        <div>
            {day} {month} {year} 
        </div>
    )
}

export default SubDate