import { Grid } from '@mui/material';

import ProjectAnalytics from 'sections/widget/chart/ProjectAnalytics';

import ProductOverview from 'sections/widget/chart/ProductOverview';
import TotalIncome from 'sections/widget/chart/TotalIncome';

// ==============================|| WIDGET - CHARTS ||============================== //

const WidgetChart = () => {
  return (
    <Grid container rowSpacing={4.5} columnSpacing={3}>
      {/* row 1 */}
      <Grid item xs={12}>
        <ProjectAnalytics />
      </Grid>

      {/* row 2 */}
      <Grid item xs={12} md={6}>
        <ProductOverview />
      </Grid>
      <Grid item xs={12} md={6}>
        <TotalIncome />
      </Grid>
    </Grid>
  );
};

export default WidgetChart;
