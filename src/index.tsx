import { StrictMode } from 'react';
import * as ReactDOMClient from 'react-dom/client';

/* Theme */
import { ThemeProvider } from 'commons/style/styled-components';
import { theme } from 'commons/style/theme';
import GlobalStyle from 'commons/style/global-style';

/* Context Providers */
import { ProductsProvider, useProducts } from 'contexts/products-context';
import { CartProvider } from 'contexts/cart-context';

import App from 'components/App';

const root = document.getElementById('root')!;
const container = ReactDOMClient.createRoot(root);


container.render(

    <div style={{width:"100%"}}>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      
      <ProductsProvider  >
        <CartProvider  >
 
          <App />
        </CartProvider>
      </ProductsProvider>
    
    
    </ThemeProvider>
    </div>

);
