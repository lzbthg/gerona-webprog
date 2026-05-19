import React from "react";
import { useRef } from "react";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { Typography, Card, CardContent, Button } from "@mui/material";

import AssessmentIcon from "@mui/icons-material/Assessment";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import InsightsIcon from "@mui/icons-material/Insights";

import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { LineChart } from "@mui/x-charts/LineChart";
import { Gauge } from "@mui/x-charts/Gauge";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "Log ID", width: 90 },
  { field: "module", headerName: "Module", width: 150 },
  { field: "event", headerName: "Event Description", width: 240 },
  { field: "impact", headerName: "Impact Level", width: 140 },
  { field: "timestamp", headerName: "Timestamp", width: 180 },
];

const rows = [
  {
    id: 1,
    module: "Analytics",
    event: "User growth spike detected in dashboard",
    impact: "High",
    timestamp: "2026-05-01 09:12 AM",
  },
  {
    id: 2,
    module: "Reports",
    event: "Monthly performance report auto-generated",
    impact: "Medium",
    timestamp: "2026-05-01 10:45 AM",
  },
  {
    id: 3,
    module: "System",
    event: "Data sync completed across all charts",
    impact: "Low",
    timestamp: "2026-05-02 08:30 AM",
  },
  {
    id: 4,
    module: "Insights",
    event: "Abnormal drop in conversion rate detected",
    impact: "High",
    timestamp: "2026-05-02 02:15 PM",
  },
  {
    id: 5,
    module: "Reports",
    event: "Quarterly analytics visualization updated",
    impact: "Medium",
    timestamp: "2026-05-03 11:00 AM",
  },
];

