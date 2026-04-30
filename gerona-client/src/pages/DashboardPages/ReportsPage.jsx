import React from "react";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { Typography, Card, CardContent } from "@mui/material";

import AssessmentIcon from "@mui/icons-material/Assessment";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import InsightsIcon from "@mui/icons-material/Insights";

import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { LineChart } from "@mui/x-charts/LineChart";

function ReportsPage() {
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
        Reports
      </Typography>

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
              <AssessmentIcon sx={{ color: "#2563EB" }} />
            </Box>

            <Typography sx={{ color: "#6B7280", fontSize: 14 }}>
              Total Reports
            </Typography>

            <Typography sx={{ fontSize: 30, fontWeight: 700 }}>
              128
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
              <TrendingUpIcon sx={{ color: "#10B981" }} />
            </Box>

            <Typography sx={{ color: "#6B7280", fontSize: 14 }}>
              Report Growth
            </Typography>

            <Typography sx={{ fontSize: 30, fontWeight: 700 }}>
              +18%
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
              <InsightsIcon sx={{ color: "#D97706" }} />
            </Box>

            <Typography sx={{ color: "#6B7280", fontSize: 14 }}>
              Active Insights
            </Typography>

            <Typography sx={{ fontSize: 30, fontWeight: 700 }}>
              42
            </Typography>
          </CardContent>
        </Card>

      </Stack>

      {[
        {
          title: "User Growth Trend (Last 6 Months)",
          component: (
            <LineChart
              xAxis={[{ data: ["Jan","Feb","Mar","Apr","May","Jun"], scaleType: "point" }]}
              series={[{ data: [120,150,180,220,260,310], label: "Active Users" }]}
              height={300}
            />
          ),
          color: "#6366F1",
        },
        {
          title: "Quarterly Performance",
          component: (
            <BarChart
              series={[
                { data: [35,44,24,34], label: "Sales" },
                { data: [51,6,49,30], label: "Revenue" },
              ]}
              height={300}
              xAxis={[{ data: ["Q1","Q2","Q3","Q4"], scaleType: "band" }]}
            />
          ),
          color: "#2563EB",
        },
        {
          title: "Data Distribution",
          component: (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: 10, label: "A" },
                      { id: 1, value: 15, label: "B" },
                      { id: 2, value: 20, label: "C" },
                    ],
                  },
                ]}
                height={300}
              />
            </Box>
          ),
          color: "#10B981",
        },
      ].map((chart, i) => (
        <Card
          key={i}
          sx={{
            borderRadius: 3,
            border: "1px solid #E5E7EB",
            boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
            background: "linear-gradient(to right, #ffffff, #F9FAFB)",
            mb: 3,
            transition: "0.2s",
            "&:hover": {
              transform: "translateY(-3px)",
              boxShadow: "0 10px 20px rgba(0,0,0,0.12)",
            },
          }}
        >
          <CardContent>
            <Typography
              sx={{
                fontSize: 18,
                fontWeight: 700,
                mb: 2,
                borderLeft: `5px solid ${chart.color}`,
                pl: 1,
              }}
            >
              {chart.title}
            </Typography>

            {chart.component}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default ReportsPage;