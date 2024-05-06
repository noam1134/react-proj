import React from 'react';
import { Link } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const LinkedInLinks = () => {
    return (
        <div style={{ position: 'fixed', left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px', backgroundColor: '#fff', borderTop: '1px solid #ccc' }}>
            <Link href="https://www.linkedin.com/in/ron-azar" target="_blank" style={{ display: 'flex', alignItems: 'center', margin: '0 10px', textDecoration: 'none', color: '#0a66c2' }}>
                <LinkedInIcon style={{ marginRight: '5px' }} />
                Ron Azar
            </Link>
            |
            <Link href="https://www.linkedin.com/in/noam-churi" target="_blank" style={{ display: 'flex', alignItems: 'center', margin: '0 10px', textDecoration: 'none', color: '#0a66c2' }}>
                <LinkedInIcon style={{ marginRight: '5px' }} />
                Noam Churi
            </Link>
        </div>
    );
}

export default LinkedInLinks;
