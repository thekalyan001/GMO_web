import React from 'react';
import { Navigate } from 'react-router-dom';
import DataTable from './DataTable';
import DepartmentList from './DepartmentList';
import './SecondPage.css';

const SecondPage: React.FC = () => {
  const userDetails = localStorage.getItem('userDetails');
  if (!userDetails) {
    return <Navigate to="/" replace state={{ message: 'Please enter your details first.' }} />;
  }
  
  return (
    <div className="second-page-container">
      <div className="data-table-section">
        <h2>Data Table</h2>
        <DataTable />
      </div>
      <div className="department-list-section">
        <h2>Department List</h2>
        <DepartmentList />
      </div>
    </div>
  );
};

export default SecondPage;
