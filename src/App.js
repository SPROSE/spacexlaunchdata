/* Modules */
import React, { useState, useEffect } from 'react';

/* Assets */
import logo from './assets/spacex-logo.png';
import refresh from './assets/icon/refresh.png';
import sortImg from './assets/icon/sort.png';
import spacexImage from './assets/img/launch-home.png';

/* Styles */
import './App.scss';

/* Components */
import LaunchList from './components/launch-list';
import Year from './components/year';

function App() {
    const [hasError, setErrors] = useState(false);
    const [spacexData, setSpacexData] = useState([]);
    const [yearsData, setYearsData] = useState({});
    const [sort, setSort] = useState('ascending');

    async function fetchData() {
        const res = await fetch("https://api.spacexdata.com/v3/launches");
        res
            .json()
            .then(res => reduceAndSetToState(res))
            .catch(err => setErrors(err));
    }

    function reduceAndSetToState(res) {
        const spacexDataJson = reduceJson(res);
        setSpacexData(spacexDataJson);
        const availableYears = getYears(res);
        setYearsHandler(0, availableYears, false);
    }

    const reduceJson = (res) => {
        return res.reduce((x, y) => {
            return x.concat({
                flight_number: y.flight_number,
                mission_name: y.mission_name,
                date: y.launch_date_utc,
                rocket_name: y.rocket.rocket_name,
                launch_year: y.launch_year
            });
        }, []);
    };

    const getYears = (res) => {
        const years = res.reduce((x, y) => {
            return x.concat(y.launch_year);
        }, []);

        let seen = {};
        return years.filter((item) => {
            return seen.hasOwnProperty(item) ? false : (seen[item] = true);
        });
    };

    const setYearsHandler = (year, availableYears, showYearsDropdown) => {
        const yearsData = {
            year: year,
            availableYears: availableYears,
            showYearsDropdown: showYearsDropdown
        };
        setYearsData(yearsData);
    };

    const changeSort = () => {
        setSort(sort === 'ascending' ? 'descending' : 'ascending');
    };

    const reload = () => {
        fetchData();
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="app">
            <header className="app-header">
                <div className={"container"}>
                    <div className={"row"}>
                        <div className={"col col-7"}>
                            <img src={logo} className="logo inline bot" alt="logo" />
                            <h1 className={"page-title uppercase inline bot"}>Launches</h1>
                        </div>
                        <div className={"col col-5"}>
                            <button
                                className={"btn pull-right reload-btn"}
                                onClick={reload}>
                                Reload Data <img src={refresh} className={"icon"} alt={"refresh data"} />
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col col-5 left-image-rocket"}>
                        <img src={spacexImage} className={"spacex-image"} alt={"space x shuttle"} />
                    </div>
                    <section className={"col col-6 launch-data"}>
                        {hasError ?
                            <div>Error loading data, {hasError}</div>
                            :
                            <React.Fragment>
                                <div className={"list-controls align-right"}>
                                    <Year
                                        yearsData={yearsData}
                                        setYearsHandler={setYearsHandler}
                                    />
                                    <button
                                        className={"btn ml-1"}
                                        onClick={changeSort}>
                                        Sort {sort === 'ascending' ? 'Descending' : 'Ascending'} <img src={sortImg} className={"icon"} alt={"sort data"} />
                                    </button>
                                </div>
                                {spacexData.length ?
                                    <LaunchList
                                        year={yearsData.year}
                                        spacexData={spacexData}
                                        sort={sort}
                                        hasError={hasError}
                                    />
                                    : <div>Loading...</div> }
                            </React.Fragment>
                        }
                    </section>
                </div>
            </div>
        </div>
    );
}

export default App;
