import { useEffect } from 'react';
import { Box, Stack } from "@mui/material";
import HeaderTest from "../components/global/header-test";
import { useNavigate } from "react-router-dom";

export default function DashboardLayout({ pageContent }) {

    const navigate = useNavigate();

    useEffect(()=>{
        let session = sessionStorage.getItem('token')
        if (session === null) {
            //navigate('/')
        }
    },[navigate]);
    
    return (
        <>
            <Stack direction="row" sx={{ overflow: 'hidden' }} >
                <Box sx={{ width: '100%' }}>
                    <Box>
                        <HeaderTest pageContent={pageContent} />
                    </Box>
                </Box>
            </Stack>
        </>
    )
}