/* Modules */
import React from 'react';

/* Styles */
import './launch-list.scss';

function LaunchList(props) {
    let launches = props.spacexData.sort(function(a, b) {
        a = new Date(a.date);
        b = new Date(b.date);

        if (props.sort === 'descending')
        return a>b ? -1 : a<b ? 1 : 0;
        else
            return b>a ? -1 : b<a ? 1 : 0;
    });

    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    let date;

    return (
        <ul className={"launch-list"}>
            {launches.map((launch, i) => {
                if (Number(props.year) === 0 || Number(props.year) === Number(launch.launch_year)) {
                    date = new Date(launch.date);
                    return <li key={i} className={"launch-entry"}>
                        <div className={"flight-no inline"}>#{launch.flight_number}</div>
                        <div className={"mission-name inline"}>{launch.mission_name}</div>
                        <div className={"inline mid pull-right"}>
                            <div className={"launch-date align-right"}>{date.toLocaleDateString('en-GB', dateOptions)}</div>
                            <div className={"rocket-name align-right"}>{launch.rocket_name}</div>
                        </div>
                    </li>
                }
            })}
        </ul>
    );
}

export default LaunchList;
