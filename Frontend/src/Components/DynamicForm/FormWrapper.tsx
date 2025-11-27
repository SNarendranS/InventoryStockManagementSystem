import { Card, CardContent, Typography, Divider, Alert, Box } from "@mui/material";

interface Props {
    title: string;
    description?: string;
    error?: string;
    success?: string;
    children: React.ReactNode;
}

const FormWrapper: React.FC<Props> = ({ title, description, error, success, children }) => {
    return (
        <Card sx={{ maxWidth: 600, mx: "auto", mt: 4, p: 3, borderRadius: 3, boxShadow: 4 }}>
            <CardContent>
                <Typography variant="h5" fontWeight={700} gutterBottom>
                    {title}
                </Typography>

                {description && (
                    <Typography variant="body2" mb={2}>
                        {description}
                    </Typography>
                )}

                <Divider sx={{ mb: 3 }} />

                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

                <Box component="div">
                    {children}
                </Box>
            </CardContent>
        </Card>
    );
};

export default FormWrapper;
