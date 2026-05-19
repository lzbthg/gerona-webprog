import { useEffect, useState } from "react";
import {
  fetchArticles,
  updateArticle,
  createArticle,
  toggleArticleStatus,
} from "../../services/ArticleService";
import { articleImages } from "../../data/article-content";
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  MenuItem,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import ArticleIcon from "@mui/icons-material/Article";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { DataGrid } from "@mui/x-data-grid";

const blankForm = {
  slug: "",
  title: "",
  content: "",
  imageKey: "",
  imageUrl: "",
  featured: false,
  isActive: true,
};

const inputStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "14px",
    backgroundColor: "#fff",

    "& fieldset": {
      borderColor: "#d4d4d8",
    },

    "&:hover fieldset": {
      borderColor: "#6366f1",
    },

    "&.Mui-focused fieldset": {
      borderColor: "#4f46e5",
      borderWidth: "2px",
    },
  },
};

const getParagraphCount = (content) => {
  if (!content) return 0;

  return content
    .split(/\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean).length;
};

const getPreviewText = (content) => {
  if (!content) return "";

  const preview = content.trim().replace(/\s+/g, " ");
  return preview.length > 120 ? `${preview.slice(0, 120)}…` : preview;
};

const DashArticleListPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [modal, setModal] = useState({
    open: false,
    id: null,
  });
  const [form, setForm] = useState(blankForm);
  const [errors, setErrors] = useState({});
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      setLoading(true);
      const { data } = await fetchArticles();
      setArticles(data.articles || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch articles.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({ ...blankForm });
    setErrors({});
  };

  const openModal = (article) => {
    setModal({ open: true, id: article?._id ?? null });
    setForm(article ? { ...blankForm, ...article } : { ...blankForm });
    setErrors({});
  };

  const closeModal = () => {
    setModal({ open: false, id: null });
    resetForm();
  };

  const handleChange = ({ target: { name, value, checked, type } }) => {
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const nextErrors = {};
    const slug = form.slug.trim().toLowerCase();

    [
      ["slug", "Slug"],
      ["title", "Title"],
      ["content", "Content"],
    ].forEach(([key, label]) => {
      if (!String(form[key]).trim()) {
        nextErrors[key] = `${label} is required.`;
      }
    });

    if (!nextErrors.slug && /\s/.test(slug)) {
      nextErrors.slug = "Slug must not contain spaces.";
    }

    if (
      !nextErrors.slug &&
      articles.some(
        (article) => article._id !== modal.id && article.slug === slug,
      )
    ) {
      nextErrors.slug = "Slug already exists.";
    }

    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const nextErrors = validate();
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    const nextArticle = {
      slug: form.slug.trim().toLowerCase(),
      title: form.title.trim(),
      content: form.content.trim(),
      imageKey: form.imageKey,
      imageUrl: form.imageUrl,
      featured: form.featured,
      isActive: form.isActive,
    };

    try {
      if (modal.id) {
        const { data } = await updateArticle(modal.id, nextArticle);

        setArticles((prev) =>
          prev.map((a) => (a._id === modal.id ? data.article : a)),
        );
        setSuccess("Article updated successfully!");
      } else {
        const { data: createdArticle } = await createArticle(nextArticle);

        setArticles((prev) => [
          ...prev,
          createdArticle.article || createdArticle,
        ]);
        setSuccess("Article created successfully!");
      }

      setTimeout(() => {
        closeModal();
      }, 1200);
    } catch (err) {
      console.error(err);
      setError("Failed to save article.");
    }
  };

  const toggleStatus = async (id) => {
    try {
      const { data } = await toggleArticleStatus(id);

      setArticles((prev) =>
        prev.map((article) => (article._id === id ? data.article : article)),
      );
      setSuccess(
        data.article.isActive
          ? "Article activated successfully!"
          : "Article disabled successfully!",
      );

      setTimeout(() => {
        setSuccess("");
      }, 2500);
    } catch (err) {
      console.error(err);
    }
  };

  const fieldProps = (name, label, extra = {}) => ({
    name,
    label,
    value: form[name],
    onChange: handleChange,
    error: Boolean(errors[name]),
    helperText: errors[name],
    fullWidth: true,
    sx: inputStyle,
    ...extra,
  });

  const columns = [
    { field: "_id", headerName: "ID", width: 80 },

    {
      field: "slug",
      headerName: "Slug",
      flex: 1,
      minWidth: 170,
    },

    {
      field: "title",
      headerName: "Title",
      flex: 1.2,
      minWidth: 220,
    },

    {
      field: "paragraphs",
      headerName: "Paragraphs",
      minWidth: 120,
      valueGetter: (_, row) => getParagraphCount(row.content),
    },

    {
      field: "preview",
      headerName: "Preview",
      flex: 1.5,
      minWidth: 240,
      valueGetter: (_, row) => getPreviewText(row.content),
    },

    {
      field: "featured",
      headerName: "Featured",
      minWidth: 120,

      renderCell: ({ row }) => (
        <Chip
          label={row.featured ? "Featured" : "Standard"}
          variant="filled"
          sx={{
            fontWeight: 700,
            borderRadius: "999px",
            px: 0.5,

            minWidth: 85,
            height: 28,

            bgcolor: row.featured ? "#F4E7A1" : "#EFE5D8",
            color: row.featured ? "#8B6B00" : "#7A6A58",
            border: row.featured ? "1px solid #C9A227" : "1px solid #CBBBA7",
          }}
        />
      ),
    },

    {
      field: "status",
      headerName: "Status",
      minWidth: 120,
      sortable: false,
      renderCell: ({ row }) => (
        <Chip
          label={row.isActive ? "Active" : "Inactive"}
          variant="filled"
          sx={{
            fontWeight: 700,
            borderRadius: "999px",
            px: 0.5,
            minWidth: 92,
            height: 28,

            justifyContent: "center",
            bgcolor: row.isActive ? "#DDF4E4" : "#F3E8E2",
            color: row.isActive ? "#3F6B4B" : "#8A6E63",
            border: row.isActive ? "1px solid #9FD5AE" : "1px solid #D8B8A9",

            "& .MuiChip-label": {
              width: "100%",
              textAlign: "center",
              px: 0,
            },
          }}
        />
      ),
    },

    {
      field: "actions",
      headerName: "Actions",
      minWidth: 220,
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={1} sx={{ py: 0.5 }}>
          <Button
            size="small"
            variant="outlined"
            sx={{
              borderRadius: "10px",
              textTransform: "none",
              fontWeight: 600,
            }}
            onClick={() => openModal(row)}
          >
            Edit
          </Button>

          <Button
            size="small"
            variant="contained"
            sx={{
              borderRadius: "10px",
              textTransform: "none",
              fontWeight: 700,

              minWidth: 95,
              height: 34,

              bgcolor: row.isActive ? "#D97706" : "#5B8C5A",
              color: "#FFFFFF",
              boxShadow: "none",

              "&:hover": {
                bgcolor: row.isActive ? "#B45309" : "#4B7550",
                boxShadow: "none",
              },
            }}
            onClick={() => toggleStatus(row._id)}
          >
            {row.isActive ? "Disable" : "Activate"}
          </Button>
        </Stack>
      ),
    },
  ];

  const filteredArticles = articles.filter((article) => {
    const searchText = search.toLowerCase();
    const matchSearch =
      (article.slug || "").toLowerCase().includes(searchText) ||
      (article.title || "").toLowerCase().includes(searchText) ||
      (article.content || "").toLowerCase().includes(searchText);

    const matchStatus =
      statusFilter !== "" ? article.isActive.toString() === statusFilter : true;

    const matchType =
      typeFilter !== "" ? article.featured.toString() === typeFilter : true;

    return matchSearch && matchStatus && matchType;
  });

  return (
    <Box
      sx={{
        width: "100%",
        minWidth: 0,
        minHeight: "100vh",
        backgroundColor: "#FFF8F0",
        p: { xs: 2, md: 3 },
      }}
    >
      {/* HEADER */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems={{ xs: "flex-start", md: "center" }}
        justifyContent="space-between"
        spacing={2}
        sx={{ mb: 4 }}
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
            Article Management
          </Typography>

          <Typography
            sx={{
              color: "#7A6A58",
              fontSize: 14,
              maxWidth: 600,
            }}
          >
            Manage articles, content, and publication status.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            width: { xs: "100%", md: "auto" },
            flexShrink: 0,
          }}
        >
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => openModal()}
            sx={{
              width: { xs: "100%", md: "auto" },
              px: 3,
              py: 1.2,
              borderRadius: "14px",
              textTransform: "none",
              fontWeight: 700,
              background: "linear-gradient(135deg, #8B5E3C, #A47148)",
              boxShadow: "0 8px 18px rgba(37,99,235,0.18)",

              "&:hover": {
                background: "linear-gradient(135deg, #6F472D, #8B5E3C)",
              },
            }}
          >
            Add Article
          </Button>
        </Box>
      </Stack>

      <Stack direction={{ xs: "column", md: "row" }} spacing={3} sx={{ mb: 4 }}>
        <Paper
          elevation={0}
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
          <Box
            sx={{ p: 2.5, display: "flex", flexDirection: "column", gap: 0.5 }}
          >
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
              <ArticleIcon sx={{ color: "#8B5E3C" }} />
            </Box>
            <Typography sx={{ color: "#6B7280", fontSize: 14 }}>
              Total Articles
            </Typography>
            <Typography sx={{ fontSize: 30, fontWeight: 700 }}>
              {loading ? "..." : articles.length}
            </Typography>
          </Box>
        </Paper>

        <Paper
          elevation={0}
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
          <Box
            sx={{ p: 2.5, display: "flex", flexDirection: "column", gap: 0.5 }}
          >
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
              <CheckCircleIcon sx={{ color: "#10B981" }} />
            </Box>
            <Typography sx={{ color: "#6B7280", fontSize: 14 }}>
              Active Articles
            </Typography>
            <Typography sx={{ fontSize: 30, fontWeight: 700 }}>
              {loading ? "..." : articles.filter((a) => a.isActive).length}
            </Typography>
          </Box>
        </Paper>

        <Paper
          elevation={0}
          sx={{
            flex: 1,
            borderRadius: 3,
            background: "linear-gradient(135deg, #F8ECD0, #FFF8E8)",
            border: "1px solid #E8D3A5",
            boxShadow: "0 6px 14px rgba(245,158,11,0.12)",
            transition: "0.2s",
            "&:hover": {
              transform: "translateY(-4px)",
            },
          }}
        >
          <Box
            sx={{ p: 2.5, display: "flex", flexDirection: "column", gap: 0.5 }}
          >
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
              <VisibilityIcon sx={{ color: "#F59E0B" }} />
            </Box>
            <Typography sx={{ color: "#6B7280", fontSize: 14 }}>
              Featured Articles
            </Typography>
            <Typography sx={{ fontSize: 30, fontWeight: 700 }}>
              {loading ? "..." : articles.filter((a) => a.featured).length}
            </Typography>
          </Box>
        </Paper>
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 3,
          borderRadius: 3,
          border: "1px solid #E5D3B8",
          background: "linear-gradient(to right, #FFFDF9, #FFF8F0)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
        }}
      >
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            label="Search"
            placeholder="Search slug, title, content..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            fullWidth
            sx={inputStyle}
          />

          <TextField
            select
            label="Status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            sx={{ minWidth: 140, ...inputStyle }}
          >
            <MenuItem value="">All Status</MenuItem>
            <MenuItem value="true">Active</MenuItem>
            <MenuItem value="false">Inactive</MenuItem>
          </TextField>

          <TextField
            select
            label="Article Type"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            sx={{
              minWidth: 160,
              ...inputStyle,
            }}
          >
            <MenuItem value="">All Types</MenuItem>
            <MenuItem value="true">Featured</MenuItem>
            <MenuItem value="false">Standard</MenuItem>
          </TextField>
        </Stack>
      </Paper>

      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          border: "1px solid #E5D3B8",
          background: "linear-gradient(to right, #FFFDF9, #FFF8F0)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
          overflow: "hidden",
        }}
      >
        <Box sx={{ height: { xs: 500, md: 580 }, width: "100%" }}>
          <DataGrid
            rows={filteredArticles}
            columns={columns}
            getRowId={(row) => row._id}
            loading={loading}
            disableRowSelectionOnClick
            pageSizeOptions={[5, 10]}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                  page: 0,
                },
              },
            }}
            sx={{
              border: "none",
              fontSize: "0.88rem",
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#F7EBDD",
                borderBottom: "1px solid #E5E7EB",
                fontWeight: 700,
                color: "#3E2C23",
              },
              "& .MuiDataGrid-row": {
                transition: "0.2s",
              },
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "#FFF8F0",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "1px solid #F1F5F9",
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "1px solid #E5E7EB",
                backgroundColor: "#FAFAFA",
              },
              "& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader": {
                outline: "none",
              },
            }}
          />
        </Box>
      </Paper>

      <Dialog
        open={modal.open}
        onClose={closeModal}
        fullWidth
        fullScreen={isMobile}
        maxWidth="md"
        PaperProps={{
          sx: {
            borderRadius: 4,
            overflow: "hidden",
            background: "#FFFDF9",
            boxShadow: "0 20px 50px rgba(0,0,0,0.16)",
          },
        }}
      >
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle
            sx={{
              fontWeight: 600,
              fontSize: "1.4rem",
              color: "#111827",
            }}
          >
            {modal.id ? "Edit Article" : "Add Article"}
          </DialogTitle>

          <DialogContent dividers sx={{ px: { xs: 2, sm: 3 } }}>
            <Stack spacing={2} sx={{ pt: 1 }}>
              <TextField {...fieldProps("slug", "Slug")} />
              <TextField {...fieldProps("title", "Title")} />
              <TextField
                {...fieldProps("content", "Content", {
                  multiline: true,
                  rows: 5,
                  placeholder: "Enter article content preview...",
                })}
              />

              <TextField
                select
                label="Article Type"
                value={form.featured ? "featured" : "standard"}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    featured: e.target.value === "featured",
                  }))
                }
                fullWidth
                sx={inputStyle}
              >
                <MenuItem value="standard">Standard</MenuItem>
                <MenuItem value="featured">Featured</MenuItem>
              </TextField>

              <TextField
                select
                label="Article Image"
                value={form.imageKey}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    imageKey: e.target.value,
                  }))
                }
                fullWidth
                sx={inputStyle}
              >
                <MenuItem value="capySwim4">Swim 4</MenuItem>
                <MenuItem value="capyHi">Capy Hi</MenuItem>
                <MenuItem value="capyWater">Capy Water</MenuItem>
                <MenuItem value="capyFunny">Capy Funny</MenuItem>
              </TextField>

              <TextField
                label="Custom Image URL"
                value={form.imageUrl}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    imageUrl: e.target.value,
                  }))
                }
                placeholder="https://example.com/image.jpg"
                fullWidth
                sx={inputStyle}
              />

              {(form.imageUrl || form.imageKey) && (
                <Box
                  sx={{
                    mt: 2,
                    borderRadius: "18px",
                    overflow: "hidden",
                    border: "1px solid #E5D3B8",
                  }}
                >
                  <img
                    src={form.imageUrl || articleImages[form.imageKey]}
                    alt="Preview"
                    style={{
                      width: "100%",
                      height: 220,
                      objectFit: "cover",
                    }}
                  />
                </Box>
              )}

              <FormControlLabel
                control={
                  <Switch
                    name="isActive"
                    checked={form.isActive}
                    onChange={handleChange}
                  />
                }
                label={
                  form.isActive
                    ? "Article status: Active"
                    : "Article status: Inactive"
                }
              />
            </Stack>
          </DialogContent>

          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={closeModal}>Cancel</Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                borderRadius: "10px",
                textTransform: "none",
                fontWeight: 700,
                background: "linear-gradient(135deg, #8B5E3C, #A47148)",
              }}
            >
              {modal.id ? "Update Article" : "Save Article"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default DashArticleListPage;
