import React, { useEffect, useState } from "react";
import { Box, Menu, MenuItem } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { Chip } from "@mui/material";
import { TextField } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddParameterPopup from "./AddParameterPopup";
import { MoreHoriz } from "@mui/icons-material";
import { initializeMockData } from "@/utils/mockData";

const AddParameterPage = () => {
    const [equipmentName, setEquipmentName] = useState("");
    const [department, setDepartment] = useState("");
    const navigate = useNavigate();

    const [count, setCount] = useState(1);
    const [selected, setSelected] = useState<number[]>([]);
    const [openParamPopup, setOpenParamPopup] = useState(false);
    const [parameters, setParameters] = useState<any[]>([]);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const equipmentQuantity = Array.from({ length: count }, (_, i) => i + 1);
    const [make, setMake] = useState("");
    const [model, setModel] = useState("");
    const [equipmentTable, setEquipmentTable] = useState<any[]>([]);


    useEffect(() => {
        setEquipmentName(localStorage.getItem("equipmentName") || "");
        setDepartment(localStorage.getItem("department") || "");
    }, []);

    const toggleSelection = (num: number) => {
        setSelected((prev) =>
            prev.includes(num) ? prev.filter((i) => i !== num) : [...prev, num]
        );
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSaveEquipmentDetails = () => {
        const newRows = selected.map((num) => ({
            sr: equipmentTable.length + 1 + selected.indexOf(num),
            equipmentNum: num,
            make,
            model
        }));

        setEquipmentTable((prev) => [...prev, ...newRows]);

        // Reset fields
        setMake("");
        setModel("");
    };

    const headerStyle: React.CSSProperties = {
        padding: "10px",
        textAlign: "left",
        fontSize: "14px",
        fontWeight: 600,
        color: "#4B5563",
        borderBottom: "1px solid #E5E7EB"
    };

    const cellStyle: React.CSSProperties = {
        padding: "10px",
        fontSize: "14px",
        color: "#4B5563"
    };

    const handleClearAll = () => {
        setSelected([]);
        setCount(1);
        setMake("");
        setModel("");
        setEquipmentTable([]);
        setParameters([]);
    };

    const handleFinalSave = async () => {
        try {
            const clinicId = 1;

            // GET existing clinic
            const res = await fetch(`http://127.0.0.1:8000/api/get_clinic/${clinicId}/`);
            const existingClinic = await res.json();

            // Add NEW equipment
            const newEquipment = {
                equipment_name: equipmentName,
                equipment_details: equipmentTable.map((row) => ({
                    equipment_num: `${equipmentName}-${row.equipmentNum}`,
                    make: row.make,
                    model: row.model,
                    is_active: true,
                })),
                parameters: parameters.map((p) => ({
                    parameter_name: p.name,
                    is_active: true,
                    content: {
                    data_type: p.dataType,
                    min_value: p.minValue,
                    max_value: p.maxValue,
                    },
                })),
            };

            // updated clinic object
            const updatedClinic = {
                name: existingClinic.name, // clinic name only
                department: existingClinic.department.map((dept: { equipments: any[]; name: string; is_active: any; }) => {
                    // Clean equipment array (remove IDs)
                    const cleanedEquipments = dept.equipments.map((eq) => ({
                        equipment_name: eq.equipment_name,
                        equipment_details: eq.equipment_details.map((d: { equipment_num: any; make: any; model: any; is_active: any; }) => ({
                            equipment_num: d.equipment_num,
                            make: d.make,
                            model: d.model,
                            is_active: d.is_active,
                        })),
                        parameters: eq.parameters.map((p: { parameter_name: any; is_active: any; content: any; }) => ({
                            parameter_name: p.parameter_name,
                            is_active: p.is_active,
                            content: p.content,
                        })),
                    }));

                    return {
                        name: dept.name,
                        is_active: dept.is_active,
                        equipments: [...cleanedEquipments, newEquipment],
                    };
                }),
            };

            // PUT updated clinic
            const saveRes = await fetch(`http://127.0.0.1:8000/api/clinics/${clinicId}/`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedClinic),
            });

            if (!saveRes.ok) throw new Error("Failed to save clinic");
            initializeMockData(clinicId); // Refresh mock data
            navigate("/dashboard"); // On success, navigate

        } catch (error) {
            console.error("Error while saving:", error);
        }
    };

    return (
        <Box>
            <Box sx={{ p: 1, background: "#FFFFFF", minHeight: "100vh" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <IconButton onClick={() => navigate("/configuration")} sx={{width: "32px", height: "32px", border: "1px solid #E5E7EB", borderRadius: "8px",}}>
                        <ArrowBackRoundedIcon sx={{ fontSize: "18px", color: "#4B5563" }} />
                    </IconButton>

                    <Typography sx={{ fontWeight: 700, fontSize: "20px" }}>Equipment's</Typography>
                </Box>

                <Box sx={{ height: "1px", background: "#E5E7EB", mt: 2, mb: 2 }}></Box>

                <Typography sx={{fontWeight: 700, fontSize: "18px", display: "flex", alignItems: "center", gap: 1,}}>
                    {equipmentName}
                    <Chip label={department} sx={{background: "#E0F1E6", color: "#3D8B61", fontWeight: 600, height: "22px",}}/>
                </Typography>

                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 3 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: "16px" }}>Parameters (e.g. Temperature)</Typography>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer" }} onClick={() => setOpenParamPopup(true)}>
                        <Typography sx={{ color: "#2563EB", fontSize: "14px" }}>+</Typography>
                        <Typography sx={{ color: "#2563EB", fontSize: "14px", fontWeight: 500 }}>Add Parameters</Typography>
                    </Box>
                </Box>

                {parameters.length > 0 && (
                    <Box sx={{ mt: 3, display: "flex", flexWrap: "wrap", gap: 2 }}>
                        {parameters.map((p, index) => (
                            <Box
                                key={index}
                                sx={{
                                    width: "260px",
                                    border: "1px solid #E5E7EB",
                                    borderRadius: "12px",
                                    background: "#FFFFFF",
                                    p: 2,
                                    boxShadow: "0px 1px 2px rgba(0,0,0,0.04)",
                                }}
                                >
                                {/* Header row */}
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <Typography sx={{ fontWeight: 600, fontSize: "15px" }}>
                                        {p.name}
                                    </Typography>

                                    {/* 3 dots menu button */}
                                    <IconButton size="small" onClick={(e)=>setAnchorEl(e.currentTarget)} sx={{ padding: "4px", borderRadius: "6px", backgroundColor: "#F3F4F6" }}>
                                        <MoreHoriz sx={{ fontSize: "18px", color: "#6B7280" }} />
                                    </IconButton>
                                </Box>

                                {/* Data Type */}
                                <Typography sx={{ fontSize: "12px", color: "#6B7280", mt: 0.5 }}>
                                    Data Type : {p.dataType}
                                </Typography>

                                {/* Divider */}
                                <Box sx={{ height: "1px", background: "#E5E7EB", mt: 1.2, mb: 1.2 }} />

                                {/* Min - Max Display */}
                                {(p.minValue || p.maxValue) && (
                                    <Typography sx={{ fontSize: "13px", fontWeight: 500, color: "#374151" }}>
                                        Min {p.minValue} °C   –   Max {p.maxValue} °C
                                    </Typography>
                                )}
                            </Box>
                        ))}
                    </Box>
                )}
                <Box sx={{ height: "1px", background: "#E5E7EB", mt: 2 }}></Box>

                <Box sx={{ mt: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
                            #No. of {equipmentName}s :
                        </Typography>

                        {/* Minus Button */}
                        <Button
                            variant="outlined"
                            onClick={() => setCount((c) => (c > 1 ? c - 1 : c))}
                            sx={{
                                minWidth: "38px",
                                height: "32px",
                                borderRadius: "8px",
                                color: "#565656",
                                borderColor: "#CFCFCF",
                                textTransform: "none",
                                fontSize: "20px",
                                fontWeight: 500,
                                px: 0,
                            }}
                        >
                            –
                        </Button>

                        {/* Value Box */}
                        <Box
                            sx={{
                                width: "48px",
                                height: "32px",
                                border: "1px solid #CFCFCF",
                                borderRadius: "8px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                fontWeight: 600,
                                color: "#565656",
                                background: "#FFFFFF",
                                fontSize: "14px",
                            }}
                        >
                            {String(count).padStart(2, "0")}
                        </Box>

                        {/* Plus Button */}
                        <Button
                            variant="outlined"
                            onClick={() => setCount((c) => c + 1)}
                            sx={{
                                minWidth: "38px",
                                height: "32px",
                                borderRadius: "8px",
                                color: "#565656",
                                borderColor: "#CFCFCF",
                                textTransform: "none",
                                fontSize: "20px",
                                fontWeight: 500,
                                px: 0,
                            }}
                        >
                        +
                        </Button>
                    </Box>
                </Box>

                <Typography sx={{ fontSize: "14px", fontWeight: 600, mt: 3 }}>
                    Select {equipmentName}s
                </Typography>

                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 1 }}>
                    {equipmentQuantity.map((num) => (
                        <Box
                            key={num}
                            onClick={() => toggleSelection(num)}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                px: 2,
                                height: "36px",
                                borderRadius: "8px",
                                cursor: "pointer",
                                borderColor: "#E2E3E5",
                                background: "#FAFAFA",
                                transition: "0.2s",
                            }}
                            >
                            {selected.includes(num) ? (
                                <Box
                                    sx={{
                                        width: "20px",
                                        height: "20px",
                                        borderRadius: "6px",
                                        background: "#DEEFE1",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <svg
                                        width="13"
                                        height="13"
                                        fill="#3D8B61"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M20.285 6.708l-11.285 11.292-5.285-5.292 1.414-1.414 3.871 3.879 9.871-9.878z" />
                                    </svg>
                                </Box>
                            ) : (
                            <Box
                                sx={{
                                    width: "20px",
                                    height: "20px",
                                    borderRadius: "6px",
                                    border: "1.8px solid #D1D5DB",
                                }}
                            />
                            )}

                            <Typography
                                sx={{
                                fontSize: "14px",
                                fontWeight: 500,
                                color: "#4B5563",
                                }}
                            >
                                {equipmentName} {num}
                            </Typography>
                        </Box>
                    ))}
                </Box>

                {/* Details Section Title */}
                {selected.length > 0 && (
                    <Typography
                        sx={{
                        mt: 4,
                        fontSize: "15px",
                        fontWeight: 600,
                        mb: 2
                        }}
                    >
                        Details of {selected.map((n) => `${equipmentName} ${n}`).join(", ")}
                    </Typography>
                )}

                {/* Make & Model Inputs */}
                {selected.length > 0 && (
                    <Box sx={{ display: "flex", gap: 3 }}>
                        <TextField
                            placeholder="Enter Make"
                            label="Make"
                            value={make}
                            onChange={(e) => setMake(e.target.value)}
                            fullWidth
                            size="small"
                            InputLabelProps={{ shrink: true }}
                            sx={{"& .MuiInputLabel-root": { color: "#5F646F !important" }, "& .MuiInputLabel-root.Mui-focused": { color: "#5F646F !important" }, "& .MuiOutlinedInput-root": {"& fieldset": { borderColor: "#CFD1D4" }, "&:hover fieldset": { borderColor: "#CFD1D4" }, "&.Mui-focused fieldset": { borderColor: "#CFD1D4" }}, "& .MuiInputBase-input": { color: "#5F646F" }}}
                        />

                        <TextField
                            placeholder="Enter Model"
                            label="Model"
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                            fullWidth
                            size="small"
                            InputLabelProps={{ shrink: true }}
                            sx={{"& .MuiInputLabel-root": { color: "#5F646F !important" }, "& .MuiInputLabel-root.Mui-focused": { color: "#5F646F !important" }, "& .MuiOutlinedInput-root": {"& fieldset": { borderColor: "#CFD1D4" }, "&:hover fieldset": { borderColor: "#CFD1D4" }, "&.Mui-focused fieldset": { borderColor: "#CFD1D4" }}, "& .MuiInputBase-input": { color: "#5F646F" }}}
                        />
                    </Box>
                )}
                {selected.length > 0 && (
                    <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
                        <Button
                        variant="contained"
                        onClick={handleSaveEquipmentDetails}
                        sx={{
                           borderRadius: "8px", background: "#383838", textTransform: "none", "&:hover": { background: "#2f2f2f" } }}
                        >
                        Save
                        </Button>
                    </Box>
                )}
                {equipmentTable.length > 0 && (
                    <Box
                        sx={{
                        mt: 4,
                        border: "1px solid #E5E7EB",
                        borderRadius: "10px",
                        overflow: "hidden",
                        }}
                    >
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                                <tr style={{ background: "#F9FAFB", height: "42px" }}>
                                    <th style={headerStyle}>Sr. No.</th>
                                    <th style={headerStyle}>{equipmentName} Name</th>
                                    <th style={headerStyle}>Make</th>
                                    <th style={headerStyle}>Model</th>
                                </tr>
                            </thead>

                            <tbody>
                                {equipmentTable.map((row, index) => (
                                <tr key={index} style={{ height: "42px", borderTop: "1px solid #E5E7EB" }}>
                                    <td style={cellStyle}>{index + 1}</td>
                                    <td style={cellStyle}>{row.equipmentNum}</td>
                                    <td style={cellStyle}>{row.make}</td>
                                    <td style={cellStyle}>{row.model}</td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </Box>
                )}
                <Box sx={{ mt: 10, display: "flex", justifyContent: "flex-end", gap: 2 }}>
                    <Button variant="outlined" onClick={handleClearAll} sx={{borderRadius: "10px", borderColor: "#505050", "&:hover": { borderColor: "#505050", backgroundColor: "white" }, color: "#505050", textTransform: "none" }}>Clear All</Button>
                    <Button variant="contained" onClick={handleFinalSave} sx={{ borderRadius: "10px", background: "#383838", textTransform: "none", "&:hover": { background: "#2f2f2f" } }}>Save</Button>
                </Box>
            </Box>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose} 
                PaperProps={{ sx:{ width:"96px", borderRadius:"8px", ml: "-60px", mt: "10px", boxShadow:"0px 1px 4px rgba(0,0,0,0.1)" }}}>
                <MenuItem onClick={handleClose} sx={{ width:"96px", height:"33px", p:"8px", gap:"6px", borderBottom:"1px solid #E5E7EB" }}>Edit</MenuItem>
                <MenuItem onClick={handleClose} sx={{ width:"96px", height:"33px", p:"8px", gap:"6px" }}>Delete</MenuItem>
            </Menu>
            <AddParameterPopup open={openParamPopup} onClose={() => setOpenParamPopup(false)} 
                onAdd={(data) => {
                    setParameters((prev) => [...prev, data]);
                    setOpenParamPopup(false);
                }}
            />
        </Box>
    );
};

export default AddParameterPage;