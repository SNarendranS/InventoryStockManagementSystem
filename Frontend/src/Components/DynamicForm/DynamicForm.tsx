import { Button, CircularProgress, Box } from "@mui/material";
import FormField from "./FormField";

interface Props {
    fields: any[];
    values: any;
    setValues: (v: any) => void;
    onSubmit: () => void;
    loading?: boolean;
    extra?: React.ReactNode; // custom additional UI
}

const DynamicForm: React.FC<Props> = ({ fields, values, setValues, onSubmit, loading, extra }) => {
    const handleChange = (name: string, value: any) => {
        setValues({ ...values, [name]: value });
    };

    return (
        <Box component="form" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
            {/* Generate fields */}
            {fields.map((f) => (
                <FormField
                    key={f.name}
                    field={f}
                    value={values[f.name]}
                    onChange={(val) => handleChange(f.name, val)}
                />
            ))}

            {/* Custom JSX */}
            {extra}

            <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                sx={{ mt: 3, py: 1.4, fontWeight: 600, background: "goldenrod" }}
            >
                {loading ? <CircularProgress size={22} /> : "Save"}
            </Button>
        </Box>
    );
};

export default DynamicForm;
