// App.js
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import CustomerTable from './CustomerTable';
import SearchAndSort from './SearchAndSort';

function App() {
  const [customers, setCustomers] = useState([]);

  return (
    <Container>
      <h1>Customer Management System</h1>
      <SearchAndSort setCustomers={setCustomers} />
      <CustomerTable customers={customers} />
    </Container>
  );
}

export default App;
