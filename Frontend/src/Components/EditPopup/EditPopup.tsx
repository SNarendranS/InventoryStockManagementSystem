import { Dialog, Paper } from '@mui/material';
import { Form } from 'formik';

type Props = {
    open:boolean;
       onClose:()=>void
}

const EditPopup = (props: Props) => {
    return (
        <Dialog open={props.open} onClose={props.onClose}>
            <Paper>
                <Form>

                </Form>
            </Paper>
        </Dialog>)
}

export default EditPopup