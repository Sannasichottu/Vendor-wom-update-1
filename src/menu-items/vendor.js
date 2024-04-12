// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { Story, Fatrows, PresentionChart, Paypal } from 'iconsax-react';

// icons
const icons = {
  widgets: Story,
  statistics: Story,
  data: Fatrows,
  chart: PresentionChart,
  pay: Paypal
};

// ==============================|| MENU ITEMS - WIDGETS ||============================== //

const vendor = {
  id: 'group-widget',
  title: <FormattedMessage id="vendor" />,
  icon: icons.widgets,
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: <FormattedMessage id="dashboard" />,
      type: 'item',
      url: '/dashboard/default',
      icon: icons.statistics
    },
    {
      id: 'vendorRegistration',
      title: <FormattedMessage id="vendorRegistration" />,
      type: 'item',
      url: '/apps/customer/customer-list',
      icon: icons.statistics
    },
    {
      id: 'productRegistration',
      title: <FormattedMessage id="productRegistration" />,
      type: 'collapse',
      icon: icons.customer,
      children: [
        {
          id: 'addProduct',
          title: <FormattedMessage id="addProduct" />,
          type: 'item',
          url: '/apps/e-commerce/add-new-product'
        },
        {
          id: 'productlist',
          title: <FormattedMessage id="productlist" />,
          type: 'item',
          url: 'apps/e-commerce/product-list'
        }
      ]
    },
    {
      id: 'quoteManagement',
      title: <FormattedMessage id="quoteManagement" />,
      type: 'collapse',
      icon: icons.customer,
      children: [
        // {
        //   id: 'quoteReq',
        //   title: <FormattedMessage id="quoteReq" />,
        //   type: 'item',
        //   url: '/apps/invoice/list'
        // },
        {
          id: 'quoteGen',
          title: <FormattedMessage id="quoteGen" />,
          type: 'item',
          url: '/apps/invoice/create'
        },
        {
          id: 'quoteSucc',
          title: <FormattedMessage id="quoteSucc" />,
          type: 'item',
          url: '/apps/invoice/list'
        }
      ]
    },
    {
      id: 'payResponse',
      title: <FormattedMessage id="payResponse" />,
      type: 'item',
      url: '/widget/chart',
      icon: icons.pay
    }
  ]
};
export default vendor;
