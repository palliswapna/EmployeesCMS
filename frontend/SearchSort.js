// SearchAndSort.js
import React, { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const SearchAndSort = ({ setCustomers }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');

  const handleSearch = async () => {
    const response = await axios.get(`/api/customers?name=${searchTerm}`);
    setCustomers(response.data);
  };

  const handleSort = async () => {
    const response = await axios.get(`/api/customers?sort=${sortBy}`);
    setCustomers(response.data);
  };

  return (
    <Form>
      <Row>
        <Col>
          <Form.Control
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col>
          <Form.Control
            as="select"
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="date">Date</option>
            <option value="time">Time</option>
          </Form.Control>
        </Col>
        <Col>
          <button onClick={handleSearch}>Search</button>
          <button onClick={handleSort}>Sort</button>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchAndSort;
