import React from "react"; // Tambahkan impor React
import { TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from "@mui/material";

type TextFieldProps = MuiTextFieldProps & {}; // Use type intersection

export default function TextField(props: TextFieldProps) {
  return <MuiTextField fullWidth {...props} />;
}