function ReportsPage() {
  const printRef = useRef(null);

  const handlePrint = () => {
    const printContent = printRef.current;

    if (!printContent) {
      return;
    }

    const printWindow = window.open("", "_blank", "width=1200,height=900");

    if (!printWindow) {
      return;
    }

    const headMarkup = Array.from(
      document.querySelectorAll('style, link[rel="stylesheet"]'),
    )
      .map((node) => node.outerHTML)
      .join("");

    const exportedAt = new Intl.DateTimeFormat("en-US", {
      dateStyle: "long",
      timeStyle: "short",
    }).format(new Date());

    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <title>Print Report</title>
          ${headMarkup}
          <style>
          @page {
            size: A4;
            margin: 16mm;
          }

          * {
            box-sizing: border-box;
          }
          
          body {
            margin: 0;
            font-family: Arial, Helvetica, sans-serif;
            background: #fff;
            color: #1f2937;
          }

          .report-shell {
            padding: 28px;
          }

          .report-header {
            margin-bottom: 24px;
            padding-bottom: 14px;
            border-bottom: 1px solid #d1d5db;
          }

          .report-header h1 {
            margin: 0 0 6px;
            font-size: 28px;
            font-weight: 700;
          }

          .report-header p {
            margin: 0;
            font-size: 14px;
            color: #6b7280;
            line-height: 1.5;
          }

          .report-content .MuiCard-root {
            box-shadow: none !important;
            border: 1px solid #e5e7eb;
            break-inside: avoid;
            page-break-inside: avoid;
          }

          .report-content .MuiCardContent-root {
            padding: 20px;
          }

          .report-content svg {
            max-width: 100%
          }
          </style>
        </head>
        <body>
          <main class="report-shell">
            <header class="report-header">
              <h1>Reports Summary</h1>
              <p>Analytics overview for generated reports, catergory breakdown, and completion performance.</p>
              <p>Prepared on ${exportedAt}</p>
            </header>
            <section class="report-content">
              ${printContent.outerHTML}
            </section>
          </main>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: 3,
        minHeight: "100vh",
        backgroundColor: "#FFF8F0",
        p: 3,
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems={{ xs: "flex-start", md: "center" }}
        spacing={2}
        sx={{ mb: 4, width: "100%" }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "#3E2C23",
              mb: 1,
            }}
          >
            Reports
          </Typography>

          <Typography
            sx={{
              color: "#7A6A58",
              fontSize: 14,
              maxWidth: 600,
            }}
          >
            View and manage all generated reports, including performance
            insights, trends, and summary analytics. Use export or filters to
            customize your view.
          </Typography>
        </Box>

        <Stack
          direction="row"
          spacing={1.5}
          sx={{
            flexShrink: 0,
            ml: "auto",
          }}
        >
          <Button
            variant="contained"
            sx={{
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: 700,
              px: 2.5,
              background: "linear-gradient(135deg, #8B5E3C, #A47148)",
              boxShadow: "0 8px 18px rgba(139,94,60,0.18)",

              "&:hover": {
                background: "linear-gradient(135deg, #6F472D, #8B5E3C)",
              },
            }}
          >
            Generate
          </Button>

          <Button
            variant="outlined"
            sx={{
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: 600,
              borderColor: "#D8C2A8",
              color: "#6F472D",

              "&:hover": {
                borderColor: "#8B5E3C",
                backgroundColor: "#F7EBDD",
              },
            }}
            onClick={handlePrint}
          >
            Export
          </Button>

          <Button
            variant="outlined"
            sx={{
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: 600,
              borderColor: "#D8C2A8",
              color: "#6F472D",

              "&:hover": {
                borderColor: "#8B5E3C",
                backgroundColor: "#F7EBDD",
              },
            }}
          >
            Filter
          </Button>
        </Stack>
      </Stack>

      <Stack ref={printRef}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={3}
          sx={{ mb: 4 }}
        >
          <Card
            sx={{
              flex: 1,
              borderRadius: 3,
              background: "linear-gradient(135deg, #FFF3E6, #FFF8F0)",
              border: "1px solid #E5D3B8",
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
                  backgroundColor: "#F2E4D5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 1,
                }}
              >
                <AssessmentIcon sx={{ color: "#8B5E3C" }} />
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
              background: "linear-gradient(135deg, #EEF6EC, #F8FBF7)",
              border: "1px solid #CFE3CC",
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
              background: "linear-gradient(135deg, #F8ECD0, #FFF8E8)",
              border: "1px solid #E8D3A5",
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

              <Typography sx={{ fontSize: 30, fontWeight: 700 }}>42</Typography>
            </CardContent>
          </Card>
        </Stack>

        {[
          {
            title: "User Growth Trend (Last 6 Months)",
            description:
              "This line chart shows the steady increase in active users over time, highlighting consistent platform adoption and engagement growth.",
            component: (
              <LineChart
                xAxis={[
                  {
                    data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                    scaleType: "point",
                  },
                ]}
                series={[
                  {
                    data: [120, 150, 180, 220, 260, 310],
                    label: "Active Users",
                  },
                ]}
                height={300}
              />
            ),
            color: "#6366F1",
          },
          {
            title: "System Performance Overview",
            description:
              "Combined system health indicators showing overall performance, efficiency, and data reliability in a single snapshot.",
            component: (
              <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={3}
                sx={{ justifyContent: "center", alignItems: "center" }}
              >
                <Box sx={{ textAlign: "center" }}>
                  <Gauge width={140} height={140} value={78} />
                  <Typography sx={{ fontSize: 12, mt: 1 }}>
                    Completion
                  </Typography>
                </Box>

                <Box sx={{ textAlign: "center" }}>
                  <Gauge width={140} height={140} value={64} />
                  <Typography sx={{ fontSize: 12, mt: 1 }}>
                    Efficiency
                  </Typography>
                </Box>

                <Box sx={{ textAlign: "center" }}>
                  <Gauge width={140} height={140} value={91} />
                  <Typography sx={{ fontSize: 12, mt: 1 }}>Accuracy</Typography>
                </Box>
              </Stack>
            ),
            color: "#6FD1D7",
          },
          {
            title: "Quarterly Performance",
            description:
              "This bar chart compares sales and revenue performance across all quarters, helping identify seasonal peaks and business trends.",
            component: (
              <BarChart
                series={[
                  { data: [35, 44, 24, 34], label: "Sales" },
                  { data: [51, 6, 49, 30], label: "Revenue" },
                ]}
                height={300}
                xAxis={[{ data: ["Q1", "Q2", "Q3", "Q4"], scaleType: "band" }]}
              />
            ),
            color: "#2563EB",
          },
          {
            title: "Data Distribution",
            description:
              "This pie chart breaks down data categories, showing how different segments contribute to the overall dataset distribution.",
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
              border: "1px solid #E5D3B8",
              boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
              background: "linear-gradient(to right, #FFFDF9, #FFF8F0)",
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
                  mb: 1,
                  borderLeft: `5px solid ${chart.color}`,
                  pl: 1,
                }}
              >
                {chart.title}
              </Typography>

              <Typography
                sx={{
                  fontSize: 13,
                  color: "#6B7280",
                  mb: 2,
                  maxWidth: 700,
                }}
              >
                {chart.description}
              </Typography>

              {chart.component}
            </CardContent>
          </Card>
        ))}
        <Card
          sx={{
            borderRadius: 3,
            border: "1px solid #E5D3B8",
            background: "linear-gradient(to right, #FFFDF9, #FFF8F0)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
            transition: "0.2s",
            "&:hover": {
              transform: "translateY(-3px)",
              boxShadow: "0 10px 20px rgba(0,0,0,0.12)",
            },
          }}
        >
          <CardContent>
            <Typography sx={{ fontSize: 18, fontWeight: 700, mb: 1 }}>
              System Activity Log
            </Typography>

            <Typography sx={{ fontSize: 13, color: "#7A6A58", mb: 2 }}>
              Real-time system event tracking across analytics, reports, and
              insights modules showing operational changes and system impact
              levels.
            </Typography>

            <Box sx={{ height: 360, width: "100%" }}>
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
                    backgroundColor: "#F7EBDD",
                    color: "#3E2C23",
                    borderBottom: "1px solid #E5D3B8",
                  },

                  "& .MuiDataGrid-row:hover": {
                    backgroundColor: "#FFF8F0",
                  },

                  "& .MuiDataGrid-footerContainer": {
                    borderTop: "1px solid #E5D3B8",
                    backgroundColor: "#FFFDF9",
                  },
                }}
              />
            </Box>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}

export default ReportsPage;
