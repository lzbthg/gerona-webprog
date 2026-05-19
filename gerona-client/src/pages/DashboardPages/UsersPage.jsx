import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUsers, updateUser, createUser } from "../../services/UserService";
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
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import GroupIcon from "@mui/icons-material/Group";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { DataGrid } from "@mui/x-data-grid";

const roles = ["admin", "editor", "viewer"];
const genders = ["male", "female", "other"];

const blankForm = {
  firstName: "",
  lastName: "",
  age: "",
  gender: "",
  contactNumber: "",
  email: "",
  type: "",
  username: "",
  password: "",
  address: "",
  isActive: true,
};

const labelize = (value) =>
  value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : "";

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

const UsersPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [modal, setModal] = useState({
    open: false,
    id: null,
  });
  const [form, setForm] = useState(blankForm);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      navigate("/auth/signin");
      return;
    }

    const user = JSON.parse(storedUser);

    if (!user) {
      navigate("/auth/signin");
      return;
    }

    // viewers cannot login at all (extra safety)
    if (user.type === "viewer") {
      navigate("/auth/signin");
      return;
    }

    // editors cannot access UsersPage
    if (user.type === "editor") {
      navigate("/dashboard/articles");
      return;
    }

    // only admin reaches here
    if (user.type === "admin") {
      loadUsers();
    }
  }, [navigate]);

  const loadUsers = async () => {
    try {
      setLoading(true);

      const { data } = await fetchUsers();

      console.log("USERS RESPONSE:", data);

      setUsers(Array.isArray(data.users) ? data.users : []);
    } catch (error) {
      console.error("FETCH USERS ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({ ...blankForm });
    setErrors({});
  };

  const openModal = (user) => {
    setModal({ open: true, id: user?._id ?? null });
    setForm(user ? { ...blankForm, ...user } : { ...blankForm });
    setErrors({});
  };

  const closeModal = () => {
    setModal({ open: false, id: null });
    setShowPassword(false);
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
    const email = form.email.trim().toLowerCase();
    const username = form.username.trim().toLowerCase();

    const requiredFields = [
      ["firstName", "First name"],
      ["lastName", "Last name"],
      ["age", "Age"],
      ["gender", "Gender"],
      ["contactNumber", "Contact number"],
      ["email", "Email"],
      ["type", "Role"],
      ["username", "Username"],
      ["address", "Address"],
    ];

    if (!modal.id) {
      requiredFields.push(["password", "Password"]);
    }

    requiredFields.forEach(([key, label]) => {
      if (!String(form[key]).trim()) {
        nextErrors[key] = `${label} is required.`;
      }
    });

    if (!nextErrors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (
      !nextErrors.email &&
      users.some(
        (user) => user._id !== modal.id && user.email?.toLowerCase() === email,
      )
    ) {
      nextErrors.email = "Email address already exists.";
    }

    if (
      !nextErrors.username &&
      users.some(
        (user) =>
          user._id !== modal.id && user.username?.toLowerCase() === username,
      )
    ) {
      nextErrors.username = "Username already exists.";
    }

    if (form.password && !nextErrors.password && form.password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters.";
    }

    if (!nextErrors.contactNumber && !/^\d{11}$/.test(form.contactNumber)) {
      nextErrors.contactNumber = "Contact number must be exactly 11 digits.";
    }

    if (!nextErrors.age && !/^\d+$/.test(form.age)) {
      nextErrors.age = "Age must contain numbers only.";
    }

    if (!nextErrors.username && /\s/.test(form.username)) {
      nextErrors.username = "Username must not contain spaces.";
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

    const nextUser = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      age: form.age.trim(),
      gender: form.gender.trim().toLowerCase(),
      contactNumber: form.contactNumber.trim(),
      email: form.email.trim().toLowerCase(),
      type: form.type.trim().toLowerCase(),
      username: form.username.trim().toLowerCase(),
      ...(form.password && {
        password: form.password,
      }),
      address: form.address.trim(),
      isActive: form.isActive,
    };

    try {
      if (modal.id) {
        const response = await updateUser(modal.id, nextUser);

        const updatedUser = response.data.user;

        setUsers((prev) =>
          prev.map((user) => (user._id === modal.id ? updatedUser : user)),
        );
        setSuccess("User updated successfully!");
      } else {
        const createdUser = await createUser(nextUser);

        setUsers((prev) => [...prev, createdUser.data.user]);
        setSuccess("User created successfully!");
      }

      setTimeout(() => {
        closeModal();
      }, 1200);
    } catch (err) {
      console.error(err);
      setError("Failed to save user.");
    }
  };

  const toggleStatus = async (id) => {
    try {
      const user = users.find((u) => u._id === id);

      const response = await updateUser(id, {
        ...user,
        isActive: !user.isActive,
      });

      const updatedUser = response.data.user;

      setUsers((prev) => prev.map((u) => (u._id === id ? updatedUser : u)));
      setSuccess(
        updatedUser.isActive
          ? "User activated successfully!"
          : "User disabled successfully!",
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
    { field: "_id", headerName: "ID", minwidth: 220 },

    {
      field: "fullName",
      headerName: "Full Name",
      flex: 1,
      minWidth: 170,
      valueGetter: (_, row) => `${row.firstName} ${row.lastName}`.trim(),
    },

    { field: "username", headerName: "Username", minWidth: 150 },
    { field: "age", headerName: "Age", minWidth: 90 },
    {
      field: "gender",
      headerName: "Gender",
      minWidth: 110,
      valueGetter: (_, row) => labelize(row.gender),
    },

    {
      field: "contactNumber",
      headerName: "Contact Number",
      minWidth: 160,
    },

    {
      field: "email",
      headerName: "Email",
      flex: 1.1,
      minWidth: 220,
    },

    {
      field: "type",
      headerName: "Role",
      minWidth: 120,

      renderCell: ({ row }) => {
        const role = row.type;

        const roleStyles = {
          admin: {
            bg: "#FDECC8",
            color: "#92400E",
            border: "#F4C97A",
          },

          editor: {
            bg: "#DCEBFF",
            color: "#1D4ED8",
            border: "#93C5FD",
          },

          viewer: {
            bg: "#EFE5D8",
            color: "#7A6A58",
            border: "#D6C4B2",
          },
        };

        const style = roleStyles[role] || roleStyles.viewer;

        return (
          <Chip
            label={labelize(role)}
            variant="filled"
            sx={{
              fontWeight: 700,
              borderRadius: "999px",
              px: 0.5,

              minWidth: 85,
              height: 28,

              bgcolor: style.bg,
              color: style.color,
              border: `1px solid ${style.border}`,

              "& .MuiChip-label": {
                px: 1.2,
              },
            }}
          />
        );
      },
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

  const filteredUsers = users.filter((user) => {
    const searchText = search.toLowerCase();

    const matchSearch =
      (user.firstName || "").toLowerCase().includes(searchText) ||
      (user.lastName || "").toLowerCase().includes(searchText) ||
      (user.email || "").toLowerCase().includes(searchText) ||
      (user.username || "").toLowerCase().includes(searchText);

    const matchRole = roleFilter ? user.type === roleFilter : true;
    const matchGender = genderFilter ? user.gender === genderFilter : true;

    const matchStatus =
      statusFilter !== "" ? user.isActive.toString() === statusFilter : true;

    return matchSearch && matchRole && matchGender && matchStatus;
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
        {/* LEFT SIDE */}
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "#3E2C23",
              mb: 1,
            }}
          >
            User Management
          </Typography>

          <Typography
            sx={{
              color: "#7A6A58",
              fontSize: 14,
              maxWidth: 700,
            }}
          >
            Manage users, permissions, and account status.
          </Typography>
        </Box>

        {/* RIGHT SIDE (FORCES ALIGNMENT) */}
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
            startIcon={<PersonAddAlt1Icon />}
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
            Add User
          </Button>
        </Box>
      </Stack>

      {/* KPI CARDS */}
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
              transition: "0.2s",
            },
          }}
        >
          <Box
            sx={{
              p: 2.5,
              display: "flex",
              flexDirection: "column",
              gap: 0.5,
            }}
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
              <GroupIcon sx={{ color: "#8B5E3C" }} />
            </Box>

            <Typography sx={{ color: "#6B7280", fontSize: 14 }}>
              Total Users
            </Typography>

            <Typography sx={{ fontSize: 30, fontWeight: 700 }}>
              {loading ? "..." : users.length}
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
              transition: "0.2s",
            },
          }}
        >
          <Box
            sx={{
              p: 2.5,
              display: "flex",
              flexDirection: "column",
              gap: 0.5,
            }}
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
              Active Users
            </Typography>

            <Typography sx={{ fontSize: 30, fontWeight: 700 }}>
              {loading ? "..." : users.filter((u) => u.isActive).length}
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
              transition: "0.2s",
            },
          }}
        >
          <Box
            sx={{
              p: 2.5,
              display: "flex",
              flexDirection: "column",
              gap: 0.5,
            }}
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
              <AdminPanelSettingsIcon sx={{ color: "#F59E0B" }} />
            </Box>

            <Typography sx={{ color: "#6B7280", fontSize: 14 }}>
              Admin Users
            </Typography>

            <Typography sx={{ fontSize: 30, fontWeight: 700 }}>
              {loading ? "..." : users.filter((u) => u.type === "admin").length}
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

      {/* FILTERS */}
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
            placeholder="Search name, email, username..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            fullWidth
            sx={inputStyle}
          />

          <TextField
            select
            label="Role"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            sx={{ minWidth: 140, ...inputStyle }}
          >
            <MenuItem value="">All Roles</MenuItem>

            {roles.map((role) => (
              <MenuItem key={role} value={role}>
                {labelize(role)}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Gender"
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            sx={{ minWidth: 140, ...inputStyle }}
          >
            <MenuItem value="">All Genders</MenuItem>

            {genders.map((gender) => (
              <MenuItem key={gender} value={gender}>
                {labelize(gender)}
              </MenuItem>
            ))}
          </TextField>

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
        </Stack>
      </Paper>

      {/* TABLE */}
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
        <Box
          sx={{
            height: { xs: 500, md: 580 },
            width: "100%",
          }}
        >
          <DataGrid
            rows={filteredUsers}
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

      {/* MODAL */}
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
            {modal.id ? "Edit User" : "Add User"}
          </DialogTitle>

          <DialogContent dividers sx={{ px: { xs: 2, sm: 3 } }}>
            <Stack spacing={2} sx={{ pt: 1 }}>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField {...fieldProps("firstName", "First name")} />

                <TextField {...fieldProps("lastName", "Last name")} />
              </Stack>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField {...fieldProps("age", "Age")} />

                <TextField
                  {...fieldProps("gender", "Gender", {
                    select: true,
                  })}
                >
                  {genders.map((gender) => (
                    <MenuItem key={gender} value={gender}>
                      {labelize(gender)}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField {...fieldProps("contactNumber", "Contact Number")} />
                <TextField
                  {...fieldProps("email", "Email Address", {
                    type: "email",
                  })}
                />
              </Stack>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  {...fieldProps("type", "Role", {
                    select: true,
                  })}
                >
                  {roles.map((role) => (
                    <MenuItem key={role} value={role}>
                      {labelize(role)}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField {...fieldProps("username", "Username")} />
              </Stack>

              <TextField
                {...fieldProps("password", "Password", {
                  type: showPassword ? "text" : "password",

                  slotProps: {
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onClick={() => setShowPassword((prev) => !prev)}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  },
                })}
              />

              <TextField
                {...fieldProps("address", "Address", {
                  multiline: true,
                  rows: 3,
                })}
              />

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
                    ? "User status: Active"
                    : "User status: Inactive"
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
              {modal.id ? "Update User" : "Save User"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default UsersPage;
