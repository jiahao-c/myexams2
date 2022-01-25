import { Button } from "@arco-design/web-react";
import ical from 'ical-generator';

const calendar = ical({name: 'exam schedules'});

function parseDateTime(datetimeStr:string){
    //datetimeStr original format "15-Dec-2021 at 2:00 PM"
    datetimeStr = datetimeStr.replace(' at ', ' ');
    datetimeStr += ' EST';
    return new Date(datetimeStr);
}

function handleClick(){
    calendar.createEvent({
        start: parseDateTime("15-Dec-2021 at 2:00 PM"),
        end: parseDateTime("15-Dec-2021 at 5:00 PM"),
        summary: 'Example Exam',
        description: 'It works ;)',
        location: 'somewhere',
    });    
    console.log(calendar.toJSON());
}

export const ToCalendarButton: React.FC = (props)=>{
    return(
    <Button onClick={handleClick}>
    {props.children}
    </Button>)
}