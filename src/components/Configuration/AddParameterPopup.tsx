import React, { useEffect, useState } from "react";
import { Dialog } from "@mui/material";
import { DialogTitle } from "@mui/material";
import { DialogContent } from "@mui/material";
import { TextField } from "@mui/material";
import { MenuItem } from "@mui/material";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  open: boolean;
  onClose: () => void;
  onAdd: (data: any) => void;
}

const AddParameterPopup: React.FC<Props> = ({ open, onClose, onAdd }) => {
  const [name, setName] = useState("");
  const [dataType, setDataType] = useState("");
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");

  useEffect(() => {
    if (open) {
      setName("");
      setDataType("");
      setMinValue("");
      setMaxValue("");
    }
  }, [open]);

  const handleAdd = () => {
    onAdd({ name, dataType, minValue, maxValue });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth PaperProps={{ sx: { "& .MuiDialogTitle-root + .MuiDialogContent-root": { pt: "6px" }, borderRadius: "12px" } }}>
      <DialogTitle sx={{ fontWeight: 700, fontSize: "18px", display: "flex", justifyContent: "space-between", alignItems: "center", pb: 1 }}>
        Add Parameter

        <IconButton onClick={onClose} sx={{ width: "28px", height: "28px" }}>
          <CloseIcon sx={{ fontSize: "18px", color: "#7A7A7A" }} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
        <TextField label="Name" fullWidth size="small" value={name} onChange={(e) => setName(e.target.value)} InputLabelProps={{ shrink: true }} sx={{"& .MuiInputLabel-root": { color: "#5F646F !important" }, "& .MuiInputLabel-root.Mui-focused": { color: "#5F646F !important" }, "& .MuiOutlinedInput-root": {"& fieldset": { borderColor: "#CFD1D4" }, "&:hover fieldset": { borderColor: "#CFD1D4" }, "&.Mui-focused fieldset": { borderColor: "#CFD1D4" }}, "& .MuiInputBase-input": { color: "#5F646F" }}} />

        <TextField label="Data Type" select fullWidth size="small" value={dataType} onChange={(e) => setDataType(e.target.value)} InputLabelProps={{ shrink: true }} sx={{"& .MuiInputLabel-root": { color: "#5F646F !important" }, "& .MuiInputLabel-root.Mui-focused": { color: "#5F646F !important" }, "& .MuiOutlinedInput-root": {"& fieldset": { borderColor: "#CFD1D4" }, "&:hover fieldset": { borderColor: "#CFD1D4" }, "&.Mui-focused fieldset": { borderColor: "#CFD1D4" }}, "& .MuiInputBase-input": { color: "#5F646F", fontSize: "16px" }}}>
          <MenuItem value="Decimal">Decimal</MenuItem>
          <MenuItem value="Number">Number</MenuItem>
          <MenuItem value="Text">Text</MenuItem>
        </TextField>

        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField label="Min °C" fullWidth size="small" value={minValue} onChange={(e) => setMinValue(e.target.value)} InputLabelProps={{ shrink: true }} sx={{"& .MuiInputLabel-root": { color: "#5F646F !important" }, "& .MuiInputLabel-root.Mui-focused": { color: "#5F646F !important" }, "& .MuiOutlinedInput-root": {"& fieldset": { borderColor: "#CFD1D4" }, "&:hover fieldset": { borderColor: "#CFD1D4" }, "&.Mui-focused fieldset": { borderColor: "#CFD1D4" }}, "& .MuiInputBase-input": { color: "#5F646F" }}} />

          <TextField label="Max °C" fullWidth size="small" value={maxValue} onChange={(e) => setMaxValue(e.target.value)} InputLabelProps={{ shrink: true }} sx={{"& .MuiInputLabel-root": { color: "#5F646F !important" }, "& .MuiInputLabel-root.Mui-focused": { color: "#5F646F !important" }, "& .MuiOutlinedInput-root": {"& fieldset": { borderColor: "#CFD1D4" }, "&:hover fieldset": { borderColor: "#CFD1D4" }, "&.Mui-focused fieldset": { borderColor: "#CFD1D4" }}, "& .MuiInputBase-input": { color: "#5F646F" }}} />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
          <Button variant="outlined" onClick={onClose} sx={{ width: "120px", borderRadius: "10px", borderColor: "#505050", "&:hover": { borderColor: "#505050", backgroundColor: "white" }, color: "#505050", textTransform: "none" }}>Cancel</Button>

          <Button variant="contained" onClick={handleAdd} sx={{ width: "120px", borderRadius: "10px", background: "#383838", textTransform: "none", "&:hover": { background: "#2f2f2f" } }}>Add</Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddParameterPopup;