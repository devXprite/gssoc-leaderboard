import ThemeRegistry from '@/components/ThemeRegistry';
import './globals.scss';
import Footer from '@/components/Footer';

export const metadata = {
    title: 'GSSoC LeaderBoard',
    description: 'GSSoC LeaderBoard',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <ThemeRegistry>{children}</ThemeRegistry>
                <Footer />
            </body>
        </html>
    );
}
