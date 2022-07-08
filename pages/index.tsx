import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { API } from "../src/config/axios";
import { useEffect, useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import moment from "moment";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';



const getEmptyBins = API.get('empty-bins-count');
const getRefillCards = API.get('refill-cards-count');
const getReturnItems = API.get('return-items-count');
const getLastRackRefill = API.get('last-rack-refill');



const StyledMainContainer = styled(Container)(({ theme }) => ({
  paddingTop: 100,
  backgroundColor: theme.palette.grey[100],
  minHeight: "100vh",
  paddingBottom: 100,
}));



const StyledSectionHeading = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[700],
  fontWeight: 800,

}));


const StyledCard = styled(Card)<{ bgColor: string }>(({ bgColor }) => ({
  backgroundColor: bgColor
}))

const StyledCardTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  fontWeight: 400,
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
}));

const StyledCountCircle = styled(CardContent)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: 150,
  width: 150,
  // border: '1px solid #fff',
  borderRadius: '20px',
  marginTop: 30,
  backgroundColor: theme.palette.common.white,
  marginBottom: 30,
}));

const StyledCount = styled(Typography)<{ color: string }>(({ theme, color }) => ({
  color: color,
  fontWeight: 800
}));

const StyledInfo = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  fontSize: 12,
  color: theme.palette.grey[600]
}));


const StyledCardButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  border: '1px solid #fff',
  borderRadius: '50px',
  textTransform: "none",
  width: '100px',
  ":hover": {
    border: '1px solid #fff',
  }
}));



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}



const DashboardCard = (props: any) => {
  const { bgColor, title, count, info, onClick } = props;
  return <StyledCard bgColor={bgColor}>
    <StyledCardContent>
      <StyledCardTitle align="center" gutterBottom variant="h6">{title}</StyledCardTitle>
      <StyledCountCircle>
        <StyledCount color={bgColor} variant="h2">{count}</StyledCount>
        <StyledInfo variant="body1">{info}</StyledInfo>
      </StyledCountCircle>
      <StyledCardButton onClick={onClick} variant="outlined" sx={{ color: '#fff' }} size="small">View Details</StyledCardButton>
    </StyledCardContent>
  </StyledCard>
}

const Home = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [apiData, setApiData] = useState<any>();
  const [catrgory, setCategory] = useState<string>("");
  const [items, setItems] = useState([]);
  useEffect(() => {
    Promise.all([getEmptyBins, getRefillCards, getReturnItems, getLastRackRefill,]).then((response) => {
      setApiData(response)
    }).catch((error) => {
      console.log(error)
    })
  }, [])

  function createData(
    name: string,
    countedBins: number,
  ) {
    return { name, countedBins };
  }

  const rows = [
    createData('Cardio', 5),
    createData('Patient care', 6),
    createData('Patient safety', 4)
  ]


  return (
    <div>
      <AppBar position="fixed">
        <Container maxWidth="sm">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Digital Twin
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <main>
        <StyledMainContainer>
          <Container maxWidth="sm">
            <Grid container alignItems='center' justifyContent="space-between" >
              <Grid item>
                <StyledSectionHeading variant="h5">Dashboard</StyledSectionHeading>
              </Grid>
              <Grid item>
                <Button disableElevation color="primary" variant="contained">View Rack</Button>
              </Grid>
            </Grid>
            <Box mt={3} mb={2}>
              <Divider />
            </Box>
            <Grid container spacing={5}>
              <Grid item xs={6} sm={4} md={3} lg={3}>
                <DashboardCard onClick={() => {
                  setCategory('Empty Bins');
                  if (apiData) {
                    setItems(apiData[0].data.result.items)
                  }

                  setOpen(true)

                }} count={apiData ? apiData[0].data.result.totalCount : 0} info="Current Count" title="Empty Bins" bgColor="#795548" />
              </Grid>
              <Grid item xs={6} sm={4} md={3} lg={3}>
                <DashboardCard onClick={() => {
                  setCategory('Refill Cards');
                  if (apiData) {
                    setItems(apiData[1].data.result.items)
                  }
                  setOpen(true)
                }} count={apiData ? apiData[1].data.result.totalCount : 0} info="Current Count" title="Refill Cards" bgColor="#FF9800" />
              </Grid>
              <Grid item xs={6} sm={4} md={3} lg={3}>
                <DashboardCard onClick={() => {
                  setCategory('Return Items');
                  if (apiData) {
                    setItems(apiData[2].data.result.items)
                  }
                  setOpen(true)
                }} count={apiData ? apiData[2].data.result.totalCount : 0} info="Current Count" title="Return Items" bgColor="#9575CD" />
              </Grid>
              <Grid item xs={6} sm={4} md={3} lg={3}>
                <DashboardCard onClick={() => {
                  // setCategory('Last Rack Refill');
                  // setOpen(true)
                }} count="2" info="Hours ago" title="Last Rack Refill" bgColor="#F48FB1" />
              </Grid>

              <Grid item xs={6} sm={4} md={3} lg={3}>
                <DashboardCard onClick={() => {
                  // setCategory('Delivered Items');
                  // setOpen(true)
                }} count="03" info="Current Count" title="Delivered Items" bgColor="#00897B" />
              </Grid>
              <Grid item xs={6} sm={4} md={3} lg={3}>
                <DashboardCard onClick={() => {
                  // setCategory('Other Items');
                  // setOpen(true)
                }} count="08" info="Current Count" title="Other Items" bgColor="#03A9F4" />
              </Grid>
            </Grid>
          </Container>
        </StyledMainContainer>
      </main>
      <Dialog onClose={() => {
        return;
      }} maxWidth="lg" open={open}>
        <DialogTitle>
          {catrgory}
        </DialogTitle>
        <Divider />
        <DialogContent>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Counted Bins</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items && <>
                  {items.map((row: any) => (
                    <TableRow
                      key={row.categoryName || row['supplyName']}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row['categoryName'] || row['supplyName']}
                      </TableCell>
                      <TableCell align="right">{row.count}</TableCell>
                    </TableRow>
                  ))}
                </>}

              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={() => { setOpen(false) }}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Home;
