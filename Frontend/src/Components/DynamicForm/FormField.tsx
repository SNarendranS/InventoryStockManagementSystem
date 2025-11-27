import { TextField, MenuItem } from "@mui/material";

interface Props {
    field: any;
    value: any;
    onChange: (val: any) => void;
}

const FormField: React.FC<Props> = ({ field, value, onChange }) => {
    if (field.type === "select") {
        return (
            <TextField
                select
                fullWidth
                size="small"
                margin="normal"
                label={field.label}
                value={value ?? ""}
                onChange={(e) => onChange(e.target.value)}
            >
                {field.options?.map((opt: any) => (
                    <MenuItem key={opt.value} value={opt.value}>
                        {opt.label}
                    </MenuItem>
                ))}
            </TextField>
        );
    }

    return (
        <TextField
            fullWidth
            size="small"
            margin="normal"
            label={field.label}
            type={field.type || "text"}
            value={value}
            multiline={field.multiline}
            rows={field.rows}
            onChange={(e) => onChange(e.target.value)}
        />
    );
};

export default FormField;
