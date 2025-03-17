import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from "react";
import { getAllUser } from '../../api/Collections/Authcation';
import ButtonAction from './ButtonAction';

const paginationModel = { page: 0, pageSize: 5 };

export default function Table() {
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Tên', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 2 },
    { field: 'address', headerName: 'Địa chỉ', flex: 2 },
    { field: 'role', headerName: 'Role', flex: 1 },
    {
      field: 'actions',
      headerName: 'Hành động',
      width: 150,
      renderCell: (params) => (
        <ButtonAction data={params.row} fetchData={fetchData} /> // Sửa fetchData1 thành fetchData
      ),
    },
  ];

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await getAllUser();
      console.log("Response từ API:", response);
      const data = Array.isArray(response)
        ? response.map((user) => ({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.roles,
            address: user.address || 'N/A',
          }))
        : [];
      setRows(data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        loading={loading}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
      />
    </Paper>
  );
}