import React, { useState, useEffect } from 'react';

function FitnessPlacesTable() {
  const [places, setPlaces] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  useEffect(() => {
    fetch('http://localhost:4000/fitness_places')
      .then(response => response.json())
      .then(data => setPlaces(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const sortedPlaces = React.useMemo(() => {
    let sortablePlaces = [...places];
    if (sortConfig !== null) {
      sortablePlaces.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortablePlaces;
  }, [places, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div>
      <button onClick={() => requestSort('size')}>Sort by Size</button>
      <button onClick={() => requestSort('fee')}>Sort by Fee</button>
      <table className="fitness-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Place</th>
            <th>Size</th>
            <th>Fee</th>
            <th>Trainings Available</th>
          </tr>
        </thead>
        <tbody>
          {sortedPlaces.map((place, index) => (
            <tr key={index}>
              <td>{place.name}</td>
              <td>{place.place}</td>
              <td>{place.size}</td>
              <td>{place.fee}</td>
              <td>{place.trainings_available}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FitnessPlacesTable;
