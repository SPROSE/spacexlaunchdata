/* Modules */
import React from 'react';

/* Assets */
import selectImg from '../assets/icon/select.png';

/* Styling */
import './year.scss';

const Year = (props) => {
    let showYearsDropdown = props.yearsData.showYearsDropdown;

    const yearsDropdownToggle = (e) => {
        e.preventDefault();
        props.setYearsHandler(props.yearsData.year, props.yearsData.availableYears, !showYearsDropdown);
    };

    const filterOnYear = (year, e) => {
        e.preventDefault();

        props.setYearsHandler(year, props.yearsData.availableYears, !showYearsDropdown);
    };

    return (
        <div className={"relative inline"}>
            <button
                className={"btn"}
                onClick={yearsDropdownToggle}>
                Filter by Year <img src={selectImg} className={"icon"} alt={"select year"} />
            </button>
            {showYearsDropdown ?
                <div className={"dropdownListContainer"}>
                    <ul className={"dropdown-list"}>
                        {props.yearsData.availableYears.map((year, i) => {
                            return <li className={"dropdown-entry"} key={i} onClick={filterOnYear.bind(this, year)}>{year}</li>
                        })}
                    </ul>
                </div>
                :
                null
            }
        </div>
    );
};

export default Year;
