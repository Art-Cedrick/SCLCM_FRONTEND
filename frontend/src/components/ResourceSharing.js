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
  import { parseISO, format } from 'date-fns';

  const ResourceSharing = () => {
    const defaultValues = {
      title: "",
      content: "",
    };

    const { control, handleSubmit, reset, setValue } = useForm({ defaultValues });
    const [resources, setResources] = useState([]);
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [editingResource, setEditingResource] = useState(null);
    const [notification, setNotification] = useState("");
    const [expandedResourceId, setExpandedResourceId] = useState(null);
    const [loading, setLoading] = useState(true);

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
        };

        if (editingResource) {
          const updatedResource = await AxiosInstance.put(
            `/resource/${editingResource.id}/`,
            { title: data.title, content: data.content },
            { headers }
          );
          updatedResource.data.updated = new Date(); // Set the updated date to now
          setNotification("Resource updated successfully");
        } else {
          await AxiosInstance.post(
            `/resource/`,
            { title: data.title, content: data.content },
            { headers }
          );
          setNotification("Resource added successfully");
        }

        const resourcesResponse = await AxiosInstance.get("/resource/", {
          headers,
        });
        setResources(resourcesResponse.data);

        handleClose();

        setTimeout(() => setNotification(""), 3000);
      } catch (error) {
        console.error("Error saving resource:", error);
        setNotification("Error saving resource");
      }
    };

    const handleEdit = (resource) => {
      setEditingResource(resource);
      setValue("title", resource.title);
      setValue("content", resource.content);
      handleClickOpen();
    };

    const handleDelete = async (id) => {
      const token = localStorage.getItem("token");
      if (!token) {
        setNotification("You must be logged in to perform this action.");
        return;
      }

      if (window.confirm("Are you sure you want to delete this resource?")) {
        try {
          await AxiosInstance.delete(`/resource/${id}/`, {
            headers: {
              Authorization: `Token ${token}`,
            },
          });
          setResources((prev) => prev.filter((resource) => resource.id !== id));
          setNotification("Resource deleted successfully");
        } catch (error) {
          console.error("Error deleting resource:", error);
          setNotification("Error deleting resource");
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
        padding: 8px;
      }
      th {
        background-color: #f2f2f2;
        font-weight: bold;
      }
    `;

    if (loading) {
      return <Typography variant="body2">Loading resources...</Typography>;
    }

    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <style>{tableStyles}</style>
        <Stack spacing={2}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              RESOURCE SHARING
            </Typography>
            <Box display="flex" alignItems="center">
              <IconButton onClick={handleClickOpen}>
                <AddIcon />
              </IconButton>
              <TextField
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                sx={{
                  marginRight: 1,
                  height: "30px",
                  "& input": { padding: "5px", lineHeight: "1.2" },
                }}
              />
            </Box>
          </Stack>

          {notification && (
            <Typography
              variant="body2"
              sx={{ color: "green", textAlign: "center" }}
            >
              {notification}
            </Typography>
          )}

          <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
            <DialogTitle>{editingResource ? "Edit Resource" : "Add Resource"}</DialogTitle>
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
                      config={{
                        height: 400, // Set a larger height here
                      }}
                      style={{ height: "400px" }}
                    />
                  )}
                />
              </form>
            </DialogContent>
            <DialogActions>
              <IconButton size="small">
                <AttachFileIcon fontSize="small" />
              </IconButton>
              <Button onClick={handleClose} color="secondary">
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
                }}
                onClick={() => toggleContentVisibility(resource.id)}
              >
                <Stack
                  direction="column"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                >
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    {resource.title}
                  </Typography>

                  <Typography variant="body2" sx={{ fontSize: "0.700rem", fontStyle: "italic", color: "#808080" }}>
                    {resource.author}
                  </Typography>

                  {/* Display the creation date under the title */}
                  
                  <Typography variant="body2" sx={{ fontSize: "0.600rem", color: "#808080" }}>
                    {resource.modified ? `${format(parseISO(resource.modified), 'Pp')}` : "Not yet updated"}
                  </Typography>

                  <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
                    <IconButton size="small" onClick={(e) => { e.stopPropagation(); handleEdit(resource); }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" onClick={(e) => { e.stopPropagation(); handleDelete(resource.id); }}>
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
            <Typography variant="body2">No resources found.</Typography>
          )}
        </Stack>
      </Container>
    );
  };

  export default ResourceSharing;
