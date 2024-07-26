import React from 'react';
import HomeHeader from './HomeHeader';
import HeroSection from './HeroSection';
import SearchBar from './SearchBar';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../styles/themeComponent';

const MainHomeView = () => {
    return (
        <ThemeProvider theme={theme}>
            <div style={styles.mainHomeView}>
                <HomeHeader />
                <HeroSection />
                <SearchBar />
            </div>
        </ThemeProvider>
    );
};

const styles = {
    mainHomeView: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
};

export default MainHomeView;