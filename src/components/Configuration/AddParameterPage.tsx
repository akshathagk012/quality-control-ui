import { useState } from "react";
import {
  Box,
  Typography,
  Chip,
  IconButton,
  Button,
  Checkbox,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBackRounded";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import AddParameterPopup from "./AddParameterPopup"; // adjust path if needed

interface Row {
  incubator: string;
  make: string;
  model: string;
}

const AddParameterPage = () => {
  const navigate = useNavigate();

  const [equipmentName] = useState("Incubators");
  const [department] = useState("Embryology");

  const [count, setCount] = useState<number>(5);
  const incubators = Array.from({ length: count }, (_, i) => `Incubator ${i + 1}`);

  const [selected, setSelected] = useState<string[]>([]);

  const [make, setMake] = useState("");
  const [model, setModel] = useState("");

  const [tableData, setTableData] = useState<Row[]>([]);
  const [showBottomSave, setShowBottomSave] = useState(false);

  const [showAddParamPopup, setShowAddParamPopup] = useState(false);
  const [parameters, setParameters] = useState<any[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // ------------------------------
  // Checkbox toggle
  // ------------------------------
  const handleCheck = (inc: string) => {
    setSelected((prev) =>
      prev.includes(inc)
        ? prev.filter((i) => i !== inc)
        : [...prev, inc]
    );
  };

  // ------------------------------
  // Save → Add rows to table
  // ------------------------------
  const handleTopSave = () => {
    if (!make || !model || selected.length === 0) {
      alert("Please fill Make, Model and select incubators");
      return;
    }

    const rows: Row[] = selected.map((name) => ({
      incubator: name,
      make,
      model,
    }));

    setTableData((prev) => [...prev, ...rows]);

    setShowBottomSave(true);
    handleClear();
  };

  // ------------------------------
  // Clear form only
  // ------------------------------
  const handleClear = () => {
    setMake("");
    setModel("");
    setSelected([]);
  };

  // Handle Add/Update Parameter
  const handleAddParameter = (param: any) => {
    if (editingIndex !== null) {
      // Update existing parameter
      const updatedParams = [...parameters];
      updatedParams[editingIndex] = param;
      setParameters(updatedParams);
      setEditingIndex(null);
    } else {
      // Add new parameter
      setParameters((prev) => [...prev, param]);
    }
    setShowAddParamPopup(false);
  };

  // Handle Edit Parameter
  const handleEditParameter = (index: number) => {
    setEditingIndex(index);
    setShowAddParamPopup(true);
  };

  // Handle Delete Parameter
  const handleDeleteParameter = (index: number) => {
    setParameters((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Box sx={{ p: 3, background: "#fff", minHeight: "100vh" }}>
      {/* HEADER */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <IconButton
          onClick={() => navigate("/configuration/equipments")}
          sx={{
            width: 32,
            height: 32,
            border: "1px solid #E5E7EB",
            mr: 1,
            borderRadius: "8px",
          }}
        >
          <ArrowBackIcon sx={{ fontSize: 18 }} />
        </IconButton>

        <Typography sx={{ fontSize: 20, fontWeight: 700 }}>
          Equipment's
        </Typography>
      </Box>

      {/* TITLE */}
      <Typography
        sx={{
          fontSize: 18,
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        {equipmentName}
        <Chip
          size="small"
          label={department}
          sx={{ background: "#E6F4EA", color: "#2E7D32" }}
        />
      </Typography>

      {/* PARAMETER HEADER */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 3,
        }}
      >
        <Typography fontWeight={600}>
          Parameters (e.g. Temperature)
        </Typography>

        <Button size="small" onClick={() => setShowAddParamPopup(true)}>
          + Add Parameters
        </Button>
      </Box>

      {/* AddParameterPopup */}
      <AddParameterPopup
        open={showAddParamPopup}
        onClose={() => {
          setShowAddParamPopup(false);
          setEditingIndex(null);
        }}
        onAdd={handleAddParameter}
        editData={editingIndex !== null ? parameters[editingIndex] : null}
      />

      <Box sx={{ borderBottom: "1px solid #eee", my: 2 }} />

      {/* COUNT */}
      <Typography fontWeight={600}>#No. of Incubators</Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 1 }}>
        <Button
          variant="outlined"
          size="small"
          onClick={() => setCount(Math.max(1, count - 1))}
        >
          −
        </Button>

        <Typography>{count.toString().padStart(2, "0")}</Typography>

        <Button
          variant="outlined"
          size="small"
          onClick={() => setCount(count + 1)}
        >
          +
        </Button>
      </Box>

      {/* SELECT INCUBATORS */}
      <Typography sx={{ mt: 3, mb: 1, fontWeight: 600 }}>
        Select Incubators
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {incubators.map((inc) => (
          <Box key={inc} sx={{ display: "flex", alignItems: "center" }}>
            <Checkbox
              size="small"
              checked={selected.includes(inc)}
              onChange={() => handleCheck(inc)}
            />
            <Typography>{inc}</Typography>
          </Box>
        ))}
      </Box>

      {/* DETAILS */}
      <Typography sx={{ mt: 3, mb: 1, fontWeight: 600 }}>
        {selected.length > 0
          ? `Details of ${selected.join(", ")}`
          : "Details"}
      </Typography>

      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          fullWidth
          size="small"
          label="Make"
          value={make}
          onChange={(e) => setMake(e.target.value)}
        />

        <TextField
          fullWidth
          size="small"
          label="Model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />

        <Button
          variant="contained"
          sx={{ height: 40 }}
          onClick={handleTopSave}
        >
          Save
        </Button>
      </Box>

      {/* TABLE */}
      {tableData.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Table>
            <TableHead sx={{ background: "#F9FAFB" }}>
              <TableRow>
                <TableCell>Sr.No</TableCell>
                <TableCell>Incubator</TableCell>
                <TableCell>Make</TableCell>
                <TableCell>Model</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {tableData.map((row, i) => (
                <TableRow key={i}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{row.incubator}</TableCell>
                  <TableCell>{row.make}</TableCell>
                  <TableCell>{row.model}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      )}

      {/* Added Parameters */}
      {parameters.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography fontWeight={600} mb={2}>Added Parameters:</Typography>
          <Table>
            <TableHead sx={{ background: "#F9FAFB" }}>
              <TableRow>
                <TableCell>Sr.No</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Data Type</TableCell>
                <TableCell>Value/Range</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {parameters.map((p, i) => {
                let displayValue = "";
                if (p.dataType === "Decimal") {
                  displayValue = `${p.minValue}°C - ${p.maxValue}°C`;
                } else if (p.dataType === "Select") {
                  displayValue = p.selectedOptions?.join(", ") || "-";
                } else if (p.dataType === "Dropdown") {
                  displayValue = p.dropdownValue || "-";
                } else if (p.dataType === "Text") {
                  displayValue = p.textValue || "-";
                } else if (p.dataType === "Percentage") {
                  displayValue = p.percentage ? `${p.percentage}%` : "-";
                } else if (p.dataType === "Integer") {
                  displayValue = p.integerValue || "-";
                }

                return (
                  <TableRow key={i}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{p.name}</TableCell>
                    <TableCell>{p.dataType}</TableCell>
                    <TableCell>{displayValue}</TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => handleEditParameter(i)}
                        sx={{ color: "#1976d2" }}
                      >
                        <EditIcon sx={{ fontSize: 18 }} />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteParameter(i)}
                        sx={{ color: "#d32f2f" }}
                      >
                        <DeleteIcon sx={{ fontSize: 18 }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      )}

      {/* BOTTOM BUTTONS */}
      {showBottomSave && (
        <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button variant="outlined" onClick={handleClear}>
            Clear All
          </Button>

          <Button variant="contained">
            Save
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default AddParameterPage;
