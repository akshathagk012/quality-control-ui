import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ViewIcon from "@/assets/icons/eye.jpg";
import { MoreHoriz } from "@mui/icons-material";
import AddEquipmentPopup from "./AddEquipmentPopup";
import { Equipment } from "@/types";

const EquipmentPage = () => {
  const [equipmentData, setEquipmentData] = useState<Equipment[]>([]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [openAddEquipmentPopup, setOpenAddEquipmentPopup] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try { // Load mock data for clinic_id = 1
        const { mockEquipments } = await import('@/utils/mockData');
        console.log('Loaded Equipments:', mockEquipments);
        setEquipmentData(mockEquipments);
      } catch (error) {
        console.error('Error loading departments:', error);
      }
    };
    fetchData()
  }, []);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getCreatedDate = (dateString: string) => {
    let date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <Box>
      {/* Header Row */}
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
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenAddEquipmentPopup(true)} sx={{ backgroundColor: "#505050", "&:hover": {backgroundColor: "#505050", boxShadow: "none"}}}>
            Add Equipment's
          </Button>
        </Box>
      </Box>

      {/* Cards */}
      <Grid container spacing={2}>
        {equipmentData.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <Card sx={{ borderRadius: "16px", border: "1px solid #E5E7EB", boxShadow: "none" }}>
              <CardContent sx={{ pb: 1 }}>
                
                {/* Title + Menu */}
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: "14px" }}>
                    {item.equipment_name}
                  </Typography>
                </Box>

                {/* Department + Parameters in one row */}
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                  <Box>
                    <Typography sx={{ fontSize: "13px", color: "#9CA3AF", fontFamily: "Montserrat" }}>Department:</Typography>
                    <Typography sx={{ fontSize: "14px", fontFamily: "Montserrat" }}>{item.department?.name}</Typography>
                  </Box>

                  <Box>
                    <Typography sx={{ fontSize: "13px", color: "#9CA3AF", fontFamily: "Montserrat" }}>Parameters:</Typography>
                    <Typography sx={{ fontSize: "14px", fontFamily: "Montserrat" }}>{item.parameters.length}</Typography>
                  </Box>
                </Box>
              </CardContent>

              {/* Divider */}
              <Box sx={{ height: "1px", background: "#E5E7EB", mx: 2, mt: 1 }} />

              {/* Footer */}
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2, pt: 1 }}>
                
                <Typography sx={{ fontSize: "14px", color: "#4B5563", fontFamily: "Montserrat" }}>
                  <span style={{ color: "#9CA3AF" }}>Created Date:</span> {getCreatedDate(item.created_at)}
                </Typography>

                <Box sx={{ display: "flex", gap: 1 }}>
                  <IconButton sx={{ width: 32, height: 32, border: "1px solid #E5E7EB", borderRadius: "8px" }}>
                    <img src={ViewIcon} alt="view" style={{ width: 18, height: 18 }} />
                  </IconButton>

                  <IconButton onClick={(e)=>setAnchorEl(e.currentTarget)} sx={{p:0.5}}>
                    <MoreHoriz fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* Menu at Page Bottom (Works for all cards) */}
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose} 
        PaperProps={{ sx:{ width:"96px", borderRadius:"8px", ml: "-60px", mt: "10px", boxShadow:"0px 1px 4px rgba(0,0,0,0.1)" }}}>
        <MenuItem onClick={handleClose} sx={{ width:"96px", height:"33px", p:"8px", gap:"6px", borderBottom:"1px solid #E5E7EB" }}>Delete</MenuItem>
        <MenuItem onClick={handleClose} sx={{ width:"96px", height:"33px", p:"8px", gap:"6px" }}>Inactive</MenuItem>
      </Menu>

      <AddEquipmentPopup open={openAddEquipmentPopup} onClose={() => setOpenAddEquipmentPopup(false)} />
    </Box>
  );
};

export default EquipmentPage;