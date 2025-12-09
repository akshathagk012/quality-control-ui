import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  Button,
  TextField,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import { MoreHoriz } from "@mui/icons-material";
import ViewIcon from "@/assets/icons/eye.jpg";

import { useNavigate } from "react-router-dom";
import AddEquipmentPopup from "./AddEquipmentPopup";

import { Equipment } from "@/types";

const EquipmentPage = () => {
  const navigate = useNavigate();

  const [equipmentData, setEquipmentData] = useState<Equipment[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<number | null>(null);
  const open = Boolean(anchorEl);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [openAddEquipmentPopup, setOpenAddEquipmentPopup] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { mockEquipments } = await import("@/utils/mockData");
        setEquipmentData(mockEquipments);
      } catch (error) {
        console.error("Error loading equipments:", error);
      }
    };

    fetchData();
  }, []);

  const getCreatedDate = (dateString: string) => {
    let date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Handle Delete Equipment
  const handleDeleteEquipment = (equipmentId: number) => {
    setSelectedEquipmentId(equipmentId);
    setShowDeleteDialog(true);
    setAnchorEl(null);
  };

  // Confirm Delete
  const confirmDelete = () => {
    setEquipmentData((prev) =>
      prev.filter((item) => item.id !== selectedEquipmentId)
    );
    setShowDeleteDialog(false);
    setSelectedEquipmentId(null);
  };

  // Handle Inactive Equipment
  const handleInactiveEquipment = (equipmentId: number) => {
    setEquipmentData((prev) =>
      prev.map((item) =>
        item.id === equipmentId ? { ...item, status: "inactive" } : item
      )
    );
    setAnchorEl(null);
  };

  // Handle Active Equipment (toggle back to active)
  const handleActiveEquipment = (equipmentId: number) => {
    setEquipmentData((prev) =>
      prev.map((item) =>
        item.id === equipmentId ? { ...item, status: "active" } : item
      )
    );
    setAnchorEl(null);
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography sx={{ fontWeight: 700, fontSize: "20px" }}>
          Equipment's
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            size="small"
            placeholder="Search Equipment's"
            sx={{ width: 260, background: "#fff" }}
          />

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenAddEquipmentPopup(true)}
            sx={{
              background: "#505050",
              "&:hover": { background: "#505050" },
            }}
          >
            Add Equipment's
          </Button>
        </Box>
      </Box>

      {/* Cards */}
      <Grid container spacing={2}>
        {equipmentData.map((item) => {
          const isInactive = item.status === "inactive";
          
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
              <Card
                sx={{
                  borderRadius: "16px",
                  border: "1px solid #E5E7EB",
                  boxShadow: "none",
                  opacity: isInactive ? 0.5 : 1,
                  backgroundColor: isInactive ? "#F5F5F5" : "#fff",
                  transition: "all 0.3s ease",
                }}
              >
                <CardContent sx={{ pb: 1 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography sx={{ fontWeight: 600, fontSize: "14px" }}>
                      {item.equipment_name}
                    </Typography>
                    {isInactive && (
                      <Typography
                        sx={{
                          fontSize: "10px",
                          fontWeight: 600,
                          background: "#E0E0E0",
                          color: "#666",
                          px: 1,
                          py: 0.5,
                          borderRadius: "4px",
                        }}
                      >
                        INACTIVE
                      </Typography>
                    )}
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 2,
                    }}
                  >
                    <Box>
                      <Typography sx={{ fontSize: 13, color: "#9CA3AF" }}>
                        Department:
                      </Typography>
                      <Typography sx={{ fontSize: 14 }}>
                        {item.department?.name}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography sx={{ fontSize: 13, color: "#9CA3AF" }}>
                        Parameters:
                      </Typography>
                      <Typography sx={{ fontSize: 14 }}>
                        {item.parameters.length}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>

                <Box sx={{ height: 1, background: "#E5E7EB", mx: 2 }} />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 2,
                    pt: 1,
                  }}
                >
                  <Typography sx={{ fontSize: 14, color: "#4B5563" }}>
                    <span style={{ color: "#9CA3AF" }}>Created:</span>{" "}
                    {getCreatedDate(item.created_at)}
                  </Typography>

                  <Box sx={{ display: "flex", gap: 1 }}>
                    {/* VIEW BUTTON - Disabled when inactive */}
                    <IconButton
                      onClick={() =>
                        !isInactive &&
                        navigate("/configuration/equipment/view", {
                          state: {
                            equipmentName: item.equipment_name,
                            department: item.department?.name,
                          },
                        })
                      }
                      disabled={isInactive}
                      sx={{
                        width: 32,
                        height: 32,
                        border: "1px solid #E5E7EB",
                        borderRadius: "8px",
                        opacity: isInactive ? 0.5 : 1,
                        cursor: isInactive ? "not-allowed" : "pointer",
                      }}
                    >
                      <img
                        src={ViewIcon}
                        alt="view"
                        style={{ width: 18, height: 18, opacity: isInactive ? 0.5 : 1 }}
                      />
                    </IconButton>

                    {/* MENU BUTTON - Disabled when inactive */}
                    <IconButton
                      onClick={(e) => {
                        if (!isInactive) {
                          setSelectedEquipmentId(item.id);
                          setAnchorEl(e.currentTarget);
                        }
                      }}
                      disabled={isInactive}
                      sx={{
                        p: 0.5,
                        opacity: isInactive ? 0.5 : 1,
                        cursor: isInactive ? "not-allowed" : "pointer",
                      }}
                    >
                      <MoreHoriz fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Menu */}
      <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
        {selectedEquipmentId && equipmentData.find(e => e.id === selectedEquipmentId)?.status === "inactive" ? (
          <MenuItem onClick={() => handleActiveEquipment(selectedEquipmentId)}>
            Activate
          </MenuItem>
        ) : (
          <MenuItem onClick={() => handleInactiveEquipment(selectedEquipmentId || 0)}>
            Inactive
          </MenuItem>
        )}
        <MenuItem onClick={() => handleDeleteEquipment(selectedEquipmentId || 0)} sx={{ color: "#d32f2f" }}>
          Delete
        </MenuItem>
      </Menu>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onClose={() => setShowDeleteDialog(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this equipment? 
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
          <Button
            onClick={confirmDelete}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Equipment Popup */}
      <AddEquipmentPopup
        open={openAddEquipmentPopup}
        onClose={() => setOpenAddEquipmentPopup(false)}
      />
    </Box>
  );
};

export default EquipmentPage;
