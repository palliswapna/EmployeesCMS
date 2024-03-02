// CustomerTable.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

const CustomerTable = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const response = await axios.get('/api/customers');
      setCustomers(response.data);
    };
    fetchCustomers();
  }, []);

  const columns = [
    { dataField: 'sno', text: 'SNo' },
    { dataField: 'customer_name', text: 'Customer Name' },
    { dataField: 'age', text: 'Age' },
    { dataField: 'phone', text: 'Phone' },
    { dataField: 'location', text: 'Location' },
    { dataField: 'created_at_date', text: 'Date' },
    { dataField: 'created_at_time', text: 'Time' },
  ];

  const options = {
    paginationSize: 4,
    pageStartIndex: 1,
    hideSizePerPage: true,
    hidePageListOnlyOnePage: true,
  };

  return (
    <BootstrapTable
      keyField="sno"
      data={customers.map(customer => ({
        ...customer,
        created_at_date: new Date(customer.created_at).toLocaleDateString(),
        created_at_time: new Date(customer.created_at).toLocaleTimeString(),
      }))}
      columns={columns}
      pagination={paginationFactory(options)}
    />
  );
};

export default CustomerTable;
