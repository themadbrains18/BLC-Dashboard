import * as React from 'react';
import { IconButton, TextField, Modal, Typography, Button, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function EditModal(props) {
    return (
        
            <Modal
                open={props.show}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Box
                    sx={{
                        border: '2px solid #000',
                        borderRadius: 4,
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.common.black,
                        maxWidth: 500,
                        width: '100%',
                    }}
                >
                    <Box  sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        margin: '8px 30px'
                    }}>
                        <Typography component="h1" variant='h4' color='secondry.darker'>
                            Enter Password!
                        </Typography>
                        <IconButton onClick={props.close}>
                            <CloseIcon />
                        </IconButton>

                    </Box>
                    <Box component="form" noValidate sx={{
                        m: 4
                    }}>
                        <TextField
                            disabled
                            margin="normal"
                            fullWidth
                            id="email"
                            label="User Name"
                            name="email"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{
                                mt: 3, mb: 2,
                                borderRadius: '8px',
                                backgroundColor: '#1B70F1'
                            }}
                        >
                            Submit
                        </Button>

                    </Box>
                </Box>
            </Modal>
      
    );
}