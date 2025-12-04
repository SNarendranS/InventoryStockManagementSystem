import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    Typography
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
    initialData: any; // e.g. selectedProduct
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
    // Auto-generate initialValues from fields
    const initialValues = fields.reduce((acc, field) => {
        acc[field.name] = initialData?.[field.name] ?? "";
        return acc;
    }, {} as any);

    const renderField = (field: FieldConfig) => {
        if (field.type === "select") {
            return (
                <Field as="select" name={field.name} key={field.name} style={{ width: "100%", marginBottom: "16px" }}>
                    <option value="">Select {field.label}</option>
                    {field.options?.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </Field>
            );
        }

        return (
            <Field
                key={field.name}
                name={field.name}
                placeholder={field.label}
                type={field.type}
                style={{ width: "100%", marginBottom: "16px" }}
            />
        );
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography variant="h6" fontWeight={600}>
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
                    <DialogContent>
                        {fields.map((f) => renderField(f))}
                    </DialogContent>

                    <DialogActions sx={{ px: 3, pb: 2 }}>
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
