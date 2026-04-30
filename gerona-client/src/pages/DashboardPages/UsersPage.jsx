import React from "react";

import { Typography, Box, Card, CardContent } from "@mui/material";
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";

import PeopleIcon from "@mui/icons-material/People";
import GroupIcon from "@mui/icons-material/Group";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import BadgeIcon from "@mui/icons-material/Badge";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "firstName", headerName: "First name", width: 150, editable: true },
  { field: "lastName", headerName: "Last name", width: 150, editable: true },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "fullName",
    headerName: "Full name",
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

function UsersPage() {
  const totalUsers = rows.length;
  const activeUsers = rows.filter((r) => r.age !== null).length;
  const newUsers = 3;

  const avgAge =
    rows.reduce((sum, row) => sum + (row.age || 0), 0) /
    rows.filter((r) => r.age !== null).length;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#FFFFFF",
        p: 3,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          color: "#3E3E3E",
          mb: 3,
        }}
      >
        Users
      </Typography>

      {/* KPI CARDS */}
      <Stack direction={{ xs: "column", md: "row" }} spacing={3} sx={{ mb: 4 }}>
        <Card
          sx={{
            flex: 1,
            borderRadius: 3,
            background: "linear-gradient(135deg, #E7F0FF, #F5F9FF)",
            border: "1px solid #D6E4FF",
            boxShadow: "0 6px 14px rgba(37,99,235,0.12)",
            transition: "0.2s",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: "0 10px 20px rgba(0,0,0,0.12)",
            },
          }}
        >
          <CardContent>
            <Box
              sx={{
                width: 45,
                height: 45,
                borderRadius: "50%",
                backgroundColor: "#DBEAFE",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 1,
              }}
            >
              <PeopleIcon sx={{ color: "#2563EB" }} />
            </Box>

            <Typography sx={{ color: "#6B7280", fontSize: 14 }}>
              Total Users
            </Typography>

            <Typography sx={{ fontSize: 30, fontWeight: 700 }}>
              {totalUsers}
            </Typography>
          </CardContent>
        </Card>

        <Card
          sx={{
            flex: 1,
            borderRadius: 3,
            background: "linear-gradient(135deg, #ECFDF5, #F0FDF4)",
            border: "1px solid #BBF7D0",
            boxShadow: "0 6px 14px rgba(16,185,129,0.12)",
            transition: "0.2s",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: "0 10px 20px rgba(0,0,0,0.12)",
            },
          }}
        >
          <CardContent>
            <Box
              sx={{
                width: 45,
                height: 45,
                borderRadius: "50%",
                backgroundColor: "#D1FAE5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 1,
              }}
            >
              <GroupIcon sx={{ color: "#10B981" }} />
            </Box>

            <Typography sx={{ color: "#6B7280", fontSize: 14 }}>
              Active Users
            </Typography>

            <Typography sx={{ fontSize: 30, fontWeight: 700 }}>
              {activeUsers}
            </Typography>
          </CardContent>
        </Card>

        <Card
          sx={{
            flex: 1,
            borderRadius: 3,
            background: "linear-gradient(135deg, #FFFBEB, #FEF3C7)",
            border: "1px solid #FDE68A",
            boxShadow: "0 6px 14px rgba(245,158,11,0.12)",
            transition: "0.2s",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: "0 10px 20px rgba(0,0,0,0.12)",
            },
          }}
        >
          <CardContent>
            <Box
              sx={{
                width: 45,
                height: 45,
                borderRadius: "50%",
                backgroundColor: "#FEF3C7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 1,
              }}
            >
              <PersonAddIcon sx={{ color: "#D97706" }} />
            </Box>

            <Typography sx={{ color: "#6B7280", fontSize: 14 }}>
              New Users
            </Typography>

            <Typography sx={{ fontSize: 30, fontWeight: 700 }}>
              {newUsers}
            </Typography>
          </CardContent>
        </Card>

        <Card
          sx={{
            flex: 1,
            borderRadius: 3,
            background: "linear-gradient(135deg, #FEF2F2, #FEE2E2)",
            border: "1px solid #FECACA",
            boxShadow: "0 6px 14px rgba(239,68,68,0.12)",
            transition: "0.2s",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: "0 10px 20px rgba(0,0,0,0.12)",
            },
          }}
        >
          <CardContent>
            <Box
              sx={{
                width: 45,
                height: 45,
                borderRadius: "50%",
                backgroundColor: "#FEE2E2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 1,
              }}
            >
              <BadgeIcon sx={{ color: "#DC2626" }} />
            </Box>

            <Typography sx={{ color: "#6B7280", fontSize: 14 }}>
              Average Age
            </Typography>

            <Typography sx={{ fontSize: 30, fontWeight: 700 }}>
              {avgAge.toFixed(1)}
            </Typography>
          </CardContent>
        </Card>
      </Stack>

      {/* TABLE */}
      <Card
        sx={{
          borderRadius: 3,
          border: "1px solid #E5E7EB",
          boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
          background: "linear-gradient(to right, #ffffff, #F9FAFB)",
        }}
      >
        <CardContent>
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 700,
              mb: 2,
              borderLeft: "5px solid #2563EB",
              pl: 1,
            }}
          >
            User Management Table
          </Typography>

          <Box sx={{ height: 500, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 5 },
                },
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
              sx={{
                border: "none",
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#F3F4F6",
                  fontWeight: 600,
                },
                "& .MuiDataGrid-row:hover": {
                  backgroundColor: "#F9FAFB",
                },
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default UsersPage;