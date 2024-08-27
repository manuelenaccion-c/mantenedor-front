import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function ClientsChart({ client_month }) {

    const months = client_month.map(({ month }) => month);
    const counts = client_month.map(({ count }) => count);

    return (
        <BarChart
            xAxis={[{ scaleType: 'band', data: months }]}
            series={[{ data: counts }]}
            width={300}
            height={250}
        />
    );
}
