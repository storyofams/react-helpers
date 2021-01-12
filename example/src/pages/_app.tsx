import React from 'react';
import { DefaultSeo } from 'next-seo';
import App from 'next/app';
import objectFitImages from 'object-fit-images';
import { ThemeProvider } from 'styled-components';

import { Box, Navigation } from '~/components';
import { seo } from '~/config';
import CSSreset from '~/styles/CSSreset';
import theme from '~/styles/theme';

import '../../public/static/fonts/stylesheet.css';
export default class MyApp extends App {
  componentDidMount() {
    objectFitImages();
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <CSSreset />
        <DefaultSeo {...seo} />
        <Box display="grid" gridTemplateColumns="20% auto">
          <Navigation />
          <Box p={8}>
            <Component {...pageProps} />
          </Box>
        </Box>
      </ThemeProvider>
    );
  }
}
