import {useEffect, useState} from "react";

function FormattedDate(props){
    const [date, setDate] = useState("")
    useEffect(function () {
        const formatDate = async function () {
            let propsDate = props.date;
            let dateString = propsDate.toString();
            let date = new Date(dateString);

            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            let hour = date.getHours();
            let minute = date.getMinutes();
            if(minute < 10){
                minute = "0" + minute;
            }
            setDate(day + "/" + month + "/" + year + " " + hour + ":" + minute);
        }
        formatDate();
    }, []);
    return (
        <>
            <span>Date: {date}</span>
        </>
    )
}

export default FormattedDate;