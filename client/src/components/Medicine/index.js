import React, { useEffect } from "react";
import  Box  from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
// import { getMedicines } from "../../api";
import data from './data.json'

export default function Medicine() {
  const [drugList, setDrugList] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(10);

  const getAllMedicines = () => {
    data.results.forEach((res) => {
      if (res.products) {
        for (let i = 0; i < res.products.length; i++)
        {
          setDrugList((prevData) => [...prevData, res.products[i]]);
        }
      }
    });
  }

  useEffect(async () => {      
    getAllMedicines();
    // console.log(drugList);
  }, [data]);

  const columns = [
    { field: 'id', headerName: 'id', headerClassName: 'super-app-theme--header' },
    { field: 'brand_name', headerClassName: 'super-app-theme--header',headerName: 'Brand Name', width: 300 },
    { field: 'dosage_form', headerClassName: 'super-app-theme--header', headerName: 'Form of dosage', width: 500 },
    { field: 'strength', headerClassName: 'super-app-theme--header', headerName: 'Strength', width: 600 }
  ]

  const rows = drugList.map((data,i) => ({
    "id": data.id.toString(),
    "brand_name": data.brand_name,
    "dosage_form": data.dosage_form,
    "strength": data.active_ingredients[0].strength
  }))

  console.log(rows);

  return (
    <Box
      sx={{
        height: 700,
        width: "80%",
        margin: '0 auto',
        
        borderColor: 'primary.light',
        '& .super-app-theme--header': {
          fontWeight: 'bold',
          backgroundColor: '#474747',
          color:"white"
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={row => row.id}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[10, 12]}
      />
    </Box>
  );
}
