import { Container, Typography } from '@mui/material';

const AuditTrail = () => {
  return (
    <Container maxWidth={false} sx={{ py: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: 600 }}>
        Audit Trail
      </Typography>
      <Typography variant="body1" sx={{ mt: 2, color: '#6b7280' }}>
        Audit Trail section - Coming soon
      </Typography>
    </Container>
  );
};

export default AuditTrail;

