import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    Typography,
    TextField,
    MenuItem,
    Box
} from "@mui/material";
import { Formik, Form, Field, type FormikValues } from "formik";

export type FieldOption = { label: string; value: any };
export type FieldConfig = {
    name: string;
    label: string;
    type: "text" | "number" | "select";
    options?: FieldOption[];
};

type Props<FormValues extends FormikValues> = {
    open: boolean;
    onClose: () => void;
    popupName?: string;
    fields: FieldConfig[];
    initialData: any;
    validationSchema?: any;
    onSubmit: (values: FormValues) => void;
};

function EditPopup<FormValues extends FormikValues>({
    open,
    onClose,
    popupName,
    fields,
    initialData,
    validationSchema,
    onSubmit,
}: Props<FormValues>) {
    
    const initialValues = fields.reduce((acc, field) => {
        acc[field.name] = initialData?.[field.name] ?? "";
        return acc;
    }, {} as any);

    const renderField = (field: FieldConfig) => {
        return (
            <Box key={field.name} sx={{ mb: 2, width: "100%" }}>
                <Field name={field.name}>
                    {({ field: formikField, meta }: any) => (
                        <TextField
                            {...formikField}
                            label={field.label}
                            type={field.type !== "select" ? field.type : undefined}
                            select={field.type === "select"}
                            fullWidth
                            size="small"
                            variant="outlined"
                            error={meta.touched && Boolean(meta.error)}
                            helperText={meta.touched && meta.error}
                        >
                            {field.type === "select" &&
                                field.options?.map((opt) => (
                                    <MenuItem key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </MenuItem>
                                ))}
                        </TextField>
                    )}
                </Field>
            </Box>
        );
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xs"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 2,
                    p: 1,
                },
            }}
        >
            <DialogTitle sx={{ pb: 1 }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography variant="h6" fontWeight={700}>
                        Edit {popupName}
                    </Typography>
                </Stack>
            </DialogTitle>

            <Formik
                initialValues={initialValues}
                enableReinitialize
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    onSubmit(values);
                    onClose();
                }}
            >
                <Form>
                    <DialogContent dividers sx={{ pt: 2 }}>
                        {fields.map((f) => renderField(f))}
                    </DialogContent>

                    <DialogActions sx={{ px: 3, py: 2 }}>
                        <Button onClick={onClose} variant="outlined">
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" sx={{ background: "#509709" }}>
                            Save Changes
                        </Button>
                    </DialogActions>
                </Form>
            </Formik>
        </Dialog>
    );
}

export default EditPopup;
