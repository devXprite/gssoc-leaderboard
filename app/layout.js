import ThemeRegistry from '@/components/ThemeRegistry';
import './globals.scss';
import Footer from '@/components/Footer';
import {GoogleAnalytics} from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react"

export const metadata = {
    title: 'GSSoC LeaderBoard',
    description: 'GSSoC LeaderBoard',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <GoogleAnalytics gaId='G-C0PWPQ6X0S' />
                <Analytics />
                <ThemeRegistry>
                    <div className="page">{children}</div>
                </ThemeRegistry>
                <Footer />
            </body>
        </html>
    );
}
