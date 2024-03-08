import React, { useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { API_URL } from '../api';
import { apiOptions } from '../api';

function Search({onSearchChange}) {

const [search, setSearch] = useState(null);

const loadOptions = (inputValue) => {
    return fetch (
        `${API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`, apiOptions
    )
    .then((response) => response.json())
    .then((response) => {
        return{
            options: response.data.map((city) =>{
                return{
                    value: `${city.latitude} ${city.longitude}`,
                    label: `${city.name}, ${city.countryCode}`,
                };
            }),
        };
    })
    .catch((err) => console.log(err))
};

const handleOnSearchChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
}

  return (
    <div>
        <div className = "flex items-center justify-center">
            <div className="w-80 glass mt-10">
                <h1 className = "text-black text-3xl text-center p-3 header">Get Your Forecast in a Flash</h1>
                <AsyncPaginate
                    placeholder = "Search any city"
                    debounceTimeout = {600}
                    value = {search}
                    onChange = {handleOnSearchChange}
                    loadOptions={loadOptions}
                    className = "mb-10 p-5"
                />
            </div>
        </div>
    </div>
  )
}

export default Search