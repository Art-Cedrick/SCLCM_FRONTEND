import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Container,
  Stack,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  AttachFile as AttachFileIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import AxiosInstance from "./AllForms/Axios";
import { parseISO, format } from "date-fns";

const ResourceSharing = () => {
  const defaultValues = {
    title: "",
    content: "",
    file: null
  };

  const { control, handleSubmit, reset, setValue } = useForm({ defaultValues });
  const [resources, setResources] = useState([]);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingResource, setEditingResource] = useState(null);
  const [notification, setNotification] = useState("");
  const [expandedResourceId, setExpandedResourceId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [resourceToDelete, setResourceToDelete] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    const fetchResources = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setNotification("You must be logged in to perform this action.");
        setLoading(false);
        return;
      }

      try {
        const response = await AxiosInstance.get("/resource/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setResources(response.data);
      } catch (error) {
        console.error("Error fetching resources:", error);
        setNotification("Failed to fetch resources. Please log in.");
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingResource(null);
    reset();
  };

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setNotification("You must be logged in to perform this action.");
      return;
    }

    try {
      const headers = {
        Authorization: `Token ${token}`,
        'Content-Type': 'multipart/form-data'
      };

      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('content', data.content);

      if (data.file) {
        formData.append('file', data.file[0]);
      }

      // Log the form data before sending
      console.log("Form Data Contents:");
      console.log("Title:", data.title);
      console.log("Content:", data.content);
      console.log("File:", data.file ? data.file[0].name : "No file selected");

      if (editingResource) {
        const updatedResource = await AxiosInstance.put(
          `/resource/${editingResource.id}/`,
          formData,
          { headers }
        );
        console.log("Updated Resource Response:", updatedResource.data);
        updatedResource.data.updated = new Date();
        setSnackbarMessage("Resource updated successfully");
        setSnackbarSeverity("success");
      } else {
        const response = await AxiosInstance.post(
          `/resource/`,
          formData,
          { headers }
        );
        console.log("New Resource Response:", response.data);
        setSnackbarMessage("Resource added successfully");
        setSnackbarSeverity("success");
      }

      // const resourcesResponse = await AxiosInstance.get("/resource/", {
      //   headers: {
      //     Authorization: `Token ${token}`
      //   },
      // });
      // console.log("Updated Resources List:", resourcesResponse.data);
      // setResources(resourcesResponse.data);

      // handleClose();
      // setSnackbarOpen(true);
      // setTimeout(() => setNotification(""), 1000);
    } catch (error) {
      console.error("Error saving resource:", error);
      console.error("Error response:", error.response?.data);
      setSnackbarMessage("Error saving resource");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleEdit = (resource) => {
    setEditingResource(resource);
    setValue("title", resource.title);
    setValue("content", resource.content);
    handleClickOpen();
  };

  const handleDeleteDialogOpen = (resource) => {
    setResourceToDelete(resource);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setResourceToDelete(null);
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setNotification("You must be logged in to perform this action.");
      return;
    }

    if (resourceToDelete) {
      try {
        await AxiosInstance.delete(`/resource/${resourceToDelete.id}/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setResources((prev) =>
          prev.filter((resource) => resource.id !== resourceToDelete.id)
        );
        setSnackbarMessage("Resource deleted successfully");
        setSnackbarSeverity("success");

        // Close the delete dialog after deletion
        setDeleteDialogOpen(false);
        setSnackbarOpen(true);
        setTimeout(() => setNotification(""), 1000);
      } catch (error) {
        console.error("Error deleting resource:", error);
        setSnackbarMessage("Error deleting resource");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    }
  };

  const filteredResources = resources.filter(
    (resource) =>
      resource.title &&
      typeof resource.title === "string" &&
      resource.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleContentVisibility = (id) => {
    setExpandedResourceId((prev) => (prev === id ? null : id));
  };

  const tableStyles = `
      table {
        width: 100%;
        border-collapse: collapse;
      }
      th, td {
        border: 1px solid #ddd;
        padding: 12px;
      }
      th {
        background-color: #f2f2f2;
        font-weight: bold;
      }
    `;

  if (loading) {
    return <Typography variant="body2">Loading resources...</Typography>;
  }

  const editorConfig = {
    ckfinder: {
      uploadUrl: 'https://sclcm-backend.onrender.com/api/storage/upload/', 
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`, 
      },
    },
    toolbar: ['heading', 'bold', 'italic', 'underline', 'strikethrough', '|', 'bulletedList', 'numberedList', '|', 'alignment', 'indent', 'outdent', '|', 'link', 'uploadImage', 'uploadFile', '|', 'undo', 'redo'],
    link: {
      defaultProtocol: 'https://',
      decorators: {
        openInNewTab: {
          mode: 'manual',
          label: 'Open in a new tab',
          defaultValue: true,
          attributes: {
            target: '_blank',
            rel: 'noopener noreferrer'
          }
        }
      }
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <style>{tableStyles}</style>
      <Stack spacing={3}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 3 }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              color: "black",
              fontFamily: "'Rozha One'",
              fontSize: "20px",
            }}
          >
            Resource Sharing
          </Typography>
          <Box display="flex" alignItems="center">
            <IconButton onClick={handleClickOpen} sx={{ color: "#004C8C" }}>
              <AddIcon />
            </IconButton>
            <TextField
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              sx={{
                marginLeft: 2,
                "& input": { padding: "5px", lineHeight: "1.2" },
              }}
            />
          </Box>
        </Stack>

        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
          <DialogTitle sx={{ backgroundColor: "#004C8C", color: "white" }}>
            {editingResource ? "Edit Resource" : "Add Resource"}
          </DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                control={control}
                name="title"
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Title"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    sx={{
                      "& .MuiInputLabel-root": { color: "#004C8C" },
                      "& .MuiOutlinedInput-root": {
                        borderColor: "#004C8C",
                      },
                    }}
                  />
                )}
              />
              <Controller
                name="content"
                control={control}
                render={({ field }) => (
                  <CKEditor
                    {...field}
                    editor={ClassicEditor}
                    data={field.value}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      field.onChange(data);
                    }}
                    config={editorConfig}
                    style={{
                      height: "400px",
                      borderColor: "#004C8C",
                    }}
                  />
                )}
              />
              <Controller
                name="file"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <TextField
                    {...field}
                    type="file"
                    onChange={(e) => onChange(e.target.files)}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />
            </form>
          </DialogContent>
          <DialogActions sx={{ backgroundColor: "#004C8C" }}>
            <IconButton size="small" sx={{ color: "white" }}>
              <AttachFileIcon fontSize="small" />
            </IconButton>
            <Button onClick={handleClose} color="white">
              Cancel
            </Button>
            <Button
              onClick={handleSubmit(onSubmit)}
              variant="contained"
              color="primary"
            >
              {editingResource ? "Update" : "Post"}
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={deleteDialogOpen}
          onClose={handleDeleteDialogClose}
          sx={{
            "& .MuiDialog-paper": {
              backgroundColor: "#004C8C",
              color: "white",
            },
          }}
        >
          <DialogTitle sx={{ color: "white" }}>
            Are you sure you want to delete this resource?
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleDeleteDialogClose} color="inherit">
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              color="secondary"
              variant="contained"
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>

        {filteredResources.length > 0 ? (
          filteredResources.map((resource) => (
            <Box
              key={resource.id}
              sx={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                p: 2,
                backgroundColor: "#fff",
                mb: 2,
                cursor: "pointer",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                "&:hover": {
                  backgroundColor: "#f1f1f1",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
                },
              }}
              onClick={() => toggleContentVisibility(resource.id)}
            >
              <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "bold", color: "black" }}
                >
                  {resource.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "0.700rem",
                    fontStyle: "italic",
                    color: "#808080",
                  }}
                >
                  {resource.author}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontSize: "0.600rem", color: "#808080" }}
                >
                  {resource.modified
                    ? `${format(parseISO(resource.modified), "Pp")}`
                    : "Not yet updated"}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "100%",
                  }}
                >
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(resource);
                    }}
                    sx={{ color: "#004C8C" }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteDialogOpen(resource);
                    }}
                    sx={{ color: "#004C8C" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Stack>

              {expandedResourceId === resource.id && (
                <Typography
                  variant="body2"
                  sx={{ mt: 1, textAlign: "justify" }}
                  dangerouslySetInnerHTML={{
                    __html: resource.content,
                  }}
                />
              )}
            </Box>
          ))
        ) : (
          <Typography variant="body2" sx={{ color: "black" }}>
            No resources found.
          </Typography>
        )}
      </Stack>

      {/* Snackbar Notification */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%", color: "blue" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ResourceSharing;