import { FormQuestions } from "../components/FormQuestions"
import Header from '../components/Header';
import { Grid, Typography } from '@mui/material';
import { useState, useRef } from 'react';

const CalorieCounterPage = () => {

    const [calories, setCalories] = useState()
    const ref = useRef(null);

    return (
        <>
            <Header />
            <Grid container justifyContent={"space-around"} sx={{ marginTop: { md: 20, xs: 10 } }}>
                <Grid item xs={12} md={5} alignItems={"center"}>
                    <FormQuestions setCalories={
                        (v) => { ref.current?.lastElementChild?.scrollIntoView(); setCalories(v) }} />
                </Grid>
                <Grid item ref={ref} xs={12} md={5} sx={{ marginTop: { xs: 20, md: 0 } }}>
                    <Typography variant="h4">
                        {calories}
                    </Typography>
                </Grid>
            </Grid>
        </>)
}

export default CalorieCounterPage;

