import { 
    Button, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogTitle, 
    Typography,
    Stack 
} from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

type Props = {
    popupName?:string
    open: boolean;
    onClose: () => void;
    deleteCallback: () => void;
};

const DeletePopup = ({ open, onClose, deleteCallback,popupName }: Props) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xs"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    p: 1,
                },
            }}
        >
            <DialogTitle>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <WarningAmberIcon sx={{ color: "#d32f2f" }} />
                    <Typography variant="h6" fontWeight={600}>
                        Confirm Delete
                    </Typography>
                </Stack>
            </DialogTitle>

            <DialogContent>
                <Typography variant="body1" sx={{ mt: 1 }}>
                    Are you sure you want to delete this {popupName || "item"}?  
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    This action cannot be undone.
                </Typography>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button 
                    onClick={onClose} 
                    variant="outlined" 
                    color="inherit"
                    sx={{ borderRadius: 2 }}
                >
                    Cancel
                </Button>

                <Button 
                    onClick={deleteCallback} 
                    variant="contained" 
                    color="error"
                    sx={{ borderRadius: 2 }}
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeletePopup;
